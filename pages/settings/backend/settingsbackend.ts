import { Component } from '@angular/core';
@Component({
	selector: 'settings-backend',
	templateUrl: 'settingsbackend.html'
})
export class SettingsBackend {
	selectedSettings : any = {};
	constructor() {
		this.selectedSettings = {
			servername: 'SAP DEV',
			applserver: '192.168.2.3',
			instance: '140',
			systemid: '10',
			router: ''
		};
	}
}
