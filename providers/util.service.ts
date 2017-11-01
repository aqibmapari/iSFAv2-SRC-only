export class UtilService {
    keyStr = "ABCDEFGHIJKLMNOP" +
                "QRSTUVWXYZabcdef" +
                "ghijklmnopqrstuv" +
                "wxyz0123456789+/" +
                "=";
    constructor() {
    }
  	sortObject(array,key){
    		let sortedObjects = array.sort(function(a, b) {
    			var aName = a[key].toLowerCase();
    			var bName = b[key].toLowerCase();
    			return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
    		});
    		return sortedObjects;
  	}
    groupObjects(objects,key){

    		let sortedObjects = this.sortObject(objects,key);
    		let currentLetter = false;
    		let currentObjects = [];
    		let groupedObjects = [];

    		sortedObjects.forEach((value, index) => {
            if(value[key].charAt(0) != currentLetter){
                  currentLetter = value[key].charAt(0);
                  let newGroup = {
          					letter: currentLetter,
          					object: []
          				};
                  currentObjects = newGroup.object;
          				groupedObjects.push(newGroup);
          	}
                currentObjects.push(value);
        });
      	return groupedObjects;
    }
    filterObject(array,key,searchTerm){
        return array.filter((item) => {
            return item[key]==(searchTerm);
        });
    }
    encode64(input) {
        if(input==undefined || input == '') input = 'null';
        input = encodeURIComponent(input);
        let output = "";
        let chr1, chr2, chr3 = null;
        let enc1, enc2, enc3, enc4 = null;
        let i = 0;
        do {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);
        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;
        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
            enc4 = 64;
        }
        output = output +
        this.keyStr.charAt(enc1) +
        this.keyStr.charAt(enc2) +
        this.keyStr.charAt(enc3) +
        this.keyStr.charAt(enc4);
        chr1 = chr2 = chr3 = null;
        enc1 = enc2 = enc3 = enc4 = null;
        } while (i < input.length);
        return output;
    }
    decode64(input) {
        if(input==undefined || input==null) return input;
        let output = "";
        let chr1, chr2, chr3 = null;
        let enc1, enc2, enc3, enc4 = null;
        let i = 0;
        // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
        let base64test = /[^A-Za-z0-9\+\/\=]/g;
        if (base64test.exec(input)) {
            console.log("There were invalid base64 characters in the input text.\n" +
            "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
            "Expect errors in decoding.");
            return input;
        }
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        do {
            enc1 = this.keyStr.indexOf(input.charAt(i++));
            enc2 = this.keyStr.indexOf(input.charAt(i++));
            enc3 = this.keyStr.indexOf(input.charAt(i++));
            enc4 = this.keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
            chr1 = chr2 = chr3 = null;
            enc1 = enc2 = enc3 = enc4 = null;
        } while (i < input.length);
        return decodeURIComponent(output);
    }
    checkEncodedBlank(text){
    	if(this.encode64((text)) == this.encode64(this.decode64(this.encode64('')))){
    		text = 'null';
    	}
    	return (text);
    }
    checkReturnValue(chkVal,rtnVal){
    	return (chkVal === 'null' || chkVal === '' || chkVal === undefined || chkVal === null || chkVal == 'NaN') ? rtnVal : chkVal;
    }
    convertTime24HrFormat(str) {
        var time = str;
        var hours = Number(time.match(/^(\d+)/)[1]);
        var minutes = Number(time.match(/:(\d+)/)[1]);
        var AMPM = time.match(/\s(.*)$/)[1];
        if (AMPM == "PM" && hours < 12) hours = hours + 12;
        if (AMPM == "AM" && hours == 12) hours = hours - 12;
        var sHours = hours.toString();
        var sMinutes = minutes.toString();
        if (hours < 10) sHours = "0" + sHours;
        if (minutes < 10) sMinutes = "0" + sMinutes;
        return (sHours + ":" + sMinutes + ":00");
    }
    formatAMPM(date) {
    	var hours =0,minutes=0;
    	if(date instanceof Date){
    		hours = date.getHours();
    		minutes = date.getMinutes();
    	}
    	else{
    		var tempDateArr = date.split(':');
    		if(tempDateArr.length !=0){
    			hours = parseInt(tempDateArr[0],10);
    			minutes = parseInt(tempDateArr[1],10);
    		}
    	}

    	var ampm = hours >= 12 ? 'PM' : 'AM';
    	hours = hours % 12;
    	hours = hours ? hours : 12; // the hour '0' should be '12'
        var sHours = hours.toString();
        var sMinutes = minutes.toString();
        if (hours < 10) sHours = "0" + hours;
        if (minutes < 10) sMinutes = "0" + minutes;
    	var strTime = sHours + ':' + sMinutes + ' ' + ampm;
    	return strTime;
    }
    formatDateToDatabaseFormat(dateStr){
        var formattedDateStr = dateStr.split(".");
        return formattedDateStr[2] + "-" + ((formattedDateStr[1] < 10) ? "0" + formattedDateStr[1] : formattedDateStr[1]) + "-" + ((formattedDateStr[0] < 10) ? "0" + formattedDateStr[0] : formattedDateStr[0]);
    }
    returnDateTime(datetime,isTimeZoneIndependent){
        // var isTimeZoneIndependent = false;
        var _datetime = datetime.split(' ');
    	var _date = _datetime[0].split('-');
    	var _time = _datetime[1].split(':');
    	var _sec = _time[2].split('.');
    	var year = parseInt(_date[0],10);
    	var month = parseInt(_date[1],10)-1;
    	var day = parseInt(_date[2],10);
    	var hours = parseInt(_time[0],10);
    	var minutes = parseInt(_time[1],10);
    	var seconds = parseInt(_sec[0],10);
    	var milliseconds = parseInt(_sec[1],10);
    	var d = new Date(year, month, day, hours, minutes, seconds, milliseconds);
    	var returnDateTime = isTimeZoneIndependent?(d.getTime()-(d.getTimezoneOffset()*60000)):d.getTime();
    	return returnDateTime;
    }
}
