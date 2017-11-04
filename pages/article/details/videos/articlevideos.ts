import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

import {UtilService} from '../../../../providers/util.service';

@Component({
	selector: 'article-videos',
	templateUrl: 'articlevideos.html'
})
export class ArticleVideos {
	selectedArticle : any;
	constructor(private utilService: UtilService, private navParams: NavParams) {
		this.selectedArticle = navParams.get('selectedArticle');
	}
}
