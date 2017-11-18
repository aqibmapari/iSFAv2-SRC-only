import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {SharedService} from '../providers/sharedservice';
import {UtilService} from '../providers/util.service';
import {DatabaseService} from '../providers/database.service';
// import {APIRequestService} from '../providers/apirequest.service';
// import {AfterLoginAPIService} from '../providers/afterloginapi.service';
import {CreateAllTablesService} from '../providers/createtables.service';


@Component({
	templateUrl: 'app.html',
	providers: []
})
export class MyApp {
	@ViewChild(Nav) nav: Nav;

	rootPage: any;

	pages: Array<{}>;
	constructor(public platform: Platform,private statusBar: StatusBar,private splashScreen: SplashScreen,
		public modalCtrl: ModalController,
		private sharedService: SharedService,
		public databaseService: DatabaseService,
		public createTables: CreateAllTablesService,
		public utilService: UtilService
	) {
		console.log(this.platform)
		this.initializeApp();
		sharedService.setIP('http://212.118.101.172:8081/bsales5jan');
		sharedService.setIsApp(platform.is('core') || platform.is('mobileweb')? false: true);
		sharedService.setAPIObj([{key: 'user', className: '/getUserJsonAction.do'},
			{key: 'authenticate', className: '/ValidateLoginAction.do'},
			{key: 'dashboardvideo', className: '/VideoMessageAction.do'},
			{key: 'settings', className: '/GetUserAuthorizationsToApp.do'},
			{key: 'parameters', className: '/GetParametersToApp.do'},
			{key: 'menuparameters', className: '/GetUserMenuAuthorization.do'},
			{key: 'materials', className: '/MaterialDetailsToApp.do'},
			{key: 'pricelist', className: '/GetPriceListMastersToApp.do'},
			{key: 'prioritymaster', className: '/GetMasterToApp.do'},
			{key: 'promotions', className: '/GetPromoToApp.do'},
			{key: 'customers', className: '/CustomerDetailsToApp.do'},
			{key: 'visitpjp', className: '/VisitsToApp.do'},
			{key: 'visitapp', className: '/GetVisitsFromApp.do'},
			{key: 'credit', className: '/CustomerCreditToApp.do'},
			{key: 'sodetails', className: '/GetOrderStatusToApp.do'},
			{key: 'custcontact', className: '/GetCustomerContactDetails.do'},
			{key: 'custasset', className: '/GetCustAssetsToApp.do'},
			{key: 'changepwd', className: '/GetPasswordChangeReqFromApp.do'}
		]);
		// used for an example of ngFor and navigation
		sharedService.setPages( [
			// { title: 'My Activity',id : 'myactivity',show: false, component: 'MyActivity', iconName:'list-box', iosIcon:'ios-list-box', androidIcon:'md-list-box' },
			{ title: 'Dashboard',id : 'dashboard',show: true, component: 'Dashboard', iconName:'pie', iosIcon:'ios-pie', androidIcon:'md-pie' },
			// { title: 'Diary',id : 'diary',show: false, component: 'Diary', iconName:'calendar', iosIcon:'ios-calendar', androidIcon:'md-calendar' },
			{ title: 'Customer',id : 'customer',show: true, component: 'Customer', iconName:'person', iosIcon:'ios-person', androidIcon:'md-person' },
			{ title: 'Article',id : 'article',show: true, component: 'Article', iconName:'logo-dropbox', iosIcon:'logo-dropbox', androidIcon:'logo-dropbox' },
			// { title: 'Lead',id : 'lead',show: false, component: 'Lead', iconName:'people', iosIcon:'ios-people', androidIcon:'md-people' },
			// { title: 'Potential',id : 'potential',show: false, component: 'Potential', iconName:'trending-up', iosIcon:'ios-trending-up', androidIcon:'md-trending-up' },
			// { title: 'Price List',id : 'pricelist',show: false, component: 'PriceList', iconName:'logo-usd', iosIcon:'logo-usd', androidIcon:'logo-usd' },
			// { title: 'Merchandising',id : 'merchandising',show: false, component: 'Merchandising', iconName:'logo-markdown', iosIcon:'logo-markdown', androidIcon:'logo-markdown' },
			// { title: 'Capture',id : 'capture',show: false, component: 'Capture', iconName:'checkbox-outline', iosIcon:'ios-checkbox-outline', androidIcon:'md-checkbox-outline' },
			// { title: 'Stock Status',id : 'stock',show: false, component: 'StockStatus', iconName:'logo-buffer', iosIcon:'logo-buffer', androidIcon:'logo-buffer' },
			// { title: 'Orders',id : 'order',show: false, component: 'Orders', iconName:'cart', iosIcon:'ios-cart', androidIcon:'md-cart' },
			// { title: 'POD',id : 'pod',show: false, component: 'POD', iconName:'train', iosIcon:'ios-train', androidIcon:'md-train' },
			// { title: 'Market Intelligence',id : 'marketintelligence',show: false, component: 'MarketIntelligence', iconName:'stats', iosIcon:'ios-stats', androidIcon:'md-stats' },
			// { title: 'Market Plan',id : 'marketplan',show: false, component: 'MarketPlan', iconName:'globe', iosIcon:'ios-globe', androidIcon:'md-globe' },
			{ title: 'Settings',id : 'settings',show: false, component: 'Settings', iconName:'settings', iosIcon:'ios-settings', androidIcon:'md-settings' },
			{ title: 'Sync',id : 'sync',show: true, component: 'SyncModal', iconName:'sync', iosIcon:'ios-sync', androidIcon:'md-sync' },
			{ title: 'Change Password',id : 'changepassword',show: true, component: 'ChangePassword', iconName:'key', iosIcon:'ios-key', androidIcon:'md-key' },
			{ title: 'Sign Off',id : 'signoff',show: true, component: 'Login', iconName:'power', iosIcon:'ios-power', androidIcon:'md-power' }
		]);
		// let temp = sharedService.getPages();
        // this.pages = this.utilService.filterObject(temp,'show',true);
		this.pages = sharedService.getPages();
	}

	initializeApp() {
		this.platform.ready().then(() => {
			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.
			this.statusBar.styleDefault();
			this.splashScreen.hide();
			if(this.sharedService.getIsApp()){
				this.databaseService.openDB().then((obj) => {
					this.databaseService.createTableQuery('empdetails',
					'pernr int, nachn text,vorna text,role int,password text, roledesc text,reportto text,emailid text,designation text, status text,imei text,simno text,cleardata text,grp text,server text')
					.then((obj) => {
						console.log('table created empdetails');
						this.rootPage = 'Login';//Login;
					}, (err) => {
						console.log(JSON.stringify(err));
					});
					this.createTables.createAllTables();
				}, (err) => {
					console.log(JSON.stringify(err));
				});
			}
			else{
				this.rootPage = 'Login';
			}

		});
	}
	openPage(page) {
		// Reset the content nav to have just this page//
		// we wouldn't want the back button to show in this scenario
		//this.nav.setRoot(page.component);
		if(page.title == "Sync"){
			let modal = this.modalCtrl.create(page.component);
			modal.present();
		}
		else if(page.title == "Sign Off"){
			this.nav.setRoot(page.component);
		}
		else{
			this.nav.push(page.component);
		}
	}

}
