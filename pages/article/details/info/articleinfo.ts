import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import {UtilService} from '../../../../providers/util.service';

@Component({
	selector: 'article-info',
	templateUrl: 'articleinfo.html'
})
export class ArticleInfo {
	selectedArticle : any;
	constructor(private utilService: UtilService, private navParams: NavParams) {
		this.selectedArticle = navParams.get('selectedArticle');
	}
}
