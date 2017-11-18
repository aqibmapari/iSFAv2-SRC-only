import {Component, Input, OnInit,EventEmitter,Output} from "@angular/core";

@Component({
    templateUrl: "tabs.html",
    selector: "tabs-directive"
})
export class TabsComponent implements OnInit{
    @Input() public tabmodel: any;
	@Input() public tabselected: string;
	tabs: Array<{title: string,value: string, root: any, icon: string}>;
	@Output() segmentChange: EventEmitter<string> = new EventEmitter<string>();
	segmentModel: string;
	constructor() {

	}
	ngOnInit() {
		this.tabs = this.tabmodel ;
		this.segmentModel = this.tabselected;
	}
	segmentClicked(value){
		//console.log(this.segmentModel);
		this.segmentChange.emit(value)
	}
}
