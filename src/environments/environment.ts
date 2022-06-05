/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
    firebase: {
      apiKey: "AIzaSyB_-zvddGTVsnNhKj4rT10BSs6g_kU4PUE",
      authDomain: "udegree-admin.firebaseapp.com",
      databaseURL: "https://udegree-angular-courses-us-5d785.firebaseio.com/",
      projectId: "udegree-angular",
      storageBucket: "udegree-angular.appspot.com",
      messagingSenderId: "708718176430",
      appId: "1:708718176430:web:71ebdd7e688bd5f060253f",
      measurementId: "G-MN927X4H5S"
    }
};
