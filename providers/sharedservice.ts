import 'rxjs/add/operator/map'
export class SharedService {
    private ip : string ;
    private apiObj : Array<{key: string, className: string}>;
    private pages: Array<{}>;
    private pernr : string;
    private userName : string;
    private menuArray : Array<{}>;
    private subMenuArray : Array<{}>;
    private pwd: string;
    private isApp: boolean;
    private userObj: any;
    constructor() {
    }

    setPages(page) {
        this.pages = page;
    }

    getPages() {
        return this.pages;
    }
    setUserObj(userObj) {
        this.userObj = userObj;
    }

    getUserObj() {
        return this.userObj;
    }

    setIP(ip) {
        this.ip = ip;
    }

    getIP() {
        return this.ip;
    }
    setIsApp(isApp) {
        this.isApp = isApp;
    }

    getIsApp() {
        return this.isApp;
    }
    setPernr(pernr) {
        this.pernr = pernr;
    }

    getPernr() {
        return this.pernr;
    }

    setUserName(userName) {
        this.userName = userName;
    }

    getUserName() {
        return this.userName;
    }

    setPwd(pwd) {
        this.pwd = pwd;
    }

    getPwd() {
        return this.pwd;
    }

    setAPIObj(apiObj) {
        this.apiObj = apiObj;
    }

    getAPIObj(key) {
        let index = this.apiObj.map(function(x) {return (x.key == key)}).indexOf(true);

        if(index !== -1){
            return this.apiObj[index]['className'];
        }
        else{
            return '';
        }
    }

    setMenuArr(menuArray) {
        this.menuArray = menuArray;
    }

    getMenuArr() {
        return this.menuArray;
    }

    setSubMenuArr(subMenuArray) {
        this.subMenuArray = subMenuArray;
    }

    getSubMenuArr() {
        return this.subMenuArray;
    }
}
