import {Component, Input, OnInit} from "@angular/core";
import c3 from "c3";
@Component({
    templateUrl: "os-aging.html",
    selector: "os-aging"
})
export class OSAgingComponent implements OnInit{
	@Input() public period: string;
	private chart: any;
	constructor() {

	}
	ngOnInit(){
		this.chart = c3.generate({
			data: {
				// iris data from R
				columns: [
					['0-30', 75000],
					['30-45', 5600],
					['45-60', 25000],
					['60-90', 1234],
					['90-180', 5500],
					['180 and above', 100]
				],
				type : 'pie',
				onclick: function (d, i) { console.log("onclick", d, i); },
				onmouseover: function (d, i) { console.log("onmouseover", d, i); },
				onmouseout: function (d, i) { console.log("onmouseout", d, i); }
			}
		});
	}
}
