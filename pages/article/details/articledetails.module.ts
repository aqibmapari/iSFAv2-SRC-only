import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { TabsComponentModule } from "../../../components/tabs/tabs.module";
// import {SharedModule} from '../../../app/shared.module';
import { ArticleDetailsPage } from './articledetails';
import { ArticleInfo } from './info/articleinfo';
import {ArticleAttributes} from './attributes/articleattributes';
import {ArticlePicture} from './picture/articlepicture';
import {ArticleVideos} from './videos/articlevideos';
import {ArticleSpecifications} from './specifications/articlespecifications';
import {ArticleApplications} from './applications/articleapplications';
import {ArticleBenefits} from './benefits/articlebenefits';

@NgModule({
  declarations: [
  ArticleDetailsPage,
	ArticleInfo,
	ArticleAttributes,
	ArticlePicture,
	ArticleVideos,
	ArticleSpecifications,
	ArticleApplications,
	ArticleBenefits
  ],
  imports: [
		TabsComponentModule,
    IonicPageModule.forChild(ArticleDetailsPage)
  ]
})
export class ArticleDetailsPageModule {}
