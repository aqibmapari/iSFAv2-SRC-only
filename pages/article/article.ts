import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {ArticleListPage} from './list/articlelist';
/**
 * Generated class for the ArticlePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({name: 'Article'})
@Component({
  selector: 'page-article',
  templateUrl: 'article.html',
})
export class ArticlePage {
	tabsArticle: Array<{title: string,value: string, root: any, icon: string}>;
	segmentModel: string;
	constructor(public navCtrl: NavController) {
		this.tabsArticle = [
			{ title: "Article",value:"list", root: ArticleListPage, icon: "calendar" }
		];
		this.segmentModel = "list";
	}
	segmentValueChange(value:string):void {
		//console.log(value);
		this.segmentModel = value;
	}

}
