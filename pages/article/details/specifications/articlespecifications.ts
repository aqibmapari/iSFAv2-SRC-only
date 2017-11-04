import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

import {UtilService} from '../../../../providers/util.service';

@Component({
	selector: 'article-specifications',
	templateUrl: 'articlespecifications.html'
})
export class ArticleSpecifications {
	selectedArticle : any;
	constructor(private utilService: UtilService, private navParams: NavParams) {
		this.selectedArticle = navParams.get('selectedArticle');
		this.selectedArticle.properties = "A mayonnaise that spreads well, clings well, binds well, doesn t weep our enhances the flavour of everything that its added to";
		this.selectedArticle.preparation = "Use as required";
		this.selectedArticle.ingredients = "CANOLA OIL, WATER LIQUID WHOLE EGG AND YOLK, VINEGAR, SALT, SUGAR, SPICE, CONCENTRATED LEMON JUICE, CALCIUM DISODIUM EDTA,\r\nCONTAINS:EGG";
		this.selectedArticle.yield = "1333 avg. serving per case testing";
		this.selectedArticle.tips = "Ideal for sandwiches, sandwich with wrap filling, Caesar and Coleslaw dressings";
	}
}
