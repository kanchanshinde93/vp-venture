import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { retry, catchError,map } from 'rxjs/operators';
import * as sha512 from 'js-sha512';


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

    // payout(email, phone, accountNumber, ifsc, name_on_account,payoutamount){
    //    var request = require('request'); 
    //    var key = "062B081AC9";
    //    var salt = "174F4A6761"; 
    //    var accountNumber = accountNumber; 
    //    var ifsc =  ifsc; 
    //     var upi_handle = "";
    //      // var unique_request_number = randomstring.generate(7); 
    //      var unique_request_number = (Math.random() + 1).toString(36).substring(5);
    //        console.log(unique_request_number);
    //        var amount = parseFloat(payoutamount); 
    //        var auth = key + "|" + accountNumber + "|" + ifsc + "|" + upi_handle + "|" + unique_request_number + "|" + amount + "|" + salt;
    //           var authhashkey = sha512.sha512(auth);
    //            var options = {
    //              'method': 'POST', 'url': 'https://wire.easebuzz.in/api/v1/quick_transfers/initiate/',
    //              'headers': {
    //                'authorization': authhashkey, 'Content-Type':
    //                  'application/json'
    //              }, 
    //              body: JSON.stringify({
    //                "key": key, "beneficiary_type": "bank_account", "beneficiary_name":
    //                name_on_account, "account_number": accountNumber, "ifsc": ifsc, "unique_request_number": unique_request_number,
    //                "payment_mode": "IMPS", "amount": amount, "email": email, "phone": phone, "narration": "Fablo Payout"
    //              })
    //            }; request(options,  function (error, response) {
    //              console.log(response)
   
    //              if (error) {
    //               console.log(error)
    //              } 
    //            });
    // }
}
