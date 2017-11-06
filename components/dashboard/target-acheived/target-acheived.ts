import {Component, Input, OnInit} from "@angular/core";
import c3 from "c3";
import { UtilService } from "../../../providers/util.service";

@Component({
    templateUrl: "target-acheived.html",
    selector: "target-acheived"
})
export class TargetAcheivedComponent implements OnInit{
	@Input() public period: string;
	chart: any;
	dataObj: {achPer:number, totVal:number, achVal: number };
	constructor(private utilService: UtilService) {

	}
	ngOnInit(){
		if(this.period === 'month') this.dataObj = {achPer:null, totVal:25000, achVal: 6000};
		else this.dataObj = {achPer:null, totVal:100000, achVal: 60000};
		this.dataObj.achPer = Math.round(this.utilService.getPercentage(this.dataObj.achVal,this.dataObj.totVal));
		this.chart = c3.generate({
			data: {
				columns: [
					['data', this.dataObj.achPer]
				],
				colors: {data: this.utilService.getDisplayColor(this.dataObj.achVal,this.dataObj.totVal,this.period)},
				type: 'gauge',
				onclick: function (d, i) { console.log("onclick", d, i); },
				onmouseover: function (d, i) { console.log("onmouseover", d, i); },
				onmouseout: function (d, i) { console.log("onmouseout", d, i); }
			},
			gauge: {
		//        label: {
		//            format: function(value, ratio) {
		//                return value;
		//            },
		//            show: false // to turn off the min/max labels.
		//        },
		//    min: 0, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
		//    max: 100, // 100 is default
		//    units: ' %',
		//    width: 39 // for adjusting arc thickness
			},
			size: {
				height: 200
			}
		});
	}
}
