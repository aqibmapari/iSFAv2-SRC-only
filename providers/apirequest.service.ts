import { Injectable } from '@angular/core';
import { LoadingController,ToastController  } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class APIRequestService {
    loader: any;
    constructor(private http: Http,
        private loadingController: LoadingController,
        private toastCtrl: ToastController) {}
  	getAPI(link){
        return new Promise((resolve, reject) => {
            console.log(link);
            this.http.get(link)
            .map(res => res.json())
            .subscribe(data => {
                // we've got back the raw data, now generate the core schedule data
                // and save the data for later reference
                resolve(data);
            },
            err => {
                reject(err);
            });
    		});
  	}
    presentLoader(text){
        this.loader = this.loadingController.create({
            content: text
        });
        this.loader.present();
    }
    presentToast(text) {
        let toast = this.toastCtrl.create({
            message: text,
            duration: 2000
        });
        toast.present();
    }
    dismissLoader(){
        this.loader.dismiss();
    }
}
