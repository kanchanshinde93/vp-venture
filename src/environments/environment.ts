// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  hmr: false,
  apiUrl: 'http://localhost:4000',
    firebase : {
      // apiKey: "AIzaSyBeuAkPJAoMch6VshgdMGw2zmAs4LEMud4",
      // projectId: "fablo-money",
      // appId: "1:701685794812:android:c8f56e4ef04fd5b8301479",
      apiKey: "AIzaSyDR7vzDVIehUyWeTaoFNk1Dnywq3Uz6hcA",
      authDomain: "friebasewebapp.firebaseapp.com",
      databaseURL: "https://friebasewebapp-default-rtdb.firebaseio.com",
      projectId: "friebasewebapp",
      storageBucket: "friebasewebapp.appspot.com",
      messagingSenderId: "658432913210",
      appId: "1:658432913210:web:fec8dcb9e72c6ca1db6a03",
      measurementId: "G-5XH0GQYWH9"
    },
 
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
