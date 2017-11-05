import {Component, Input} from "@angular/core";

@Component({
    templateUrl: "top10-sales.html",
    selector: "top10-sales"
})
export class Top10SalesComponent{
	@Input() public period: string;
	constructor() {

	}
}
