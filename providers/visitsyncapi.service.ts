import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map'
import {UtilService} from './util.service';
import {DatabaseService} from './database.service';
import {SharedService} from './sharedservice';
import {APIRequestService} from './apirequest.service';
@Injectable()
export class VisitSyncAPIService {
    ip : string;
    pernr : string;
    constructor(public utilService: UtilService,
    public databaseService: DatabaseService,
    public sharedService: SharedService,
    public apiRequestService: APIRequestService) {
        this.ip = this.sharedService.getIP();
    }
  	callVisitPJP(){
        this.apiRequestService.updateLoaderContent("Getting Visit Master");
        return new Promise((resolve, reject) => {
            this.pernr = this.sharedService.getPernr();
            let className = this.sharedService.getAPIObj('visitpjp');
            // let pernr = this.utilService.encode64(this.pernr);
            let link = this.ip+className;
            // link = 'http://212.118.101.174:8081/bsalesfs/VisitsToApp.do';
            let action = '?pernr='+this.pernr;
            this.apiRequestService.getAPI(link+action).then((data) => {
                console.log(data);
                this.callActualVisits(data['visitexcuplmst']).then((obj) => {
                    resolve(true);
                }, (err) => {reject(false)});
            }, (err) => {
                console.log((err));
                reject(false);
            });
        });
  	}
  	callActualVisits(visitPJP){
        return new Promise((resolve, reject) => {
            var context = this;
            this.pernr = this.sharedService.getPernr();
            let className = this.sharedService.getAPIObj('visitapp');
            // let pernr = this.utilService.encode64(this.pernr);
            let link = this.ip+className;
            // link = 'http://212.118.101.174:8081/bsalesfs/GetVisitsFromApp.do';
            let action = '?action=get&pernr='+this.pernr;
            this.apiRequestService.getAPI(link+action).then((data) => {
                console.log(data);
                var visitActual = data['masters']['visitmst'];
                console.log(visitActual);
                var visitFinalArr = (visitPJP);
                for (var i=0; i<visitActual.length; i++){
                    var visitObj = visitActual[i];
                    var index = visitFinalArr.map(function(x) {
                        return (x['pernr'] == visitObj['assigneeUserId'] && x['kunnr'] == visitObj['kunnr'] && x['visitdate'] == visitObj['visitdate']
                                && context.utilService.convertTime24HrFormat(x['starttime']) == visitObj['visitstarttime']
                                && context.utilService.convertTime24HrFormat(x['endtime']) == visitObj['visitendtime'])
                    }).indexOf(true);
                    if(index === -1){
                        visitObj.starttime = context.utilService.formatAMPM(visitObj['visitstarttime']);
                        visitObj.endtime = context.utilService.formatAMPM(visitObj['visitendtime']);
                        visitFinalArr.push(visitObj);
                    }
                    else{
                        visitFinalArr[index].serverFlag = 'Y';
                        visitFinalArr[index] = Object.assign(visitObj, visitFinalArr[index]);
                    }
                }
                this.insertVisits(visitFinalArr);
                resolve(true);
            }, (err) => {
                console.log((err));
                reject(false);
            });
        });
  	}
    insertVisits(data){
        console.log(data);
        var _len = data.length;
        let epernr = this.utilService.encode64(this.pernr);
        this.databaseService.deleteTableQuery('visittran',' where assigneeUserId=?',[epernr]).then((resobj) => {},(err) => {});
        if(_len == 0){
            // resolve(true);
        }
        else{
            let batchArray = [];
            for (var i = 0; i < _len; i++)
            {
                var selrow = data[i];
                // var pernr = epernr;
                this.databaseService.selectTableQuery('customermst','distinct kunnr,name1',' where kunnr=?',
                [this.utilService.encode64(selrow.kunnr)],i).then((resobj) => {
                    var index = resobj['index'];
                    if(resobj['rows'].length != 0){
                        var row = data[index];
                        var custRow = resobj['rows']['item'](0);
                        var visitdatetime = this.utilService.formatDateToDatabaseFormat(row.visitdate)+' '+this.utilService.convertTime24HrFormat(row['starttime'])+'.00';
                        var visitid = this.pernr+this.utilService.returnDateTime(visitdatetime,true)/1000;
                        console.log(visitid);
                        var sendflag = this.utilService.encode64('N');
                        var createdUserId = this.utilService.encode64(row.pernr);
                        var visitDate = (row.visitdate);
                        var visitStartTime = (row.starttime);
                        var visitEndTime = (row.endtime);

                        var customerId =  this.utilService.encode64(row.kunnr);
        				var customerName =  (custRow.name1);
                        var customerType =  this.utilService.encode64(row.customerType);

        				var contactPerson = this.utilService.encode64(row.contactperson);
        				var contactNumber = this.utilService.encode64(row.contactnumber);
        				var creationDate = row.creationdate;
        				var creationTime = row.creationtime;
        				var discription =  this.utilService.encode64(row.description);
        				var visitTypeId =  this.utilService.encode64(row.visitTypeid);
        				var reasonId =  this.utilService.encode64(row.reasonId);
        				var priorityId =  this.utilService.encode64(row.priorityId);
        				var assigneeName = this.utilService.encode64(row.assigneeName);
        				var assigneeUserId = this.utilService.encode64(row.assigneeUserId);
        				// var category = this.utilService.encode64(row.category);
        				var status = this.utilService.encode64(row.status);
        				var note = this.utilService.encode64(row.note);

        				var checkintime = (row.checkintime);
        				var checkouttime = (row.checkouttime);
        				var checkindate = (row.checkindate);
        				var checkoutdate = (row.checkoutdate);
        				var latforuser = this.utilService.encode64(row.latitude);
        				var longforuser = this.utilService.encode64(row.longitude);

        				var ooflag = this.utilService.encode64(row.ooflag);

                        let tableName = 'visittran';
                        let columns = 'visitid,createdUserId,visitDate,visitStartTime,visitEndTime,customerId,customerType,customerName,'+
                        'contactPerson,contactNumber,creationDate,creationTime,discription,visitTypeId,reasonId,priorityId,'+
                        'assigneeName,assigneeUserId,status,checkintime,checkouttime,'+
                        'checkindate, checkoutdate, note, sendflag,ooflag,latforuser,longforuser';
                        let placeholders = this.databaseService._createPlaceHolder(columns);
                        let params = [visitid,createdUserId,visitDate,visitStartTime,visitEndTime,customerId,customerType,customerName,
                            contactPerson,contactNumber,creationDate,creationTime,discription,visitTypeId,reasonId,priorityId,
                            assigneeName,assigneeUserId,status,checkintime,checkouttime,
                            checkindate, checkoutdate, note, sendflag,ooflag,latforuser,longforuser]
                        batchArray.push(['INSERT OR REPLACE INTO '+tableName+' ('+columns+') VALUES( '+placeholders+')', params]);

                    }
                    if(index === _len-1){
                        this.databaseService.executeBatchRequest(batchArray).then((bResObj) => {
                            // obj.typeid = data[_len-1]['typeid'] ;resolve(obj)
                        }, (err) => {
                            console.error('Unable to execute sql: ', err);
                            // reject(false);
                        });
                    }


                },(err) => {});
            }
        }
    }
}
