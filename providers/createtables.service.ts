import { Injectable } from '@angular/core';
import {DatabaseService} from './database.service';
@Injectable()
export class CreateAllTablesService {
	private batchArr: Array<string>;
	constructor(public databaseService: DatabaseService) {
		this.batchArr = [
			this.createDashboardVideoTable(),
			this.createCustTabMstTable(),
			this.createArticleTabmstTable(),
			this.createServermstTable(),
			this.createDefaultsTable(),
			this.createParametersTable(),
			this.createMenuParametersTable(),
			this.createMaterialmstTable(),
			this.createArticlePricelistTable(),
			this.createArticleKeyaccplTable(),
			this.createArticleCustclassplTable(),
			this.createArticleCustchainplTable(),
			this.createArticlebrcustclassplTable(),
			this.createArticleCustomerplTable(),
			this.createA305Table(),
			this.createCustBranchmstTable(),
			this.createCustChainmstTable(),
			this.createCustClassmstTable(),
			this.createCustKeyacctsmstTable(),
			this.createPricelistpriomstTable(),
			this.createPromoFamilyTable(),
			this.createPromoMaterialTable(),
			this.createPromoConfigTable(),
			this.createPromoStructTable(),
			this.createPromoStructMaterialTable(),
			this.createCustomermstTable(),
			this.createVisitTransactionTable(),
			this.createCustomerCreditTable(),
			this.createCustomerCreditLimitTable(),
			this.createCustomerSODetailsTable(),
			this.createCustomerInvDetailsTable(),
			this.createCustomerContactTable(),
			this.createAssetTable(),
			this.createCustomerAssetTable(),
			this.createCustomerAssetStatusTable()
		]
    }
    createAllTables(){
		this.databaseService.executeBatchRequest(this.batchArr).then(() => {
			console.log('all tables created');
		}, (err) => {
			console.error('Unable to execute sql: ', err);
		});
	}
	_generateCreateTableQuery(tableName, columns){
		return 'CREATE TABLE IF NOT EXISTS '+tableName+' ('+columns+')'
	}
	createDashboardVideoTable(){
		return this._generateCreateTableQuery('dashboardvideomst','vid text, vidname text, vidlocalpath text, thumblocalpath text,pernr text');
	}
	createCustTabMstTable(){
		return this._generateCreateTableQuery('custtabmst',
		'pernr text, branch text,customergroup text,customerclass text,customerchain text,popclass text, industry text,'+
        'industrycode1 text,parentgroup text,territorysalesgrp text,customer text,status text');
	}
	createArticleTabmstTable(){
		return this._generateCreateTableQuery('articletabmst',
		'pernr text, businessunit text,producdivision text,category text,subcategory text,principal text, brand text, segment text');
	}
	createServermstTable(){
		return this._generateCreateTableQuery('servermst',
		'servername text, Applicationserver text,instance text,systemid text,router text');
	}
	createDefaultsTable(){
		return this._generateCreateTableQuery('defaults',
		'pernr text, id text,subtyp text');
	}
	createParametersTable(){
		return this._generateCreateTableQuery('parametermst',
		'parameter text, value text');
	}
	createMenuParametersTable(){
		return this._generateCreateTableQuery('usermenumst',
		'pernr text,menu text,submenu text,flag text');
	}
	createMaterialmstTable(){
		return this._generateCreateTableQuery('materialmst',
		'pernr text,matnr text, maktx text,packing text, division text,listprice text,eancode text, businessunit text, '+
        'proddivision text, category text, subcategory text, principal text, brand text, segment text, uom text, status text, temp text');
	}
	createArticlePricelistTable(){
		return this._generateCreateTableQuery('A907',
		'pernr text, kappl text, kschl text, matnr text, datab text, datbi text, kbetr text, uom text');
	}
	createArticleKeyaccplTable(){
		return this._generateCreateTableQuery('A907keyaccountsmst',
		'pernr text, kappl text, kschl text, matnr text, datab text, datbi text, kbetr text, uom text, keyaccountid text, keyaccount text');
	}
	createArticleCustclassplTable(){
		return this._generateCreateTableQuery('A907custclassmst',
		'pernr text, kappl text, kschl text, matnr text, datab text, datbi text, kbetr text, uom text, custclassid text, custclass text');
	}
	createArticleCustchainplTable(){
		return this._generateCreateTableQuery('A907custchainmst',
		'pernr text, kappl text, kschl text, matnr text, datab text, datbi text, kbetr text, uom text, custchainid text, custchain text');
	}
	createArticlebrcustclassplTable(){
		return this._generateCreateTableQuery('A907branchclassmst',
		'pernr text, kappl text, kschl text, matnr text, datab text, datbi text, kbetr text, uom text, branchid text, branch text, custclassid text, custclass text');
	}
	createArticleCustomerplTable(){
		return this._generateCreateTableQuery('A907customermst',
		'pernr text, kappl text, kschl text, matnr text, datab text, datbi text, kbetr text, uom text, kunnr text');
	}
	createA305Table(){
		return this._generateCreateTableQuery('A305',
		'pernr text, kappl text, kschl text, matnr text, datab text, datbi text, kbetr text, uom text, kunnr text');
	}
	createCustBranchmstTable(){
		return this._generateCreateTableQuery('custbranchmst',
		'pernr text, branchid text, vkbur text');
	}
	createCustChainmstTable(){
		return this._generateCreateTableQuery('custchainmst',
		'pernr text, custchainid text, kvgr2 text');
	}
	createCustClassmstTable(){
        return this._generateCreateTableQuery('custclassmst',
		'pernr text, classid text, kvgr1 text');
	}
	createCustKeyacctsmstTable(){
        return this._generateCreateTableQuery('custkeyacctsmst',
		'pernr text, keyaccountid text, kvgr4 text');
	}
    createPricelistpriomstTable(){
        return this._generateCreateTableQuery('pricelistpriomst',
		'pernr text, tablename text, priority text');
    }
    createPromoFamilyTable(){
        return this._generateCreateTableQuery('promofamilymst',
		'typeid text, pernr text, description text,startdate text,enddate text,orderedtype text, promotype text,ouom text,puom text,'
    	+'oparameter text,promoparameter text,flag text');
    }
    createPromoMaterialTable(){
        return this._generateCreateTableQuery('promomaterialmst',
		'typeid text,promoid text,matnr text,type text,pernr text, qnty text,uom text,discount text, price text');
    }
    createPromoConfigTable(){
        return this._generateCreateTableQuery('promoconfigmst',
		'typeid text,value text,promovalue text,promotype text,pernr text');
    }
    createPromoStructTable(){
        return this._generateCreateTableQuery('promostructmst',
		'typeid text, pernr text, description text,startdate text,enddate text,forcedflag text, discount text,ouom text,flag text');
    }
    createPromoStructMaterialTable(){
        return this._generateCreateTableQuery('promomaterialstructmst',
		'typeid text,promoid text,matnr text,type text,pernr text,discount text');
    }
    createCustomermstTable(){
        return this._generateCreateTableQuery('customermst',
		'typeid number, kunnr text, land1 text,name1 text,name2 text,custclass text,popclass text,abcclass text,chain text, '+
        'pernr text,address text,branch text,custgrp text,custstatus text, custtype text,latitude text,longitude text,city text, '+
        'channeltype1 text,channeltype2 text,territory text,parentgroup text,outletname text,website text,zterm text,emailid text, '+
        'cflag text,type text,area text,areacode text,billto text');
    }
    createVisitTransactionTable(){
        return this._generateCreateTableQuery('visittran',
		'visitid text, createdUserId text, visitDate text,visitStartTime text,visitEndTime text,customerId text,customerType Text,'+
        'customerName text,contactPerson text,contactNumber text,creationDate text,creationTime text, discription text,visitTypeId text,'+
        'reasonId text,priorityId text,assigneeName text,assigneeUserId text,category text,status text,articleid text,objective1 text,'+
        'subobjective1 text,objective2 text,subobjective2 text,objective3 text,subobjective3 text,objective4 text,subobjective4 text,'+
        'objective5 text,subobjective5 text,objective1moduleresponse text,objective2moduleresponse text,objective3moduleresponse text,'+
        'objective4moduleresponse text,objective5moduleresponse text,otherobjective text,objective1customerresponse text, objective1futureaction text,'+
        'objective2customerresponse text, objective2futureaction text,otherobjectivecustomerresponse text, otherobjectivefutureaction text,'+
        'checkintime text,checkindate text, checkouttime text, checkoutdate text,sendflag text,captureObjectiveJSON text,note text,latforuser text,'+
        'longforuser text,sendtoserverflag text,ooflag text,objective text,servervisitflag text,ordervalue text,collectionvalue text,comments text,'+
        'fadate text,faStartTime text, faEndTime text');
    }
    createCustomerCreditTable(){
        return this._generateCreateTableQuery('custcreditmst',
		'kunnr text, invno text,invdate text,invamount text,amountrec text,date text,balance text,duedate text,instrumentno text,'+
        'invdatetime int,pernr text');
    }
    createCustomerCreditLimitTable(){
        return this._generateCreateTableQuery('custcreditlimitmst',
		'kunnr text,pernr text, creditlimit text,used text,receivable text');
    }
    createCustomerSODetailsTable(){
        return this._generateCreateTableQuery('sodetailsmst',
		'pernr text,kunnr text,vbeln text,sodate text,vbelni text, invdate text, ponumber text,orderqty text,delqty text');
    }
    createCustomerInvDetailsTable(){
        return this._generateCreateTableQuery('invdetailsmst',
		'pernr text,vbelnf text,vbelni text,matnr text,qtyuom text, invdate text,qty text,maktx text,recqty text,podstatus text,netwr text');
    }
    createCustomerContactTable(){
        return this._generateCreateTableQuery('customercontactmst',
		'typeid int, kunnr text,name text,designation text,mobileno text,tel text,fax text, emailid text,photo text,pernr text,sendflag text,datetime text,dflag text');
    }
    createAssetTable(){
        return this._generateCreateTableQuery('assetmst',
		'typeid text PRIMARY KEY, value text,pernr text');
    }
    createCustomerAssetTable(){
        return this._generateCreateTableQuery('custassetsmst',
		'typeid text ,kunnr text, asset int,serialno text,instdate text,location text,imgurl text,imgpath text,statusid text,pernr text');
    }
    createCustomerAssetStatusTable(){
        return this._generateCreateTableQuery('custassetstatusmst',
		'typeid text PRIMARY KEY, status text,pernr text');
    }
}
