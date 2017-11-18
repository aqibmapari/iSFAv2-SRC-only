# iSFAv2-SRC-only

How to use this
```
npm install -g cordova ionic
```
This will install latest ionic/cordova CLI

Start new Ionic project
```
ionic start iSFAv2 sidemenu
```

Delete all files and folder under src folder.
Copy and paste all the above files in src folder of the newly created project.

Install the required npm modules

```
npm install chart.js --save
npm install c3 --save
```

Install required cordova plugins
```
ionic cordova plugin add cordova-plugin-app-version
npm install --save @ionic-native/app-version

ionic cordova plugin add cordova-plugin-device
npm install --save @ionic-native/device

ionic cordova plugin add cordova-sqlite-storage
npm install --save @ionic-native/sqlite

ionic cordova plugin add cordova-plugin-googlemaps --variable API_KEY_FOR_ANDROID="AIzaSyBg5R1F5cc0cwMSLq09aHpRRROU3dJbnqw" --variable API_KEY_FOR_IOS="AIzaSyCs8KStNo5UilKe3YOCOgZKrQQhJGv5Qw4"
npm install --save @ionic-native/google-maps

ionic cordova plugin add cordova-plugin-geolocation --variable GEOLOCATION_USAGE_DESCRIPTION="To locate you"
npm install --save @ionic-native/geolocation

ionic cordova plugin add cordova-plugin-request-location-accuracy
npm install --save @ionic-native/location-accuracy
```
