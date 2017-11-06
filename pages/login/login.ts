import { Component,OnInit } from '@angular/core';
import 'rxjs/add/operator/map';

import { IonicPage,NavController,MenuController} from 'ionic-angular';
import {UtilService} from '../../providers/util.service';
import {DatabaseService} from '../../providers/database.service';
import {SharedService} from '../../providers/sharedservice';
import {APIRequestService} from '../../providers/apirequest.service';
import {AfterLoginAPIService} from '../../providers/afterloginapi.service';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({name: 'Login'})

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage implements OnInit{
  login: {username?: string, password?: string} = {};
  submitted = false;
constructor(public nav: NavController,
      public menu: MenuController,
      public utilService: UtilService,
      public databaseService: DatabaseService,
      public sharedService: SharedService,
      public apiRequestService: APIRequestService,
      public afterLoginAPIService: AfterLoginAPIService) {
          this.login.username = '40143';
          this.login.password = '40143';
}
ngOnInit() {
      this.apiRequestService.presentLoader('Please Wait...');
      let ip = this.sharedService.getIP();
      let className = this.sharedService.getAPIObj('user');
      this.apiRequestService.getAPI(ip+className).then((data) => {
          console.log((data));
          this.databaseService.deleteTableQuery('empdetails','',[]).then((obj) => {},(err) => {});
          for (var i = 0; i < data['empdetails'].length; i++)
          {
              var row = data['empdetails'][i];
              var pernr = this.utilService.encode64(row.pernr);
              var nachn = this.utilService.encode64(row.nachn);
              var vorna = this.utilService.encode64(row.vorna);
              var role = this.utilService.encode64(row.role);
              var password = this.utilService.encode64(row.password);
              var roledesc = this.utilService.encode64(row.roledesc);
              var reportto = this.utilService.encode64((row.reportto).trim());
              var emailid = this.utilService.encode64(row.emailid);
              var designation = this.utilService.encode64(row.designation);
              var status = this.utilService.encode64(row.status);
              var imei = this.utilService.encode64(row.imei);
              var simno = this.utilService.encode64(row.simno);
              var cleardata = this.utilService.encode64(row.wipeflag);
            //   var grp = this.utilService.encode64(row.group.trim());
            var grp = this.utilService.encode64(row.group);
            var server = this.utilService.encode64(row.server);

              this.databaseService.insertIntoTableQuery('empdetails',
              'pernr,nachn,vorna,role,password, roledesc,reportto,emailid,designation,status,imei,simno,cleardata,grp,server',
              [pernr,nachn,vorna,role,password, roledesc,reportto,emailid,designation,status,imei,simno,cleardata,grp,server],i)
              .then((obj) => {
                  console.log(JSON.stringify(obj));
              }, (err) => {
                  console.log(JSON.stringify(err));
              });
          }
          this.apiRequestService.dismissLoader();
      }, (err) => {
          console.log((err));
          this.apiRequestService.dismissLoader();
      });
}

onLogin(form) {
      this.submitted = true;
      console.log((form));
      if (form.valid) {
          let username = this.login.username;
          let password = this.login.password;
          this.databaseService.selectTableQuery('empdetails',
          '*',
          'WHERE pernr=? and password=?',[this.utilService.encode64(username),this.utilService.encode64(password)],0)
          .then((results) => {
              console.log(JSON.stringify(results));
              this.sharedService.setPernr(username);
              this.sharedService.setPwd(password);
              this.sharedService.setUserName('Izhar Ahmed');
              this.nav.setRoot('Home');
              // if(results['rows'].length !== 0){
              //     var row = results['rows']['item'](0);
              //     // var dpernr = this.utilService.decode64(row.pernr);
              //     // var dpassword = this.utilService.decode64(row.password);
              //     var dnachn = this.utilService.decode64(row.nachn);
              //     var dvorna = this.utilService.decode64(row.vorna);
              //     var drole = this.utilService.decode64(row.role);
              //     var dgrp = (this.utilService.decode64(row.grp));
              //     var demailid = this.utilService.decode64(row.emailid);
              //     // var dserver = this.utilService.decode64(row.server);
              //     // var eserver = row.server;
              //     // alert(username);
              //     this.sharedService.setPernr(username);
              //     window.sessionStorage.setItem("userfname",dnachn);
              //     window.sessionStorage.setItem("userlname",dvorna);
              //     window.sessionStorage.setItem("curentuseridforcalender",username);
              //     window.sessionStorage.setItem("empname",dnachn+" "+dvorna);
              //     window.sessionStorage.setItem("dept",dgrp);
              //     window.sessionStorage.setItem("drole",drole);
              //     //window.sessionStorage.setItem("dept","Pre-Sales");
              //     window.sessionStorage.setItem("pwd",password);
              //     if(this.utilService.checkEncodedBlank(demailid) != 'null'){
              //         window.sessionStorage.setItem("useremailid",demailid);
              //     }
              //     else{
              //         window.sessionStorage.setItem("useremailid",'');
              //     }
              //
              //     // this.nav.setRoot(Home);
              //     // this.authenticate();
              //     this.apiRequestService.presentLoader('Please Wait...');
              //     this.insertSettingsData();
              // }
          }, (err) => {
              console.log(JSON.stringify(err));
          });
      }
}
  authenticate(){
      // this.apiRequestService.presentLoader('Please Wait...');
      let ip = this.sharedService.getIP();
      let className = this.sharedService.getAPIObj('authenticate');
      this.apiRequestService.getAPI(ip+className).then((data) => {
          console.log((data));
          if(data['response'][0]['status'] == 'success'){
              //this.insertSettingsData();
              this.nav.setRoot('Home');
          }
          else{
              this.apiRequestService.presentToast('Invalid User!!!');
              this.apiRequestService.dismissLoader();
              // this.nav.setRoot(Home);
          }
      }, (err) => {
          console.log((err));
          this.apiRequestService.dismissLoader();
      });
  }
  insertSettingsData(){
      this.afterLoginAPIService.callDashboardVideo().then((obj) => {
          this.afterLoginAPIService.callSettings().then((obj) => {
              this.afterLoginAPIService.callParameters().then((obj) => {
                  this.afterLoginAPIService.callMenuParameters().then((obj) => {
                      this.goToHomePage();
                  }, (err) => {this.onAPIError();});
              }, (err) => {this.onAPIError();});
          }, (err) => {this.onAPIError();});
      }, (err) => {this.onAPIError();});
  }
  goToHomePage(){
      this.databaseService.selectTableQuery('usermenumst',
      '*',
      'WHERE pernr=?',[this.utilService.encode64(this.login.username)],0)
      .then((results) => {
          console.log(JSON.stringify(results));
          // var menuArray = [];
          var subMenuArray = [];
          var pages = this.sharedService.getPages();
          if(results['rows'].length !== 0){
              for(var i=0;i<results['rows'].length;i++){
                  var row = results['rows']['item'](i);
                  var menu = this.utilService.decode64(row.menu);
                  var submenu = this.utilService.decode64(row.submenu);
                  var flag = this.utilService.decode64(row.flag);
                  if(flag=='on'){
                      // menuArray.push(menu);
                      var obj = {};
                      obj['menu'] = menu;
                      obj['submenu'] = submenu;
                      subMenuArray.push(obj);
                      let index = pages.map(function(x) {return (x['id'] == menu)}).indexOf(true);
                      if(index !== -1) pages[index]['show'] = true;
              }
              }
              // var unique=menuArray.filter(function(itm,i,menuArray){
              //     return i==menuArray.indexOf(itm);
              // });
          }
          // console.log(unique);
          console.log(subMenuArray);
          // this.sharedService.setMenuArr(unique);
          this.sharedService.setPages(pages);
          this.sharedService.setSubMenuArr(subMenuArray);
          this.apiRequestService.dismissLoader();
          this.nav.setRoot('Home');
      }, (err) => {
          console.log(JSON.stringify(err));
      });
  }
  onAPIError(){
      // this.apiRequestService.dismissLoader();
      this.apiRequestService.presentToast('Could Not Connect to server. Please check internet connection and retry');
      this.goToHomePage();
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
