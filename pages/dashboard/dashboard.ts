import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { DashboardMonthPage } from "./month/dashboardmonth";
import { DashboardYearPage } from "./year/dashboardyear";
import { SharedService } from "../../providers/sharedservice";
/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({name: 'Dashboard'})
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  private userInfo: string;
  private tabsArticle: Array<{title: string,value: string, root: any, icon: string}>;
  private segmentModel: string;
  private rightOptions: Array<{value: string, text: string}>;
  private selectedRightOption: string;
  constructor(public navCtrl: NavController,
    private sharedService: SharedService) {

    this.tabsArticle = [
			{ title: "Month",value:"month", root: DashboardMonthPage, icon: "calendar" },
			{ title: "Year",value:"year", root: DashboardYearPage, icon: "calendar" }
		];
    this.segmentModel = "month";
    this.userInfo = this.sharedService.getUserName()+' - '+this.sharedService.getPernr();

    this.rightOptions = [
			{ text: "Target Vs Acheived",value:"1"},
			{ text: "Regular Top 10 Customers",value:"2" },
			{ text: "Total O/S Aging (Rs)",value:"3" },
			{ text: "Top 10 Customer Sales",value:"4" }
    ];
    this.selectedRightOption = "1";
	}
	segmentValueChange(value:string):void {
		//console.log(value);
		this.segmentModel = value;
	}
  setSelectedOption(){

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }

}
