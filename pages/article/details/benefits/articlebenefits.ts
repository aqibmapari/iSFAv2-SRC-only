import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

import {UtilService} from '../../../../providers/util.service';

@Component({
	selector: 'article-benefits',
	templateUrl: 'articlebenefits.html'
})
export class ArticleBenefits {
	selectedArticle : any;
	constructor(private utilService: UtilService, private navParams: NavParams) {
		this.selectedArticle = navParams.get('selectedArticle');
		this.selectedArticle.benefits = [
			{text: "Very tasty"},
			{text: "Easy to Use/ Handle"},
			{text: "Healthy"}
		]
	}
}
