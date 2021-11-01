import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap'; // angular bootsrap modal
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators';
import { mergeMap } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { DatePipe } from '@angular/common';
import * as sha512 from 'js-sha512';
import { OnesignalService} from '../../../service/onesignal.service'
@Component({
  selector: 'app-pendingpayoutlist',
  templateUrl: './pendingpayoutlist.component.html',
  styleUrls: ['./pendingpayoutlist.component.scss']
})
export class PendingpayoutlistComponent implements OnInit {

  public contentHeader: object
  // basic details
  offersData: any
  offers: any = [];
  investors: any
  fullName: any
  phone: any
  banks:any
  amount:any
  email:any
city:any
accountNumber:any
ifsc:any
name_on_account:any
result:any
  // pagination
  page = 1;
  count = 0;
  pageSize = 10;
  pageSizes = [5, 10, 15];
  config: any
  options = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    headers: ['Full Name', 'Phone', 'Amount', 'Reason', 'Payout Request Type', 'Date Time'],
    showTitle: false,
    useBom: true,
    removeNewLines: false,
    keys: ['fullName', 'phone', 'amount', 'reason', 'type', 'timestamp']

  };
  constructor(public afs: AngularFirestore, private store: AngularFireStorage, config: NgbModalConfig, private modalService: NgbModal, public datePipe: DatePipe, public OneService :OnesignalService) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  @ViewChild(DatatableComponent) table: DatatableComponent;

  ngOnInit(): void {
    // header content 
    this.contentHeader = {
      headerTitle: 'All Payout List',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Home',
            isLink: true,
            link: '/'
          },
          {
            name: 'Payout',
            isLink: true,
            link: '/'
          },
          {
            name: 'All Payout  List',
            isLink: false
          }
        ]
      }
    };
    this.getAllPendingPayoutsList()

  }

  // pagination section
  handlePageChange(event: number): void { // function for angular pagination handle page change event
    this.page = event;
    this.ngOnInit();// call on load function
  }
  handlePageSizeChange(event: any): void { // function for angular pagination  handle page size on change event
    this.pageSize = event.target.value;
    this.page = 1;
    this.ngOnInit();// call on load function
  }

  getAllPendingPayoutsList() {
    this.afs.collection('WITHDRAW', ref => ref.where('status', '==', 1)).valueChanges({ idField: 'id' }).subscribe((data) => {
      this.offersData = data;
      this.offersData.forEach(value => {
        this.afs.collection('INVESTORS').doc(value.uid).valueChanges({ idField: 'id' }).subscribe((data) => { // basic  deatils 
          this.investors = data;
          // console.log(value)
          var date = this.datePipe.transform(value.timestamp.toDate(), "medium");
          // console.log(date)
          this.fullName = this.investors.fullName
          this.phone = this.investors.phone
          this.offers.push({
            fullName: this.fullName,
            phone: this.phone,
            amount: value.amount,
            reason: value.reason,
            status: value.status,
            timestamp: date,
            type: value.type,
            uid:value.uid
          })
        });
      });
      // console.log(this.offers, "withdraw")
    });
  }
  

  payout(uid, amount) {
    console.log(uid)
    this.amount = amount
    this.afs.collection('INVESTORS').doc(uid).valueChanges({ idField: 'id' }).subscribe((data)=>{ // basic  deatils 
      this.investors = data;
      this.fullName = this.investors.fullName
      this.email = this.investors.email
      this.phone = this.investors.phone
      this.city = this.investors.city

      this.afs.collection('INVESTORS').doc(uid).collection('BANKS').valueChanges({ idField: 'id' }).subscribe((data)=>{ // bank details
        this.banks = data;
        console.log(this.banks[0])
       this.accountNumber = this.banks[0].account_number; 
       this.ifsc = this.banks[0].ifsc_code; 
       this.name_on_account = this.banks[0].name_on_account
      //  this.OneService.payout(this.email,this.phone,this.accountNumber, this.ifsc,this.name_on_account, this.amount).subscribe(resultData => { // call api 
      //   this.result = resultData;
       
      // });
  
      // var request = require('request'); 
      // var key = "062B081AC9";
      // var salt = "174F4A6761"; 
      // var accountNumber = this.accountNumber; 
      // var ifsc =  this.ifsc; 
      //  var upi_handle = "";
      //   // var unique_request_number = randomstring.generate(7); 
      //   var unique_request_number = (Math.random() + 1).toString(36).substring(5);
      //     console.log(unique_request_number);
      //     var amount = parseFloat(this.amount); 
      //     var auth = key + "|" + accountNumber + "|" + ifsc + "|" + upi_handle + "|" + unique_request_number + "|" + amount + "|" + salt;
      //        var authhashkey = sha512.sha512(auth);
      //         var options = {
      //           'method': 'POST', 'url': 'https://wire.easebuzz.in/api/v1/quick_transfers/initiate/',
      //           'headers': {
      //             'authorization': authhashkey, 'Content-Type':
      //               'application/json'
      //           }, 
      //           body: JSON.stringify({
      //             "key": key, "beneficiary_type": "bank_account", "beneficiary_name":
      //             this.name_on_account, "account_number": accountNumber, "ifsc": ifsc, "unique_request_number": unique_request_number,
      //             "payment_mode": "IMPS", "amount": amount, "email": this.email, "phone": this.phone, "narration": "Fablo Payout"
      //           })
      //         }; request(options,  function (error, response) {
      //           console.log(response)
  
      //           if (error) {
      //            console.log(error)
                  
      //           } 
      //         });
      });
    });
   
    
    
  }
}
