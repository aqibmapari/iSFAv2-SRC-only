import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArticlePage } from './article';
import {ArticleListPage} from './list/articlelist';
import { TabsComponentModule } from "../../components/tabs/tabs.module";

@NgModule({
  declarations: [
    ArticlePage,
    ArticleListPage
  ],
  imports: [
    TabsComponentModule,
    IonicPageModule.forChild(ArticlePage),
  ],
})
export class ArticlePageModule {}
