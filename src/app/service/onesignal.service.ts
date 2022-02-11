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
  data:any
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


    payout(email, phone, accountNumber, ifsc, name_on_account,payoutamount){
        var key = "062B081AC9";
        var salt = "174F4A6761"; 
        var accountNumber = accountNumber; 
        var ifsc =  ifsc; 
        var upi_handle = "";
     
        var unique_request_number = (Math.random() + 1).toString(36).substring(5);

        var amount = parseFloat(payoutamount); 
        var auth = key + "|" + accountNumber + "|" + ifsc + "|" + upi_handle + "|" + unique_request_number + "|" + amount + "|" + salt;
        console.log(auth)
        var authhashkey = sha512.sha512(auth);
        console.log(authhashkey)
        var  data = {
          "key": key, "beneficiary_type": "bank_account", "beneficiary_name":
          name_on_account, "account_number": accountNumber, "ifsc": ifsc, "unique_request_number": unique_request_number,
          "payment_mode": "IMPS", "amount": amount, "email": email, "phone": phone, "narration": "Fablo Payout"
        }
        this.data = data
        return this.http.post('https://wire.easebuzz.in/api/v1/quick_transfers/initiate/',this.data,  {
          headers: new HttpHeaders({
            'authorization': authhashkey, 'Content-Type':
            'application/json'
          }),
        }).pipe(
          retry(1),
          catchError((err) => {
            return throwError(err);    //Rethrow it back to component
          })
        )
    }
    onesignal(){
   
    //  const headers = {
    //   "Content-Type": "application/json",
    //   "Authorization": "Basic ODM3ODE0NWUtZmUyNy00OTIwLTg5ZDUtOTgzY2EwNjgxMjBh"
    //   };
    //   const options = {
    //     host: "onesignal.com",
    //     port: 443,
    //     path: "/api/v1/notifications",
    //     method: "POST",
    //     headers: headers
    //   };
      const post_data = {
        'app_id': 'e1684313-6e71-43ad-9305-fc42074f5b97',
        'contents': {"en": "Brand new offer curated specially for you." , "es" : "Testing"},
        'headings': {"en": "Offer Update!" , "es" : "Testing"},
        'included_segments': ["Subscribed Users"],
    }
    // const httpOptions2 = {
    //     headers: new HttpHeaders({
    //       "Content-Type": "application/json",
    //       "Authorization": "Basic ODM3ODE0NWUtZmUyNy00OTIwLTg5ZDUtOTgzY2EwNjgxMjBh"
    //     })
    // };
    return this.http.post('https://onesignal.com/api/v1/notifications',post_data,  {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": "Basic ODM3ODE0NWUtZmUyNy00OTIwLTg5ZDUtOTgzY2EwNjgxMjBh"
      })
 
    })
    .pipe(
      retry(1),
      catchError((err) => {
        return throwError(err);    //Rethrow it back to component
      })
    )

      // this.http.post('https://onesignal.com/api/v1/notifications', post_data, httpOptions2)
      // .subscribe(new_data => {
      //     console.log(new_data)
      // }, error => {
      //     console.log(error);
      // });
  }



}
