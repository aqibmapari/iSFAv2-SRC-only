import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import {UtilService} from './util.service';
import {DatabaseService} from './database.service';
import {SharedService} from './sharedservice';
import {APIRequestService} from './apirequest.service';
@Injectable()
export class MasterSyncAPIService {
    ip : string;
    pernr : string;
    constructor(public utilService: UtilService,
    public databaseService: DatabaseService,
    public sharedService: SharedService,
    public apiRequestService: APIRequestService) {
        this.ip = this.sharedService.getIP();
    }
  	callMaterial(lasttypeid){
        return new Promise((resolve, reject) => {
            this.pernr = this.sharedService.getPernr();
            let className = this.sharedService.getAPIObj('materials');
            // let pernr = this.utilService.encode64(this.pernr);
            let link = this.ip+className;
            this.insertMaterial(link, lasttypeid, resolve, reject);
        });
  	}
    insertMaterial(link, lasttypeid, resolve, reject){
        // console.log(resolve);
        let action = '?pernr='+this.pernr+'&typeid='+lasttypeid;
        this.apiRequestService.getAPI(link+action).then((data) => {
            // console.log(JSON.stringify(data));
            var _len = data['materialmst'].length;
            let epernr = this.utilService.encode64(this.pernr);
            if(lasttypeid==0) this.databaseService.deleteTableQuery('materialmst',' where pernr=?',[epernr]).then((resobj) => {},(err) => {});
            if(_len == 0){
                resolve(true);
            }
            else{
                for (var i = 0; i < _len; i++)
                {
                    var row = data['materialmst'][i];
                    var pernr = epernr;
                    var matnr = this.utilService.encode64(row.matnr);
                    var maktx = this.utilService.encode64(row.maktx);
                    var packing = this.utilService.encode64(row.packing);
                    var division = this.utilService.encode64(row.division);
                    var listprice = this.utilService.encode64(row.listprice);
                    var eancode = this.utilService.encode64((row.eancode));
                    var businessunit = this.utilService.encode64(row.businessunit);
                    var proddivision = this.utilService.encode64(row.proddivision);
                    var category = this.utilService.encode64(row.category);
                    var subcategory = this.utilService.encode64(row.subcategory);
                    var principal = this.utilService.encode64(row.principal);

                    var brand = this.utilService.encode64(row.brand);
                    var segment = this.utilService.encode64(row.segment);
                    var uom = this.utilService.encode64(row.uom);
                    var status = this.utilService.encode64(row.status);
                    var temp = this.utilService.encode64(row.temp);
                    this.databaseService.insertIntoTableQuery('materialmst',
                    'pernr,matnr, maktx, packing, division, listprice, eancode, businessunit, proddivision, category, subcategory, principal, brand, segment, uom, status,temp',
                    [pernr,matnr, maktx, packing, division, listprice, eancode, businessunit, proddivision, category, subcategory, principal, brand, segment, uom, status,temp],i)
                    .then((resobj) => {
                        // console.log(JSON.stringify(resobj));
                    }, (err) => {
                        console.log(JSON.stringify(err));
                    });
                    if(i == _len-1) this.insertMaterial(link, row['typeid'], resolve, reject);
                }
            }

        }, (err) => {
            console.log((err));
            reject(false);
        });
    }
  	callArticlePricelist(){
        return new Promise((resolve, reject) => {
            let className = this.sharedService.getAPIObj('pricelist');
            // let pernr = this.utilService.encode64(this.pernr);
            let action = '?pernr='+this.pernr;
            this.apiRequestService.getAPI(this.ip+className+action).then((data) => {
                // console.log(JSON.stringify(data));
                this.InsertIntoPlArticleTable(data['masters']['A907']);
                this.InsertIntoPlKeyAcctsTable(data['masters']['A907keyaccountsmst']);
                this.InsertIntoPlCustChainTable(data['masters']['A907custchainmst']);
                this.InsertIntoPlBranchCustClassTable(data['masters']['A907branchclassmst']);
                this.InsertIntoPlCustomerTable(data['masters']['A907customermst']);
                this.InsertIntoBranchMasterTable(data['masters']['custbranchmst']);
                this.InsertIntoCustChainMasterTable(data['masters']['custchainmst']);
                this.InsertIntoCustClassMasterTable(data['masters']['custclassmst']);
                this.InsertIntoKeyAcctsMasterTable(data['masters']['custkeyacctsmst']);
                this.InsertIntoA305(data['masters']['A305']);
                resolve(true);
            }, (err) => {
                console.log('error Settings '+(err));
                reject(false);
            });
        });
  	}
    InsertIntoPlArticleTable(data){
        let epernr = this.utilService.encode64(this.pernr);
        this.databaseService.deleteTableQuery('A907',' where pernr=?',[epernr]).then((resobj) => {},(err) => {});
        for (var i = 0; i < data.length; i++)
        {
            var row = data[i];
            var pernr = epernr;
            var kappl = this.utilService.encode64(row.kappl);
            var kschl = this.utilService.encode64(row.kschl);
            var matnr = this.utilService.encode64(row.matnr);
            var datab = this.utilService.encode64(row.datab);
            var datbi = this.utilService.encode64(row.datbi);
            var kbetr = this.utilService.encode64((row.kbetr));
            var uom = this.utilService.encode64(row.uom.toUpperCase());

            this.databaseService.insertIntoTableQuery('A907',
            'pernr,kappl,kschl,matnr,datab,datbi,kbetr,uom',
            [pernr,kappl,kschl,matnr,datab,datbi,kbetr,uom],i)
            .then((resobj) => {
                console.log(JSON.stringify(resobj));
            }, (err) => {
                console.log(JSON.stringify(err));
            });
        }
    }
    InsertIntoPlKeyAcctsTable(data){
        let epernr = this.utilService.encode64(this.pernr);
        this.databaseService.deleteTableQuery('A907keyaccountsmst',' where pernr=?',[epernr]).then((resobj) => {},(err) => {});
        for (var i = 0; i < data.length; i++)
        {
            var row = data[i];
            var pernr = epernr;
            var kappl = this.utilService.encode64(row.kappl);
            var kschl = this.utilService.encode64(row.kschl);
            var matnr = this.utilService.encode64(row.matnr);
            var datab = this.utilService.encode64(row.datab);
            var datbi = this.utilService.encode64(row.datbi);
            var kbetr = this.utilService.encode64((row.kbetr));
            var uom = this.utilService.encode64(row.uom.toUpperCase());
            var keyaccountid = this.utilService.encode64(row.keyaccountid);
            var keyaccount = this.utilService.encode64((row.keyaccount));

            this.databaseService.insertIntoTableQuery('A907keyaccountsmst',
            'pernr,kappl,kschl,matnr,datab,datbi,kbetr,uom,keyaccountid,keyaccount',
            [pernr,kappl,kschl,matnr,datab,datbi,kbetr,uom,keyaccountid,keyaccount],i)
            .then((resobj) => {
                console.log(JSON.stringify(resobj));
            }, (err) => {
                console.log(JSON.stringify(err));
            });
        }
    }
    InsertIntoPlCustChainTable(data){
        let epernr = this.utilService.encode64(this.pernr);
        this.databaseService.deleteTableQuery('A907custchainmst',' where pernr=?',[epernr]).then((resobj) => {},(err) => {});
        for (var i = 0; i < data.length; i++)
        {
            var row = data[i];
            var pernr = epernr;
            var kappl = this.utilService.encode64(row.kappl);
            var kschl = this.utilService.encode64(row.kschl);
            var matnr = this.utilService.encode64(row.matnr);
            var datab = this.utilService.encode64(row.datab);
            var datbi = this.utilService.encode64(row.datbi);
            var kbetr = this.utilService.encode64((row.kbetr));
            var uom = this.utilService.encode64(row.uom.toUpperCase());
            var custchainid = this.utilService.encode64(row.custchainid);
            var custchain = this.utilService.encode64((row.custchain));

            this.databaseService.insertIntoTableQuery('A907custchainmst',
            'pernr,kappl,kschl,matnr,datab,datbi,kbetr,uom,custchainid,custchain',
            [pernr,kappl,kschl,matnr,datab,datbi,kbetr,uom,custchainid,custchain],i)
            .then((resobj) => {
                console.log(JSON.stringify(resobj));
            }, (err) => {
                console.log(JSON.stringify(err));
            });
        }
    }
    InsertIntoPlBranchCustClassTable(data){
        let epernr = this.utilService.encode64(this.pernr);
        this.databaseService.deleteTableQuery('A907branchclassmst',' where pernr=?',[epernr]).then((resobj) => {},(err) => {});
        for (var i = 0; i < data.length; i++)
        {
            var row = data[i];
            var pernr = epernr;
            var kappl = this.utilService.encode64(row.kappl);
            var kschl = this.utilService.encode64(row.kschl);
            var matnr = this.utilService.encode64(row.matnr);
            var datab = this.utilService.encode64(row.datab);
            var datbi = this.utilService.encode64(row.datbi);
            var kbetr = this.utilService.encode64((row.kbetr));
            var uom = this.utilService.encode64(row.uom.toUpperCase());
            var branchid = this.utilService.encode64(row.branchid);
            var branch = this.utilService.encode64((row.branch));
            var custclassid = this.utilService.encode64(row.custclassid);
            var custclass = this.utilService.encode64((row.custclass));

            this.databaseService.insertIntoTableQuery('A907branchclassmst',
            'pernr,kappl,kschl,matnr,datab,datbi,kbetr,uom,branchid,branch,custclassid,custclass',
            [pernr,kappl,kschl,matnr,datab,datbi,kbetr,uom,branchid,branch,custclassid,custclass],i)
            .then((resobj) => {
                console.log(JSON.stringify(resobj));
            }, (err) => {
                console.log(JSON.stringify(err));
            });
        }
    }
    InsertIntoPlCustomerTable(data){
        let epernr = this.utilService.encode64(this.pernr);
        this.databaseService.deleteTableQuery('A907customermst',' where pernr=?',[epernr]).then((resobj) => {},(err) => {});
        for (var i = 0; i < data.length; i++)
        {
            var row = data[i];
            var pernr = epernr;
            var kappl = this.utilService.encode64(row.kappl);
            var kschl = this.utilService.encode64(row.kschl);
            var matnr = this.utilService.encode64(row.matnr);
            var datab = this.utilService.encode64(row.datab);
            var datbi = this.utilService.encode64(row.datbi);
            var kbetr = this.utilService.encode64((row.kbetr));
            var uom = this.utilService.encode64(row.uom.toUpperCase());
            var kunnr = this.utilService.encode64((row.kunnr));

            this.databaseService.insertIntoTableQuery('A907customermst',
            'pernr,kappl,kschl,matnr,datab,datbi,kbetr,uom,kunnr',
            [pernr,kappl,kschl,matnr,datab,datbi,kbetr,uom,kunnr],i)
            .then((resobj) => {
                console.log(JSON.stringify(resobj));
            }, (err) => {
                console.log(JSON.stringify(err));
            });
        }
    }
    InsertIntoBranchMasterTable(data){
        let epernr = this.utilService.encode64(this.pernr);
        this.databaseService.deleteTableQuery('custbranchmst',' where pernr=?',[epernr]).then((resobj) => {},(err) => {});
        for (var i = 0; i < data.length; i++)
        {
            var row = data[i];
            var pernr = epernr;
            var branchid = this.utilService.encode64(row.branchid);
            var vkbur = this.utilService.encode64(row.vkbur);

            this.databaseService.insertIntoTableQuery('custbranchmst',
            'pernr,branchid, vkbur',
            [pernr,branchid, vkbur],i)
            .then((resobj) => {
                console.log(JSON.stringify(resobj));
            }, (err) => {
                console.log(JSON.stringify(err));
            });
        }
    }
    InsertIntoCustChainMasterTable(data){
        let epernr = this.utilService.encode64(this.pernr);
        this.databaseService.deleteTableQuery('custchainmst',' where pernr=?',[epernr]).then((resobj) => {},(err) => {});
        for (var i = 0; i < data.length; i++)
        {
            var row = data[i];
            var pernr = epernr;
            var custchainid = this.utilService.encode64(row.custchainid);
            var kvgr2 = this.utilService.encode64(row.kvgr2);

            this.databaseService.insertIntoTableQuery('custchainmst',
            'pernr,custchainid, kvgr2',
            [pernr,custchainid, kvgr2],i)
            .then((resobj) => {
                console.log(JSON.stringify(resobj));
            }, (err) => {
                console.log(JSON.stringify(err));
            });
        }
    }
    InsertIntoCustClassMasterTable(data){
        let epernr = this.utilService.encode64(this.pernr);
        this.databaseService.deleteTableQuery('custclassmst',' where pernr=?',[epernr]).then((resobj) => {},(err) => {});
        for (var i = 0; i < data.length; i++)
        {
            var row = data[i];
            var pernr = epernr;
            var classid = this.utilService.encode64(row.classid);
            var kvgr1 = this.utilService.encode64(row.kvgr1);

            this.databaseService.insertIntoTableQuery('custclassmst',
            'pernr,classid, kvgr1',
            [pernr,classid, kvgr1],i)
            .then((resobj) => {
                console.log(JSON.stringify(resobj));
            }, (err) => {
                console.log(JSON.stringify(err));
            });
        }
    }
    InsertIntoKeyAcctsMasterTable(data){
        let epernr = this.utilService.encode64(this.pernr);
        this.databaseService.deleteTableQuery('custkeyacctsmst',' where pernr=?',[epernr]).then((resobj) => {},(err) => {});
        for (var i = 0; i < data.length; i++)
        {
            var row = data[i];
            var pernr = epernr;
            var keyaccountid = this.utilService.encode64(row.keyaccountid);
            var kvgr4 = this.utilService.encode64(row.kvgr4);

            this.databaseService.insertIntoTableQuery('custkeyacctsmst',
            'pernr,keyaccountid, kvgr4',
            [pernr,keyaccountid, kvgr4],i)
            .then((resobj) => {
                console.log(JSON.stringify(resobj));
            }, (err) => {
                console.log(JSON.stringify(err));
            });
        }
    }
    InsertIntoA305(data){
        let epernr = this.utilService.encode64(this.pernr);
        this.databaseService.deleteTableQuery('A305',' where pernr=?',[epernr]).then((resobj) => {},(err) => {});
        for (var i = 0; i < data.length; i++)
        {
            var row = data[i];
            var pernr = epernr;
            var kappl = this.utilService.encode64(row.kappl);
            var kschl = this.utilService.encode64(row.kschl);
            var matnr = this.utilService.encode64(row.matnr);
            var datab = this.utilService.encode64(row.datab);
            var datbi = this.utilService.encode64(row.datbi);
            var kbetr = this.utilService.encode64((row.kbetr));
            var uom = this.utilService.encode64(row.uom.toUpperCase());
            var kunnr = this.utilService.encode64((row.kunnr));

            this.databaseService.insertIntoTableQuery('A305',
            'pernr,kappl,kschl,matnr,datab,datbi,kbetr,uom,kunnr',
            [pernr,kappl,kschl,matnr,datab,datbi,kbetr,uom,kunnr],i)
            .then((resobj) => {
                console.log(JSON.stringify(resobj));
            }, (err) => {
                console.log(JSON.stringify(err));
            });
        }
    }
  	callPriorityMaster(){
        return new Promise((resolve, reject) => {
            let className = this.sharedService.getAPIObj('prioritymaster');
            // let pernr = this.utilService.encode64(this.pernr);
            let action = '';//'?pernr='+this.pernr;
            this.apiRequestService.getAPI(this.ip+className+action).then((data) => {
                console.log(JSON.stringify(data));
                this.InsertIntoPriorityMasterTable(data['masters']['pricelistpriomst']);
                resolve(true);
            }, (err) => {
                console.log('error Settings '+(err));
                reject(false);
            });
        });
  	}
    InsertIntoPriorityMasterTable(data){
        // let epernr = this.utilService.encode64(this.pernr);
        this.databaseService.deleteTableQuery('pricelistpriomst','',[]).then((resobj) => {},(err) => {});
        for (var i = 0; i < data.length; i++)
        {
            var row = data[i];
            // var pernr = this.utilService.encode64(row.pernr);
            var tablename = this.utilService.encode64(row.table);
            var priority = this.utilService.encode64(row.priority);

            this.databaseService.insertIntoTableQuery('pricelistpriomst',
            'tablename,priority',
            [tablename,priority],i)
            .then((resobj) => {
                console.log(JSON.stringify(resobj));
            }, (err) => {
                console.log(JSON.stringify(err));
            });
        }
    }
  	callPromoDetails(typeid1,typeid2,typeid3,typeid4){
        return new Promise((resolve, reject) => {
            this.pernr = this.sharedService.getPernr();
            let className = this.sharedService.getAPIObj('promotions');
            // let pernr = this.utilService.encode64(this.pernr);
            let link = this.ip+className;
            var obj1 = {typeid:0,isLast:false};
            var obj2 = {typeid:0,isLast:false};
            var obj3 = {typeid:0,isLast:false};
            var obj4 = {typeid:0,isLast:false};
            var obj5 = {typeid:0,isLast:false};
            this.callPromoAPI(link,obj1,obj2,obj3,obj4,obj5, resolve, reject);
        });
  	}
    callPromoAPI(link,obj1,obj2,obj3,obj4,obj5, resolve, reject){
        // console.log(resolve);
        let action = '?pernr='+this.pernr+'&typeid1='+obj1['typeid']+'&typeid2='+obj2['typeid']+'&typeid3='+obj3['typeid']+'&typeid4='+obj4['typeid'];
        this.apiRequestService.getAPI(link+action).then((data) => {
            // console.log(JSON.stringify(data));
            this.populatePromo(link,obj1,obj2,obj3,obj4,obj5, resolve, reject, data['masters']);
        }, (err) => {
            console.log((err));
            reject(false);
        });
    }
    populatePromo(link,obj1,obj2,obj3,obj4,obj5, resolve, reject, data){
        var d1 = this.InsertIntoPromoFamilyTable(data['promofamilymst'],obj1);
    	var d2 = this.InsertIntoPromoMaterialTable(data['promomaterialmst'],obj2);
    	var d3 = this.InsertIntoPromoStructTable(data['promostructmst'],obj3);
    	var d4 = this.InsertIntoPromoMaterialStructTable(data['promomaterialstructmst'],obj4);
    	var d5 = this.InsertIntoPromoConfigTable(data['promoconfigmst'],obj5);
        Observable.forkJoin([d1, d2, d3, d4, d5]).subscribe(t=> {
            console.log(t);
            if(t[0]['isLast'] && t[1]['isLast'] && t[2]['isLast'] && t[3]['isLast'] && t[4]['isLast']) resolve(true);
            else this.callPromoAPI(link, t[0],t[1],t[2],t[3],t[4], resolve, reject);
        });

    }
    InsertIntoPromoFamilyTable(data,obj){
        return new Promise((resolve, reject) => {
            var _len = data.length;
            let epernr = this.utilService.encode64(this.pernr);
            if(obj['typeid']==0) this.databaseService.deleteTableQuery('promofamilymst',' where pernr=?',[epernr]).then((resobj) => {},(err) => {});
            if(_len == 0){
                obj.isLast = true;
                resolve(obj);
            }
            else{
                for (var i = 0; i < _len; i++)
                {
                    var row = data[i];
                    var pernr = epernr;
                    var typeid = this.utilService.encode64(row.typeid);
                    var description = this.utilService.encode64(row.description);
                    var startdate = (row.startdate);
                    var enddate = (row.enddate);
                    var orderedtype = this.utilService.encode64(row.orderedtype);
                    var promotype = this.utilService.encode64((row.promotype));
                    var ouom = this.utilService.encode64(row.ouom);
                    var puom = this.utilService.encode64(row.puom);
                    var oparameter = this.utilService.encode64(row.oparammeter);
                    var promoparameter = this.utilService.encode64(row.promoparameter);
                    var flag = this.utilService.encode64(row.flag.trim());

                    this.databaseService.insertIntoTableQuery('promofamilymst',
                    'typeid,description,startdate,enddate,orderedtype,promotype,ouom,puom,oparameter,promoparameter,pernr,flag',
                    [typeid,description,startdate,enddate,orderedtype,promotype,ouom,puom,oparameter,promoparameter,pernr,flag],i)
                    .then((resobj) => {
                         console.log('promofamilymst '+JSON.stringify(resobj));
                    }, (err) => {
                        console.log(JSON.stringify(err));
                    });
                    if(i == _len-1) {obj.typeid = row['typeid'] ;resolve(obj)};
                }
            }
        });
    }
    InsertIntoPromoMaterialTable(data,obj){
        return new Promise((resolve, reject) => {
            var _len = data.length;
            let epernr = this.utilService.encode64(this.pernr);
            if(obj['typeid']==0) this.databaseService.deleteTableQuery('promomaterialmst',' where pernr=?',[epernr]).then((resobj) => {},(err) => {});
            if(_len == 0){
                obj.isLast = true;
                resolve(obj);
            }
            else{
                for (var i = 0; i < _len; i++)
                {
                    var row = data[i];
                    var pernr = epernr;
                    var typeid = this.utilService.encode64(row.typeid);
                    var promoid = this.utilService.encode64(row.promoid);
                    var matnr = this.utilService.encode64(row.matnr);
                    var type = this.utilService.encode64((row.type));
                    var qnty = this.utilService.encode64(row.qnty);
                    var uom = this.utilService.encode64(row.uom);
                    var discount = this.utilService.encode64(row.discount);
                    var price = this.utilService.encode64(row.price);

                    this.databaseService.insertIntoTableQuery('promomaterialmst',
                    'typeid,promoid,matnr,type,pernr,qnty,uom,discount,price',
                    [typeid,promoid,matnr,type,pernr,qnty,uom,discount,price],i)
                    .then((resobj) => {
                         console.log('promomaterialmst '+JSON.stringify(resobj));
                    }, (err) => {
                        console.log(JSON.stringify(err));
                    });
                    if(i == _len-1) {obj.typeid = row['typeid'] ;resolve(obj)};
                }
            }
        });
    }
    InsertIntoPromoStructTable(data,obj){
        return new Promise((resolve, reject) => {
            var _len = data.length;
            let epernr = this.utilService.encode64(this.pernr);
            if(obj['typeid']==0) this.databaseService.deleteTableQuery('promostructmst',' where pernr=?',[epernr]).then((resobj) => {},(err) => {});
            if(_len == 0){
                obj.isLast = true;
                resolve(obj);
            }
            else{
                for (var i = 0; i < _len; i++)
                {
                    var row = data[i];
                    var pernr = epernr;
                    var typeid = this.utilService.encode64(row.typeid);
                    var description = this.utilService.encode64(row.description);
                    var startdate = (row.startdate);
                    var enddate = (row.enddate);
                    var forcedflag = this.utilService.encode64(row.forcedflag);
                    var discount = this.utilService.encode64((row.discount));
                    var ouom = this.utilService.encode64(row.ouom);
                    var flag = this.utilService.encode64(row.flag.trim());

                    this.databaseService.insertIntoTableQuery('promostructmst',
                    'typeid,description,startdate,enddate,forcedflag,discount,ouom,pernr,flag',
                    [typeid,description,startdate,enddate,forcedflag,discount,ouom,pernr,flag],i)
                    .then((resobj) => {
                         console.log('promostructmst '+JSON.stringify(resobj));
                    }, (err) => {
                        console.log(JSON.stringify(err));
                    });
                    if(i == _len-1) {obj.typeid = row['typeid'] ;resolve(obj)};
                }
            }
        });
    }
    InsertIntoPromoMaterialStructTable(data,obj){
        return new Promise((resolve, reject) => {
            var _len = data.length;
            let epernr = this.utilService.encode64(this.pernr);
            if(obj['typeid']==0) this.databaseService.deleteTableQuery('promomaterialstructmst',' where pernr=?',[epernr]).then((resobj) => {},(err) => {});
            if(_len == 0){
                obj.isLast = true;
                resolve(obj);
            }
            else{
                for (var i = 0; i < _len; i++)
                {
                    var row = data[i];
                    var pernr = epernr;
                    var typeid = this.utilService.encode64(row.typeid);
                    var promoid = this.utilService.encode64(row.promoid);
                    var matnr = this.utilService.encode64(row.matnr);
                    var discount = this.utilService.encode64((row.discount));
                    var type = this.utilService.encode64(row.type);

                    this.databaseService.insertIntoTableQuery('promomaterialstructmst',
                    'typeid,promoid,matnr,type,pernr,discount',
                    [typeid,promoid,matnr,type,pernr,discount],i)
                    .then((resobj) => {
                         console.log('promomaterialstructmst '+JSON.stringify(resobj));
                    }, (err) => {
                        console.log(JSON.stringify(err));
                    });
                    if(i == _len-1) {obj.typeid = row['typeid'] ;resolve(obj)};
                }
            }
        });
    }
    InsertIntoPromoConfigTable(data,obj){
        return new Promise((resolve, reject) => {
            var _len = data.length;
            let epernr = this.utilService.encode64(this.pernr);
            if(obj['isLast']){
                if(obj['typeid']==0) this.databaseService.deleteTableQuery('promoconfigmst',' where pernr=?',[epernr]).then((resobj) => {},(err) => {});
                if(_len == 0){
                    obj.isLast = true;
                    resolve(obj);
                }
                else{
                    for (var i = 0; i < _len; i++)
                    {
                        var row = data[i];
                        var pernr = epernr;
                        var typeid = this.utilService.encode64(row.typeid);
                        var value = this.utilService.encode64(row.value);
                        var promovalue = this.utilService.encode64(row.promovalue);
                        var promotype = this.utilService.encode64(row.promotype);

                        this.databaseService.insertIntoTableQuery('promoconfigmst',
                        'typeid,value,promovalue,promotype,pernr',
                        [typeid,value,promovalue,promotype,pernr],i)
                        .then((resobj) => {
                            console.log('promoconfigmst '+JSON.stringify(resobj));
                        }, (err) => {
                            console.log(JSON.stringify(err));
                        });
                        if(i == _len-1) {obj.isLast = true; resolve(obj);}
                    }
                }
            }
            else{
                obj.isLast = true;
                resolve(obj);
            }
        });
    }
}
