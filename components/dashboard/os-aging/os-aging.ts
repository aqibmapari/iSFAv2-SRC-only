import {Component, Input} from "@angular/core";

@Component({
    templateUrl: "os-aging.html",
    selector: "os-aging"
})
export class OSAgingComponent{
	@Input() public period: string;
	constructor() {

	}
}
