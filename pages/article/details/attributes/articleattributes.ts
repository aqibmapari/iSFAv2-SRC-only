import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';
import {UtilService} from '../../../../providers/util.service';

@Component({
	selector: 'article-attributes',
	templateUrl: 'articleattributes.html'
})
export class ArticleAttributes {
	selectedArticle : any;
	constructor(private utilService: UtilService, private navParams: NavParams) {
		this.selectedArticle = navParams.get('selectedArticle');
	}
}
