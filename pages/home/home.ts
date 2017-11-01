import { Component, NgZone } from '@angular/core';

import { MenuController, NavController, ModalController } from 'ionic-angular';
import { SharedService} from '../../providers/sharedservice';
import { UtilService} from '../../providers/util.service';

@IonicPage({name: 'Home'})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage{
	pages: Array<{}>;
	submitted = false;
	constructor(private _ngZone: NgZone, public nav: NavController,
        public menu: MenuController,
        private sharedService: SharedService,
        private utilService: UtilService,
        public modalCtrl: ModalController
    ) {
		let temp = sharedService.getPages();
		this._ngZone.run(() => {
			this.pages = temp;// this.utilService.filterObject(temp,'show',true);
		});
	}

	/*getTriples() {
		let triples = [];
		let length = this.pages.length;
		for (let i = 0; i < length; i += 3) {
			let trio = [];
			trio.push(this.pages[i]);
			if (i + 1 < length) {
				trio.push(this.pages[i + 1]);
			}
			if (i + 2 < length) {
				trio.push(this.pages[i + 2]);
			}

			triples.push(trio);
		}
		return triples;
	}*/

	getDoubles() {
		let doubles = [];
		let length = this.pages.length;
		for (let i = 0; i < length; i += 2) {
			let trio = [];
			trio.push(this.pages[i]);
			if (i + 1 < length) {
				trio.push(this.pages[i + 1]);
			}
			doubles.push(trio);
		}
		return doubles;
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

	ionViewDidLoad() {
		// the left menu should be disabled on the login page
		this.menu.close();
		this.menu.enable(false);
	}

	ionViewWillLeave() {
		// enable the left menu when leaving the login page
		//this.nav.pop();
		this.menu.enable(true);
	}
}
