import { Injectable } from '@angular/core';
import {DatabaseService} from './database.service';
@Injectable()
export class CreateAllTablesService {
    constructor(public databaseService: DatabaseService) {

    }
    createAllTables(){
		this.createDashboardVideoTable();
        this.createCustTabMstTable();
        this.createArticleTabmstTable();
        this.createServermstTable();
        this.createDefaultsTable();
        this.createParametersTable();
        this.createMenuParametersTable();
        this.createMaterialmstTable();
        this.createArticlePricelistTable();
    	this.createArticleKeyaccplTable();
    	this.createArticleCustclassplTable();
    	this.createArticleCustchainplTable();
    	this.createArticlebrcustclassplTable();
    	this.createArticleCustomerplTable();
    	this.createA305Table();
    	this.createCustBranchmstTable();
    	this.createCustChainmstTable();
    	this.createCustClassmstTable();
    	this.createCustKeyacctsmstTable();
        this.createPricelistpriomstTable();
        this.createPromoFamilyTable();
        this.createPromoMaterialTable();
        this.createPromoConfigTable();
        this.createPromoStructTable();
        this.createPromoStructMaterialTable();
        this.createCustomermstTable();
        this.createVisitTransactionTable();
        this.createCustomerCreditTable();
        this.createCustomerCreditLimitTable();
        this.createCustomerSODetailsTable();
        this.createCustomerInvDetailsTable();
        this.createCustomerContactTable();
        this.createAssetTable();
        this.createCustomerAssetTable();
        this.createCustomerAssetStatusTable();
	}
	createDashboardVideoTable(){
		this.databaseService.createTableQuery('dashboardvideomst',
		'vid text, vidname text, vidlocalpath text, thumblocalpath text,pernr text')
		.then((obj) => {
			console.log('table created dashboardvideomst');
		}, (err) => {
			console.log(JSON.stringify(err));
		});
	}
	createCustTabMstTable(){
		this.databaseService.createTableQuery('custtabmst',
		'pernr text, branch text,customergroup text,customerclass text,customerchain text,popclass text, industry text,'+
        'industrycode1 text,parentgroup text,territorysalesgrp text,customer text,status text')
		.then((obj) => {
			console.log('table created custtabmst');
		}, (err) => {
			console.log(JSON.stringify(err));
		});
	}
	createArticleTabmstTable(){
		this.databaseService.createTableQuery('articletabmst',
		'pernr text, businessunit text,producdivision text,category text,subcategory text,principal text, brand text, segment text')
		.then((obj) => {
			console.log('table created articletabmst');
		}, (err) => {
			console.log(JSON.stringify(err));
		});
	}
	createServermstTable(){
		this.databaseService.createTableQuery('servermst',
		'servername text, Applicationserver text,instance text,systemid text,router text')
		.then((obj) => {
			console.log('table created servermst');
		}, (err) => {
			console.log(JSON.stringify(err));
		});
	}
	createDefaultsTable(){
		this.databaseService.createTableQuery('defaults',
		'pernr text, id text,subtyp text')
		.then((obj) => {
			console.log('table created defaults');
		}, (err) => {
			console.log(JSON.stringify(err));
		});
	}
	createParametersTable(){
		this.databaseService.createTableQuery('parametermst',
		'parameter text, value text')
		.then((obj) => {
			console.log('table created parametermst');
		}, (err) => {
			console.log(JSON.stringify(err));
		});
	}
	createMenuParametersTable(){
		this.databaseService.createTableQuery('usermenumst',
		'pernr text,menu text,submenu text,flag text')
		.then((obj) => {
			console.log('table created usermenumst');
		}, (err) => {
			console.log(JSON.stringify(err));
		});
	}
	createMaterialmstTable(){
		this.databaseService.createTableQuery('materialmst',
		'pernr text,matnr text, maktx text,packing text, division text,listprice text,eancode text, businessunit text, '+
        'proddivision text, category text, subcategory text, principal text, brand text, segment text, uom text, status text, temp text')
		.then((obj) => {
			console.log('table created materialmst');
		}, (err) => {
			console.log(JSON.stringify(err));
		});
	}
	createArticlePricelistTable(){
		this.databaseService.createTableQuery('A907',
		'pernr text, kappl text, kschl text, matnr text, datab text, datbi text, kbetr text, uom text')
		.then((obj) => {
			console.log('table created A907');
		}, (err) => {
			console.log(JSON.stringify(err));
		});
	}
	createArticleKeyaccplTable(){
		this.databaseService.createTableQuery('A907keyaccountsmst',
		'pernr text, kappl text, kschl text, matnr text, datab text, datbi text, kbetr text, uom text, keyaccountid text, keyaccount text')
		.then((obj) => {
			console.log('table created A907keyaccountsmst');
		}, (err) => {
			console.log(JSON.stringify(err));
		});
	}
	createArticleCustclassplTable(){
		this.databaseService.createTableQuery('A907custclassmst',
		'pernr text, kappl text, kschl text, matnr text, datab text, datbi text, kbetr text, uom text, custclassid text, custclass text')
		.then((obj) => {
			console.log('table created A907custclassmst');
		}, (err) => {
			console.log(JSON.stringify(err));
		});
	}
	createArticleCustchainplTable(){
		this.databaseService.createTableQuery('A907custchainmst',
		'pernr text, kappl text, kschl text, matnr text, datab text, datbi text, kbetr text, uom text, custchainid text, custchain text')
		.then((obj) => {
			console.log('table created A907custchainmst');
		}, (err) => {
			console.log(JSON.stringify(err));
		});
	}
	createArticlebrcustclassplTable(){
		this.databaseService.createTableQuery('A907branchclassmst',
		'pernr text, kappl text, kschl text, matnr text, datab text, datbi text, kbetr text, uom text, branchid text, branch text, custclassid text, custclass text')
		.then((obj) => {
			console.log('table created A907branchclassmst');
		}, (err) => {
			console.log(JSON.stringify(err));
		});
	}
	createArticleCustomerplTable(){
		this.databaseService.createTableQuery('A907customermst',
		'pernr text, kappl text, kschl text, matnr text, datab text, datbi text, kbetr text, uom text, kunnr text')
		.then((obj) => {
			console.log('table created A907customermst');
		}, (err) => {
			console.log(JSON.stringify(err));
		});
	}
	createA305Table(){
		this.databaseService.createTableQuery('A305',
		'pernr text, kappl text, kschl text, matnr text, datab text, datbi text, kbetr text, uom text, kunnr text')
		.then((obj) => {
			console.log('table created A305');
		}, (err) => {
			console.log(JSON.stringify(err));
		});
	}
	createCustBranchmstTable(){
		this.databaseService.createTableQuery('custbranchmst',
		'pernr text, branchid text, vkbur text')
		.then((obj) => {
			console.log('table created custbranchmst');
		}, (err) => {
			console.log(JSON.stringify(err));
		});
	}
	createCustChainmstTable(){
		this.databaseService.createTableQuery('custchainmst',
		'pernr text, custchainid text, kvgr2 text')
		.then((obj) => {
			console.log('table created custchainmst');
		}, (err) => {
			console.log(JSON.stringify(err));
		});
	}
	createCustClassmstTable(){
        this.databaseService.createTableQuery('custclassmst',
		'pernr text, classid text, kvgr1 text')
		.then((obj) => {
			console.log('table created custclassmst');
		}, (err) => {
			console.log(JSON.stringify(err));
		});
	}
	createCustKeyacctsmstTable(){
        this.databaseService.createTableQuery('custkeyacctsmst',
		'pernr text, keyaccountid text, kvgr4 text')
		.then((obj) => {
			console.log('table created custkeyacctsmst');
		}, (err) => {
			console.log(JSON.stringify(err));
		});
	}
    createPricelistpriomstTable(){
        this.databaseService.createTableQuery('pricelistpriomst',
		'pernr text, tablename text, priority text')
		.then((obj) => {
			console.log('table created pricelistpriomst');
		}, (err) => {
			console.log(JSON.stringify(err));
		});
    }
    createPromoFamilyTable(){
        this.databaseService.createTableQuery('promofamilymst',
		'typeid text, pernr text, description text,startdate text,enddate text,orderedtype text, promotype text,ouom text,puom text,'
    	+'oparameter text,promoparameter text,flag text')
		.then((obj) => {
			console.log('table created promofamilymst');
		}, (err) => {
			console.log(JSON.stringify(err));
		});
    }
    createPromoMaterialTable(){
        this.databaseService.createTableQuery('promomaterialmst',
		'typeid text,promoid text,matnr text,type text,pernr text, qnty text,uom text,discount text, price text')
		.then((obj) => {
			console.log('table created promomaterialmst');
		}, (err) => {
			console.log(JSON.stringify(err));
		});
    }
    createPromoConfigTable(){
        this.databaseService.createTableQuery('promoconfigmst',
		'typeid text,value text,promovalue text,promotype text,pernr text')
		.then((obj) => {
			console.log('table created promoconfigmst');
		}, (err) => {
			console.log(JSON.stringify(err));
		});
    }
    createPromoStructTable(){
        this.databaseService.createTableQuery('promostructmst',
		'typeid text, pernr text, description text,startdate text,enddate text,forcedflag text, discount text,ouom text,flag text')
		.then((obj) => {
			console.log('table created promostructmst');
		}, (err) => {
			console.log(JSON.stringify(err));
		});
    }
    createPromoStructMaterialTable(){
        this.databaseService.createTableQuery('promomaterialstructmst',
		'typeid text,promoid text,matnr text,type text,pernr text,discount text')
		.then((obj) => {
			console.log('table created promomaterialstructmst');
		}, (err) => {
			console.log(JSON.stringify(err));
		});
    }
    createCustomermstTable(){
        this.databaseService.createTableQuery('customermst',
		'typeid number, kunnr text, land1 text,name1 text,name2 text,custclass text,popclass text,abcclass text,chain text, '+
        'pernr text,address text,branch text,custgrp text,custstatus text, custtype text,latitude text,longitude text,city text, '+
        'channeltype1 text,channeltype2 text,territory text,parentgroup text,outletname text,website text,zterm text,emailid text, '+
        'cflag text,type text,area text,areacode text,billto text')
		.then((obj) => {
			console.log('table created customermst');
		}, (err) => {
			console.log(JSON.stringify(err));
		});
    }
    createVisitTransactionTable(){
        this.databaseService.createTableQuery('visittran',
		'visitid text, createdUserId text, visitDate text,visitStartTime text,visitEndTime text,customerId text,customerType Text,'+
        'customerName text,contactPerson text,contactNumber text,creationDate text,creationTime text, discription text,visitTypeId text,'+
        'reasonId text,priorityId text,assigneeName text,assigneeUserId text,category text,status text,articleid text,objective1 text,'+
        'subobjective1 text,objective2 text,subobjective2 text,objective3 text,subobjective3 text,objective4 text,subobjective4 text,'+
        'objective5 text,subobjective5 text,objective1moduleresponse text,objective2moduleresponse text,objective3moduleresponse text,'+
        'objective4moduleresponse text,objective5moduleresponse text,otherobjective text,objective1customerresponse text, objective1futureaction text,'+
        'objective2customerresponse text, objective2futureaction text,otherobjectivecustomerresponse text, otherobjectivefutureaction text,'+
        'checkintime text,checkindate text, checkouttime text, checkoutdate text,sendflag text,captureObjectiveJSON text,note text,latforuser text,'+
        'longforuser text,sendtoserverflag text,ooflag text,objective text,servervisitflag text,ordervalue text,collectionvalue text,comments text,'+
        'fadate text,faStartTime text, faEndTime text')
		.then((obj) => {
			console.log('table created visittran');
		}, (err) => {
			console.log(JSON.stringify(err));
		});
    }
    createCustomerCreditTable(){
        this.databaseService.createTableQuery('custcreditmst',
		'kunnr text, invno text,invdate text,invamount text,amountrec text,date text,balance text,duedate text,instrumentno text,'+
        'invdatetime text,pernr text')
		.then((obj) => {
			console.log('table created custcreditmst');
		}, (err) => {
			console.log(JSON.stringify(err));
		});
    }
    createCustomerCreditLimitTable(){
        this.databaseService.createTableQuery('custcreditlimitmst',
		'kunnr text,pernr text, creditlimit text,used text,receivable text')
		.then((obj) => {
			console.log('table created custcreditlimitmst');
		}, (err) => {
			console.log(JSON.stringify(err));
		});
    }
    createCustomerSODetailsTable(){
        this.databaseService.createTableQuery('sodetailsmst',
		'pernr text,kunnr text,vbeln text,sodate text,vbelni text, invdate text, ponumber text,orderqty text,delqty text')
		.then((obj) => {
			console.log('table created sodetailsmst');
		}, (err) => {
			console.log(JSON.stringify(err));
		});
    }
    createCustomerInvDetailsTable(){
        this.databaseService.createTableQuery('invdetailsmst',
		'pernr text,vbelnf text,vbelni text,matnr text,qtyuom text, invdate text,qty text,maktx text,recqty text,podstatus text,netwr text')
		.then((obj) => {
			console.log('table created invdetailsmst');
		}, (err) => {
			console.log(JSON.stringify(err));
		});
    }
    createCustomerContactTable(){
        this.databaseService.createTableQuery('customercontactmst',
		'typeid int, kunnr text,name text,designation text,mobileno text,tel text,fax text, emailid text,photo text,pernr text,sendflag text,datetime text,dflag text')
		.then((obj) => {
			console.log('table created customercontactmst');
		}, (err) => {
			console.log(JSON.stringify(err));
		});
    }
    createAssetTable(){
        this.databaseService.createTableQuery('assetmst',
		'typeid text PRIMARY KEY, value text,pernr text')
		.then((obj) => {
			console.log('table created assetmst');
		}, (err) => {
			console.log(JSON.stringify(err));
		});
    }
    createCustomerAssetTable(){
        this.databaseService.createTableQuery('custassetsmst',
		'typeid text ,kunnr text, asset int,serialno text,instdate text,location text,imgurl text,imgpath text,statusid text,pernr text')
		.then((obj) => {
			console.log('table created custassetsmst');
		}, (err) => {
			console.log(JSON.stringify(err));
		});
    }
    createCustomerAssetStatusTable(){
        this.databaseService.createTableQuery('custassetstatusmst',
		'typeid text PRIMARY KEY, status text,pernr text')
		.then((obj) => {
			console.log('table created custassetstatusmst');
		}, (err) => {
			console.log(JSON.stringify(err));
		});
    }
}
