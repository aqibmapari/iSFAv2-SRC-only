import {Component, Input} from "@angular/core";

@Component({
    templateUrl: "regular-top10.html",
    selector: "regular-top10"
})
export class RegularTop10Component{
	@Input() public period: string;
	constructor() {

	}
}
