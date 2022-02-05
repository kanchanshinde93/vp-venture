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
import { NgxSpinnerService } from 'ngx-spinner';
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
searchText:any

accountNumber:any
ifsc:any
name_on_account:any
result:any
profit:number
resultbalance:any
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
  bankDetails: any;
  ifsc_code: any;
  bank_accountNumber: any;
  constructor(public afs: AngularFirestore, private spinner: NgxSpinnerService,private store: AngularFireStorage, config: NgbModalConfig, private modalService: NgbModal, public datePipe: DatePipe, public OneService :OnesignalService) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  @ViewChild(DatatableComponent) table: DatatableComponent;

  ngOnInit(): void {
    // header content 
    this.offers=[];
    this.contentHeader = {
      headerTitle: 'Pending Payout List',
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
            name: 'Pending Payout  List',
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
    this.offers=[];
    this.spinner.show()
    this.afs.collection('WITHDRAW', ref => ref.where('status', '==', 1)).valueChanges({ idField: 'id' }).subscribe((data) => {
      this.offersData = data;
      console.log(data)
      this.offersData.forEach(value => {
        this.afs.collection('INVESTORS').doc(value.uid).valueChanges({ idField: 'id' }).subscribe((data) => { // basic  deatils 
          this.investors = data;
          console.log(this.investors)
          var date = this.datePipe.transform(value.timestamp.toDate(), "medium");
          this.fullName = this.investors.fullName
          this.phone = this.investors.phone
          /* this.afs.collection('INVESTORS').doc(value.uid).collection('BANKS').valueChanges({ idField: 'id' }).subscribe((data) => { 
            this.bankDetails=data;
            console.log(this.bankDetails)
            this.bank_accountNumber=this.bankDetails[0].account_number
            this.ifsc_code=this.bankDetails[0].ifsc_code
          }) */
            
            this.offers.push({
              fullName: this.fullName,
              phone: this.phone,
              amount: value.amount,
             /*  bankAccountNo:this.bank_accountNumber,
              ifsc:this.ifsc_code, */
              reason: value.reason,
              status: value.status,
              timestamp: date,
              type: value.type,
              uid:value.uid
            })
            this.spinner.hide()
        
        });
      });
    });
  }

  payout(uid, amount, id) {
    this.amount = amount
    this.afs.collection('INVESTORS').doc(uid).valueChanges({ idField: 'id' }).subscribe((data)=>{ // basic  deatils 
      this.investors = data;
      this.fullName = this.investors.fullName
      this.email = this.investors.email
      this.phone = this.investors.phone
      this.city = this.investors.city
      this.afs.collection('INVESTORS').doc(uid).collection('BANKS').valueChanges({ idField: 'id' }).subscribe((data)=>{ // bank details
        this.banks = data;
       this.accountNumber = this.banks[0].account_number; 
       this.ifsc = this.banks[0].ifsc_code; 
       this.name_on_account = this.banks[0].name_on_account
       this.OneService.payout(this.email,this.phone,this.accountNumber, this.ifsc,this.name_on_account, this.amount).subscribe(resultData => { // call api 
        this.result = resultData;
          console.log(this.result)
          this.afs.collection('WITHDRAW').doc(id).set({ 
            status:2,
          });
          this.afs.collection('BALANCE').doc(uid).valueChanges().subscribe((data)=>{
            console.log(data)
            this.resultbalance = data
            this.profit = this.resultbalance.profit
            var newProfit = this.profit - amount;
            this.afs.collection('BALANCE').doc(uid).set({ 
              profit:newProfit,
            });
           })
          });
      });
    });
   
    
    
  }
}
