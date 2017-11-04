import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { ArticleInfo } from './info/articleinfo';
import {ArticleAttributes} from './attributes/articleattributes';
import {ArticlePicture} from './picture/articlepicture';
import {ArticleVideos} from './videos/articlevideos';
import {ArticleSpecifications} from './specifications/articlespecifications';
import {ArticleApplications} from './applications/articleapplications';
import {ArticleBenefits} from './benefits/articlebenefits';

@IonicPage({name: 'ArticleDetailsPage'})
@Component({
	selector: 'page-articledetails',
	templateUrl: 'articledetails.html'
})
export class ArticleDetailsPage {
	tabs: Array<{title: string,value: string, root: any, icon: string}>;
	segmentModel: string;
	constructor(public navCtrl: NavController) {
		this.tabs = [
			{ title: "Article",value:"article", root: ArticleInfo, icon: "calendar" },
			{ title: "Attributes",value:"attributes", root: ArticleAttributes, icon: "calendar" },
			{ title: "Picture",value:"picture", root: ArticlePicture, icon: "calendar" },
			{ title: "Videos",value:"videos", root: ArticleVideos, icon: "calendar" },
			{ title: "Specifications",value:"specifications", root: ArticleSpecifications, icon: "calendar" },
			{ title: "Applications",value:"applications", root: ArticleApplications, icon: "calendar" },
			{ title: "Benefits",value:"benefits", root: ArticleBenefits, icon: "calendar" }
		];
		this.segmentModel = "article";
	}
	segmentValueChange(value:string):void {
		//console.log(value);
		this.segmentModel = value;
	}
}
