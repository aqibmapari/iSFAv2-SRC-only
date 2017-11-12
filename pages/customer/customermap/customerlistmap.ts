import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import {
	GoogleMaps,
	GoogleMap,
	GoogleMapsEvent,
	GoogleMapOptions,
	CameraPosition,
	MarkerOptions,
	Marker
 } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { LocationAccuracy } from '@ionic-native/location-accuracy';

import { NavController } from 'ionic-angular';
import {UtilService} from '../../../providers/util.service';
import {DatabaseService} from '../../../providers/database.service';
import {SharedService} from '../../../providers/sharedservice';

@Component({
	selector: 'customer-listmap',
	templateUrl: 'customerlistmap.html'
})
export class CustomerListMapPage implements AfterViewInit{
	@ViewChild('custlistmap') mapElement: ElementRef;
	private map : GoogleMap;
	private items: Array<any>;
	// private isMapReady: boolean = false;
	constructor(public navCtrl: NavController,
		private utilService: UtilService,
		public databaseService: DatabaseService,
		public sharedService: SharedService,
		private googleMaps: GoogleMaps,
		private geolocation: Geolocation,
		private locationAccuracy: LocationAccuracy) {

	}
	ngOnInit() {
		// this.items = [];

		}
		ngAfterViewInit() {
			this.loadMap();
			this.getCurrentLocation();
			this.requestLocationServices().then((param: boolean) => {
				if(param){
					this.getCustomerLocation();
				}
			});
		}
		requestLocationServices(){
			return new Promise((resolve,reject) => {
				this.locationAccuracy.canRequest().then((canRequest: boolean) => {

						if(canRequest) {
							// the accuracy option will be ignored by iOS
							this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY)
							.then(() => {
									console.log('Request successful');
									resolve(true);
									// this.getCustomerLocation();
								},
								error => {
									console.log('Error requesting location permissions', error);
									reject(error);
							});
						}

					});
			});
		}
		getCurrentLocation(){
			console.log('requesting location')
			this.geolocation.getCurrentPosition().then((resp) => {
				// resp.coords.latitude
				// resp.coords.longitude
				console.log(resp.coords)
				this.map.one(GoogleMapsEvent.MAP_READY)
				.then(() => {
					let obj = {
						title:'You are Here',
						icon: 'green',
						lat:resp.coords.latitude,
						long:resp.coords.longitude,
						animation: 'DROP'
					}
					this.addMarker(obj);
					// this.map.setCameraTarget(new LatLng(resp.coords.latitude, resp.coords.longitude));
					let mapOptions: GoogleMapOptions = {
						camera: {
							target: {
								lat: resp.coords.latitude,
								lng: resp.coords.longitude
							},
							zoom: 18,
							tilt: 30
						}
					};
					this.map.setOptions(mapOptions);
				});
			 }).catch((error) => {
				 console.log('Error getting location', error);
			 });
		}
		loadMap() {
			console.log('map loading started')

			console.log('options set')
			this.map = this.googleMaps.create(this.mapElement.nativeElement);
			console.log('map created')
			// Wait the MAP_READY before using any methods.
			this.map.one(GoogleMapsEvent.MAP_READY)
				.then(() => {
					console.log('Map is ready!');

					// Now you can use all methods safely.
					// let obj = {
					// 	title:'You are Here',
					// 	icon: 'green',
					// 	lat:resp.coords.latitude,
					// 	long:resp.coords.longitude,
					// 	animation: 'DROP'
					// }
					// this.addMarker(obj)
				});
		}
		getCustomerLocation(){
			this.items = [];
			var pernr = this.sharedService.getPernr();
			this.databaseService.selectTableQuery('customermst',
			'*',
			'WHERE pernr=? and latitude<>?',[this.utilService.encode64(pernr),this.utilService.encode64('null')],0)
			.then((results) => {
				// console.log(JSON.stringify(results));
				if(results['rows'].length !== 0){
					this.map.one(GoogleMapsEvent.MAP_READY)
					.then(() => {
						for(var i=0; i<results['rows'].length; i++){
							var row = results['rows']['item'](i);
							var obj = {};
							// obj['pernr'] = pernr;
							// obj['kunnr'] = this.utilService.decode64(row.kunnr);
							// obj['name1'] = this.utilService.decode64(row.name1);
							// obj['latitude'] = this.utilService.decode64(row.latitude);
							// obj['longitude'] = this.utilService.decode64(row.longitude);
							// this.items.push(obj);
							let markerObj = {
								title: this.utilService.decode64(row.kunnr),
								icon: 'orange',
								lat: parseFloat(this.utilService.decode64(row.latitude)),
								long: parseFloat(this.utilService.decode64(row.longitude)),
								animation: 'DROP'
							}
							this.addMarker(markerObj)
						}
					});
				}
			}, (err) => {
				console.log(JSON.stringify(err));
			});
		}
		addMarker(obj){
			this.map.addMarker({
					title: obj.title,
					icon: obj.icon,
					animation: obj.animation,
					position: {
						lat: obj.lat,
						lng: obj.long
					}
				})
				.then(marker => {
					marker.on(GoogleMapsEvent.MARKER_CLICK)
						.subscribe(() => {
							// alert('clicked');
						});
				});
		}
}
