import {Component, Input} from "@angular/core";

@Component({
    templateUrl: "target-acheived.html",
    selector: "target-acheived"
})
export class TargetAcheivedComponent{
	@Input() public period: string;
	constructor() {

	}
}
