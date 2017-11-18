import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
//import { SqlStorage, Storage} from 'ionic-angular';
import { SharedService } from "./sharedservice";
@Injectable()
export class DatabaseService {
	public db : SQLiteObject;
	//db : Storage;
    constructor(private sqlite: SQLite, private sharedService: SharedService) {

    }
	openDB(){
		return new Promise((resolve, reject) => {
			if(!this.sharedService.getIsApp()){
				resolve('success'); // test ionic serve
			}
			else{
				this.sqlite.create({
					name: 'iSFA.db',
					location: 'default'
				})
				.then((db: SQLiteObject) => {
					this.db = db;
					console.log('Success: iSFA opened');
					resolve('success');
				})
				.catch(err => {
					console.error('Unable to open database: ', err);
					reject(err);
				});
			}
		});
	}
	createTableQuery(tableName,columns){
		console.log(this.db);
		return new Promise((resolve, reject) => {
			if(!this.sharedService.getIsApp()){
				resolve('success'); // test ionic serve
			}
			else{
				console.log(this.db);
				this.db.executeSql('CREATE TABLE IF NOT EXISTS '+tableName+' ('+columns+')', {}).then(() => {
					resolve("success");
				}, (err) => {
					console.error('Unable to execute sql: ', err);
					reject(err);
				});
			}
		});

	}
	executeBatchRequest(batchArray){
		if(!this.sharedService.getIsApp()){
			return new Promise((resolve, reject) => {resolve('success')}); // test ionic serve
		}
		else
		{
			return this.db.sqlBatch(batchArray)
		}
	}
	insertIntoTableQuery(tableName,columns,params,index){
		console.log((new Date().getTime()+" insertIntoTableQuery1"));
		return new Promise((resolve, reject) => {
			console.log((new Date().getTime()+" insertIntoTableQuery2"));
			if(!this.sharedService.getIsApp()){
				resolve('success'); // test ionic serve
			}
			else{
				let placeholders =this._createPlaceHolder(columns);
				console.log((new Date().getTime()+" insertIntoTableQuery3"));
				this.db.executeSql('INSERT OR REPLACE INTO '+tableName+' ('+columns+') VALUES( '+placeholders+')', params).then((data) => {
					data['index'] = index;
					console.log((new Date().getTime()+" insertIntoTableQuery4"));
					resolve(data);
				}, (err) => {
					console.error('Unable to execute sql: ', err);
					reject(err);
				});
			}

		});

	}
	_createPlaceHolder(columns){
		let placeholders = '?';
		let _length = columns.split(',').length;
		for(var i=0; i<_length-1; i++){
			placeholders += ',?';
		}
		return placeholders;
	}
	selectTableQuery(tableName,columns,whereClause,params,index){
		return new Promise((resolve, reject) => {
			if(!this.sharedService.getIsApp()){
				resolve('success'); // test ionic serve
			}
			else{
				this.db.executeSql('SELECT '+columns+' FROM '+tableName+' '+whereClause, params).then((data) => {
					data['index'] = index;
					resolve(data);
				}, (err) => {
					console.error('Unable to execute sql: ', err);
					reject(err);
				});
			}

		});

	}
	selectComplexQuery(query,params,index){
		return new Promise((resolve, reject) => {
			if(!this.sharedService.getIsApp()){
				resolve('success'); // test ionic serve
			}
			else{
				this.db.executeSql(query, params).then((data) => {
					data['index'] = index;
					resolve(data);
				}, (err) => {
					console.error('Unable to execute sql: ', err);
					reject(err);
				});
			}

		});

	}
	updateTableQuery(tableName,columns,whereClause,params,index){
		return new Promise((resolve, reject) => {
			if(!this.sharedService.getIsApp()){
				resolve('success'); // test ionic serve
			}
			else{
				this.db.executeSql('update '+tableName+' SET '+columns+' '+whereClause, params).then((data) => {
					data['index'] = index;
					resolve(data);
				}, (err) => {
					console.error('Unable to execute sql: ', err);
					reject(err);
				});
			}

		});

	}
	deleteTableQuery(tableName,whereClause,params){
		return new Promise((resolve, reject) => {
			if(!this.sharedService.getIsApp()){
				resolve('success'); // test ionic serve
			}
			else{
				this.db.executeSql('DELETE FROM '+tableName+' '+whereClause, params).then((data) => {
					resolve(data);
				}, (err) => {
					console.error('Unable to execute sql: ', err);
					reject(err);
				});
			}

		});

	}
}
