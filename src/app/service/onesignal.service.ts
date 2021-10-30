import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { retry, catchError,map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OnesignalService {

  constructor(private http: HttpClient) { }
    // Error handling 
    handleError(error: HttpErrorResponse) {
      // console.log(error)
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
        // Get client-side error
        errorMessage = error.error.message;
      } else {
        // Get server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      // window.alert(errorMessage);
      return throwError(errorMessage);
    }

    // onesignal(){
    //   const data = {
    //     app_id: "e1684313-6e71-43ad-9305-fc42074f5b97",
    //     contents: {"en": "Ashutosh Patidar sending Message" , "es" : "Testing"},
    //     headings: {"en": "Ashutosh" , "es" : "Testing"},
    //     included_segments: ["Subscribed Users"]
    // }; 
    // const headers = {
    //     "Content-Type": "application/json",
    //     "Authorization": "Basic ODM3ODE0NWUtZmUyNy00OTIwLTg5ZDUtOTgzY2EwNjgxMjBh"
    // };

    // const options = {
    //     host: "onesignal.com",
    //     port: 443,
    //     path: "/api/v1/notifications",
    //     method: "POST",
    //     headers: headers
    // };

    // const https = require('https');
    // const req = https.request(options, function(res) {
    //     res.on('data', function(data) {
    //         console.log("Response:");
    //         console.log(JSON.parse(data));
    //     });
    // });
    // req.on('error', function(e) {
    //     console.log("ERROR:");
    //     console.log(e);
    // });

    // req.write(JSON.stringify(data));
    // req.end();
    // }
}
