import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import {UtilService} from '../../../providers/util.service';
import {DatabaseService} from '../../../providers/database.service';
import {SharedService} from '../../../providers/sharedservice';

@Component({
	selector: 'settings-default',
	templateUrl: 'settingsdefault.html'
})
export class SettingsDefault {
	selectedSettings : any = {};
	pernr : any;
	constructor(private utilService: UtilService,
		public platform: Platform,
		public databaseService: DatabaseService,
		public sharedService: SharedService) {
		this.platform.ready().then(() => {
			this.pernr = this.sharedService.getPernr();
			this.selectedSettings = {
				duration: '1 Hour',
				visittype: 'Sales',
				reason: 'Regular Visit',
				priority: 'Medium'
			};
			var sql = 'SELECT distinct pernr,id,subtyp FROM defaults where pernr=?'
			this.databaseService.selectComplexQuery(sql,[this.utilService.encode64(this.pernr)],0)
            .then((results) => {
                console.log(JSON.stringify(results));
								if(results['rows'] !== undefined && results['rows'] !== null){
									if(results['rows'].length !== 0){
										for(var i=0; i < results['rows'].length; i++){
											var row = results['rows']['item'](i);
											if(this.utilService.decode64(row.subtyp)=='salesorganization'){
												this.selectedSettings.salesorg = this.utilService.decode64(row.id);
											}
											else if(this.utilService.decode64(row.subtyp)=='distributionchannel'){
												this.selectedSettings.distrchannel = this.utilService.decode64(row.id);
											}
											else if(this.utilService.decode64(row.subtyp)=='division'){
												this.selectedSettings.division = this.utilService.decode64(row.id);
											}
											else if(this.utilService.decode64(row.subtyp)=='order'){
												this.selectedSettings.salesdoc = this.utilService.decode64(row.id);
											}
										}
									}
								}
            }, (err) => {
                console.log(JSON.stringify(err));
            });
		});
	}
}
