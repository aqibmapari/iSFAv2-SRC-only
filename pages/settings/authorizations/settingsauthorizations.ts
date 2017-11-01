import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import {UtilService} from '../../../providers/util.service';
import {DatabaseService} from '../../../providers/database.service';
import {SharedService} from '../../../providers/sharedservice';
@Component({
	selector: 'settings-authorizations',
	templateUrl: 'settingsauthorizations.html'
})
export class SettingsAuthorizations {
	selectedSettings : any = {};
	pernr : any;
	constructor(private utilService: UtilService,
		public platform: Platform,
		public databaseService: DatabaseService,
		public sharedService: SharedService) {
		this.platform.ready().then(() => {
			this.pernr = this.sharedService.getPernr();
			this.selectedSettings = {
				branch: '2100',
				custgroup: '',
				custclass: '',
				custchain: '',
				popclass: '',
				industry: '*',
				industrycode1: '*',
				status: '',
				parentgroup: '*',
				tersalesgrp: '*',
				customer: '510213,510406,510223',
				businessunit: '',
				productdiv: '',
				category: '',
				subcategory: '',
				principal: '',
				brand: '',
				segment: ''
			};
			var sql1 = 'SELECT distinct pernr, branch ,customergroup ,customerclass ,customerchain ,popclass, industry, industrycode1,'+
			'parentgroup ,territorysalesgrp , customer, status from custtabmst where pernr=?'
			this.databaseService.selectComplexQuery(sql1,[this.utilService.encode64(this.pernr)],0)
            .then((results) => {
                console.log(JSON.stringify(results));
				if(results['rows'] !== undefined && results['rows'] !== null){
					if(results['rows'].length !== 0){
						var row = results['rows']['item'](0);
						this.selectedSettings.branch = this.utilService.checkReturnValue(this.utilService.decode64(row.branch),'');
						this.selectedSettings.custgroup = this.utilService.checkReturnValue(this.utilService.decode64(row.customergroup),'');
						this.selectedSettings.custclass = this.utilService.checkReturnValue(this.utilService.decode64(row.customerclass),'');
						this.selectedSettings.custchain = this.utilService.checkReturnValue(this.utilService.decode64(row.customerchain),'');
						this.selectedSettings.popclass = this.utilService.checkReturnValue(this.utilService.decode64(row.popclass),'');
						this.selectedSettings.industry = this.utilService.checkReturnValue(this.utilService.decode64(row.industry),'');
						this.selectedSettings.industrycode1 = this.utilService.checkReturnValue(this.utilService.decode64(row.industrycode1),'');
						this.selectedSettings.status = this.utilService.checkReturnValue(this.utilService.decode64(row.status),'');
						this.selectedSettings.parentgroup = this.utilService.checkReturnValue(this.utilService.decode64(row.parentgroup),'');
						this.selectedSettings.tersalesgrp = this.utilService.checkReturnValue(this.utilService.decode64(row.territorysalesgrp),'');
						this.selectedSettings.customer = this.utilService.checkReturnValue(this.utilService.decode64(row.customer),'');
					}
				}

            }, (err) => {
                console.log(JSON.stringify(err));
            });


			var sql2 = 'SELECT distinct pernr , businessunit ,producdivision ,category ,subcategory ,principal, brand ,segment '+
			'from articletabmst where pernr=?'
			this.databaseService.selectComplexQuery(sql2,[this.utilService.encode64(this.pernr)],0)
            .then((results) => {
                console.log(JSON.stringify(results));
				if(results['rows'] !== undefined && results['rows'] !== null){
					if(results['rows'].length !== 0){
						var row = results['rows']['item'](0);
						this.selectedSettings.businessunit = this.utilService.checkReturnValue(this.utilService.decode64(row.businessunit),'');
						this.selectedSettings.productdiv = this.utilService.checkReturnValue(this.utilService.decode64(row.producdivision),'');
						this.selectedSettings.category = this.utilService.checkReturnValue(this.utilService.decode64(row.category),'');
						this.selectedSettings.subcategory = this.utilService.checkReturnValue(this.utilService.decode64(row.subcategory),'');
						this.selectedSettings.principal = this.utilService.checkReturnValue(this.utilService.decode64(row.principal),'');
						this.selectedSettings.brand = this.utilService.checkReturnValue(this.utilService.decode64(row.brand),'');
						this.selectedSettings.segment = this.utilService.checkReturnValue(this.utilService.decode64(row.segment),'');
					}
				}
            }, (err) => {
                console.log(JSON.stringify(err));
            });
		});
	}
}
