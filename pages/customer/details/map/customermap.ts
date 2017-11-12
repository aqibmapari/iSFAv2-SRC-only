import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';

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

import {UtilService} from '../../../../providers/util.service';
// import {DatabaseService} from '../../../../providers/database.service';
// import {SharedService} from '../../../../providers/sharedservice';

@Component({
	selector: 'customer-map',
	templateUrl: 'customermap.html'
})
export class CustomerMap implements AfterViewInit{
	@ViewChild('custdetailsmap') mapElement: ElementRef;
	private map : GoogleMap;
	private selectedCustomer : any;
	constructor(private utilService: UtilService,
		private navParams: NavParams,
		private googleMaps: GoogleMaps,
		private geolocation: Geolocation) {
		this.selectedCustomer = navParams.get('selectedCustomer');
	}
	ngAfterViewInit() {
		this.loadMap();
		this.getCurrentLocation();
		this.getCustomerLocation();
	}
	getCurrentLocation(){
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
		if(this.selectedCustomer.latitude !== 'null'){
			this.map.one(GoogleMapsEvent.MAP_READY)
			.then(() => {
					// var obj = {};
					// obj['pernr'] = pernr;
					// obj['kunnr'] = this.utilService.decode64(row.kunnr);
					// obj['name1'] = this.utilService.decode64(row.name1);
					// obj['latitude'] = this.utilService.decode64(row.latitude);
					// obj['longitude'] = this.utilService.decode64(row.longitude);
					// this.items.push(obj);
					let markerObj = {
						title: (this.selectedCustomer.kunnr),
						icon: 'orange',
						lat: parseFloat((this.selectedCustomer.latitude)),
						long: parseFloat((this.selectedCustomer.longitude)),
						animation: 'DROP'
					}
					this.addMarker(markerObj)
			});
		}
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
