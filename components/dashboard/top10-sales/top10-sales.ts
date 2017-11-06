import {Component, Input, OnInit} from "@angular/core";
import { UtilService } from "../../../providers/util.service";
@Component({
    templateUrl: "top10-sales.html",
    selector: "top10-sales"
})
export class Top10SalesComponent implements OnInit{
	@Input() public period: string;
	private salesData: Array<{name: string, per: number, value: number, target: number, width: string, color: string}>;
	constructor(private utilService: UtilService) {
		this.salesData=[
			{name: "Hypercity",per: 0, value: 25000, target: 35000, width: '', color: ''},
			{name: "Hypercity",per: 0, value: 25000, target: 35000, width: '', color: ''},
			{name: "Hypercity",per: 0, value: 25000, target: 35000, width: '', color: ''},
			{name: "Hypercity",per: 0, value: 25000, target: 35000, width: '', color: ''},
			{name: "Hypercity",per: 0, value: 25000, target: 35000, width: '', color: ''}
		]
	}
	ngOnInit(){
		for(var i=0; i<this.salesData.length; i++){
			let row = this.salesData[i];
			this.salesData[i].per = this.utilService.getPercentage(row.value,row.target);
			this.salesData[i].width = this.salesData[i].per + '%';
			this.salesData[i].color = this.utilService.getDisplayColor(row.value,row.target,this.period);
			console.log(this.salesData[i].color);
		}
	}
}
