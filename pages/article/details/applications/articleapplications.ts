import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

import {UtilService} from '../../../../providers/util.service';

@Component({
	selector: 'article-applications',
	templateUrl: 'articleapplications.html'
})
export class ArticleApplications {
	selectedArticle : any;
	constructor(private utilService: UtilService, private navParams: NavParams) {
		this.selectedArticle = navParams.get('selectedArticle');
		this.selectedArticle.applications = [
			{text: "Very tasty"},
			{text: "Easy to Use/ Handle"},
			{text: "Healthy"}
		]
	}
}
