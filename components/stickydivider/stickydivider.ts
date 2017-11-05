import {Component, Input} from "@angular/core";

@Component({
    templateUrl: "stickydivider.html",
    selector: "sticky-divider"
})
export class StickyDividerComponent{
	@Input() public displayText: string;
	constructor() {

	}
}
