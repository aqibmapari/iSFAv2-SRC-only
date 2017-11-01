import 'rxjs/add/operator/map'
export class SharedService {
    ip : string ;
    apiObj : Array<{key: string, className: string}>;
    pages: Array<{}>;
    pernr : string;
    menuArray : Array<{}>;
    subMenuArray : Array<{}>;
    constructor() {
    }

    setPages(page) {
        this.pages = page;
    }

    getPages() {
        return this.pages;
    }

    setIP(ip) {
        this.ip = ip;
    }

    getIP() {
        return this.ip;
    }

    setPernr(pernr) {
        this.pernr = pernr;
    }

    getPernr() {
        return this.pernr;
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
