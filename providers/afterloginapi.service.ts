import { Injectable } from '@angular/core';
import {UtilService} from './util.service';
import {DatabaseService} from './database.service';
import {SharedService} from './sharedservice';
import {APIRequestService} from './apirequest.service';
@Injectable()
export class AfterLoginAPIService {
    ip : string;
    pernr : string;
    constructor(public utilService: UtilService,
    public databaseService: DatabaseService,
    public sharedService: SharedService,
    public apiRequestService: APIRequestService) {
        this.ip = this.sharedService.getIP();
    }
  	callDashboardVideo(){
        return new Promise((resolve, reject) => {
            this.pernr = this.sharedService.getPernr();
            let className = this.sharedService.getAPIObj('dashboardvideo');
            let pernr = this.utilService.encode64(this.pernr);
            let action = '?action=DisplayVideoList&pernr='+this.pernr;
            this.apiRequestService.getAPI(this.ip+className+action).then((data) => {
                console.log(JSON.stringify(data));
                for (var i = 0; i < data['videoList'].length; i++)
                {
                    let v_id = this.utilService.encode64(data['videoList'][i]['v_id']);
                    this.databaseService.selectTableQuery('dashboardvideomst','*','WHERE vid=?',[v_id],i).then((results) => {
                        if(results['rows'].length == 0){
                            var row = data['videoList'][results['index']];
                            var vid = this.utilService.encode64(row['v_id']);
                            var vidname = this.utilService.encode64(row['v_name']);
                            this.databaseService.insertIntoTableQuery('dashboardvideomst',
                            'vid,vidname,pernr',
                            [vid,vidname,pernr],results['index'])
                            .then((obj) => {
                                console.log(JSON.stringify(obj));
                            }, (err) => {
                                console.log(JSON.stringify(err));
                            });
                        }
                    },(err) => {});
                }
                resolve(true);
            }, (err) => {
                console.log((err));
                reject(false);
            });
        });
  	}
    callSettings(){
        return new Promise((resolve, reject) => {
            let className = this.sharedService.getAPIObj('settings');
            // let pernr = this.utilService.encode64(this.pernr);
            let action = '?pernr='+this.pernr;
            this.apiRequestService.getAPI(this.ip+className+action).then((data) => {
                console.log(JSON.stringify(data));
                this.insertIntoCustTabmstTable(data['masters']['custtabmst']);
                this.insertIntoArticleTabmstTable(data['masters']['articletabmst']);
                this.insertIntoServermstTable(data['masters']['servermst']);
                this.insertIntoDefaultsTable(data['masters']['emptoordermst']);
                resolve(true);
            }, (err) => {
                console.log('error Settings '+(err));
                reject(false);
            });
        });
  	}
    insertIntoCustTabmstTable(data){
        let epernr = this.utilService.encode64(this.pernr);
        this.databaseService.deleteTableQuery('custtabmst',' where pernr=?',[epernr]).then((obj) => {},(err) => {});
        for (var i = 0; i < data.length; i++)
        {
            var row = data[i];
            var pernr = this.utilService.encode64(row.pernr);
            var branch = this.utilService.encode64(row.branch);
            var customergroup = this.utilService.encode64(row.customergroup);
            var customerclass = this.utilService.encode64(row.customerclass);
            var customerchain = this.utilService.encode64(row.customerchain);
            var popclass = this.utilService.encode64(row.popclass);
            var industry = this.utilService.encode64((row.industry));
            var industrycode1 = this.utilService.encode64(row.industrycode1);
            var parentgroup = this.utilService.encode64(row.parentgroup);
            var territorysalesgrp = this.utilService.encode64(row.territorysalesgrp);
            var customer = this.utilService.encode64(row.customer);
            var status = this.utilService.encode64(row.status);

            this.databaseService.insertIntoTableQuery('custtabmst',
            'pernr,branch,customergroup,customerclass,customerchain,popclass,industry,industrycode1,parentgroup,territorysalesgrp,customer,status',
            [pernr,branch,customergroup,customerclass,customerchain,popclass,industry,industrycode1,parentgroup,territorysalesgrp,customer,status],i)
            .then((obj) => {
                console.log(JSON.stringify(obj));
            }, (err) => {
                console.log(JSON.stringify(err));
            });
        }
    }
    insertIntoArticleTabmstTable(data){
        let epernr = this.utilService.encode64(this.pernr);
        this.databaseService.deleteTableQuery('articletabmst',' where pernr=?',[epernr]).then((obj) => {},(err) => {});
        for (var i = 0; i < data.length; i++)
        {
            var row = data[i];
            var pernr = this.utilService.encode64(row.pernr);
            var businessunit = this.utilService.encode64(row.businessunit);
            var producdivision = this.utilService.encode64(row.producdivision);
            var category = this.utilService.encode64(row.category);
            var subcategory = this.utilService.encode64(row.subcategory);
            var principal = this.utilService.encode64(row.principal);
            var brand = this.utilService.encode64((row.brand));
            var segment = this.utilService.encode64(row.segment);

            this.databaseService.insertIntoTableQuery('articletabmst',
            'pernr,businessunit,producdivision,category,subcategory,principal,brand,segment',
            [pernr,businessunit,producdivision,category,subcategory,principal,brand,segment],i)
            .then((obj) => {
                console.log(JSON.stringify(obj));
            }, (err) => {
                console.log(JSON.stringify(err));
            });
        }
    }
    insertIntoServermstTable(data){
        // let epernr = this.utilService.encode64(this.pernr);
        this.databaseService.deleteTableQuery('servermst','',[]).then((obj) => {},(err) => {});
        for (var i = 0; i < data.length; i++)
        {
            var row = data[i];
            var servername = this.utilService.encode64(row.servername);
            var Applicationserver = this.utilService.encode64(row.Applicationserver);
            var instance = this.utilService.encode64(row.instance);
            var systemid = this.utilService.encode64(row.systemid);
            var router = this.utilService.encode64(row.router);

            this.databaseService.insertIntoTableQuery('servermst',
            'servername,Applicationserver,instance,systemid,router',
            [servername,Applicationserver,instance,systemid,router],i)
            .then((obj) => {
                console.log(JSON.stringify(obj));
            }, (err) => {
                console.log(JSON.stringify(err));
            });
        }
    }
    insertIntoDefaultsTable(data){
        let epernr = this.utilService.encode64(this.pernr);
        this.databaseService.deleteTableQuery('defaults',' where pernr=?',[epernr]).then((obj) => {},(err) => {});
        for (var i = 0; i < data.length; i++)
        {
            var row = data[i];
            var pernr = this.utilService.encode64(row.pernr);
            var id = this.utilService.encode64(row.id);
            var subtyp = this.utilService.encode64(row.subtyp);

            this.databaseService.insertIntoTableQuery('defaults',
            'pernr,id,subtyp',
            [pernr,id,subtyp],i)
            .then((obj) => {
                console.log(JSON.stringify(obj));
            }, (err) => {
                console.log(JSON.stringify(err));
            });
        }
    }
  	callParameters(){
        return new Promise((resolve, reject) => {
            let className = this.sharedService.getAPIObj('parameters');
            // let pernr = this.utilService.encode64(this.pernr);
            let action = '';//'?pernr='+this.pernr;
            this.apiRequestService.getAPI(this.ip+className+action).then((data) => {
                console.log(JSON.stringify(data));
                this.insertIntoParametersTable(data['parametermst']);
                resolve(true);
            }, (err) => {
                console.log('error Settings '+(err));
                reject(false);
            });
        });
  	}
    insertIntoParametersTable(data){
        // let epernr = this.utilService.encode64(this.pernr);
        this.databaseService.deleteTableQuery('parametermst','',[]).then((obj) => {},(err) => {});
        for (var i = 0; i < data.length; i++)
        {
            var row = data[i];
            // var pernr = this.utilService.encode64(row.pernr);
            var parameter = this.utilService.encode64(row.parameter);
            var value = this.utilService.encode64(row.value);

            this.databaseService.insertIntoTableQuery('parametermst',
            'parameter,value',
            [parameter,value],i)
            .then((obj) => {
                console.log(JSON.stringify(obj));
            }, (err) => {
                console.log(JSON.stringify(err));
            });
        }
    }
  	callMenuParameters(){
        return new Promise((resolve, reject) => {
            let className = this.sharedService.getAPIObj('menuparameters');
            // let pernr = this.utilService.encode64(this.pernr);
            let action = '?pernr='+this.pernr;
            this.apiRequestService.getAPI(this.ip+className+action).then((data) => {
                console.log(JSON.stringify(data));
                this.insertIntoUserMenuTable(data['usermenumst']);
                resolve(true);
            }, (err) => {
                console.log('error Settings '+(err));
                reject(false);
            });
        });
  	}
    insertIntoUserMenuTable(data){
        let pernr = this.utilService.encode64(this.pernr);
        this.databaseService.deleteTableQuery('usermenumst',' where pernr=?',[pernr]).then((obj) => {},(err) => {});
        for (var i = 0; i < data.length; i++)
        {
            var row = data[i];
            // var pernr = this.utilService.encode64(row.pernr);
            var menu = this.utilService.encode64(row.menu.toLowerCase());
            var submenu = this.utilService.encode64(row.submenu.toLowerCase());
            var flag = this.utilService.encode64(row.flag);

            this.databaseService.insertIntoTableQuery('usermenumst',
            'pernr,menu,submenu,flag',
            [pernr,menu,submenu,flag],i)
            .then((obj) => {
                console.log(JSON.stringify(obj));
            }, (err) => {
                console.log(JSON.stringify(err));
            });
        }
    }
}
