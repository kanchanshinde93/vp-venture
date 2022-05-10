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
import { ToastrService } from 'ngx-toastr';
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
  newProfit:any;
  bank_accountNumber: any;


  constructor(public afs: AngularFirestore, public toastr: ToastrService,private spinner: NgxSpinnerService,private store: AngularFireStorage, config: NgbModalConfig, private modalService: NgbModal, public datePipe: DatePipe, public OneService :OnesignalService) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  @ViewChild(DatatableComponent) table: DatatableComponent;

  ngOnInit(): void {
    // header content 
    this.offers.pop();
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
    this.offers.pop();
   this.spinner.show()
 
   let withdrawtable=this.afs.collection('WITHDRAW', ref => ref.where('status', '==', 1)).valueChanges({ idField: 'id' }).subscribe((data) => {
      this.offersData = data;
      console.log(data)
      this.spinner.hide()
       this.offersData.forEach(value => {
        this.afs.collection('INVESTORS').doc(value.uid).valueChanges({ idField: 'id' }).subscribe((data) => { // basic  deatils 
          this.investors = data;
          var date = this.datePipe.transform(value.timestamp.toDate(), "medium");
          this.fullName = this.investors.fullName
          this.phone = this.investors.phone 
         // this.offers=[];
         
          this.offers.push({
              id:value.id,
              fullName: this.fullName,
              phone: this.phone,
              amount: value.amount,
              bankAccountNo:value.account_number,
              ifsc:value.ifsc_code, 
              reason: value.reason,
              status: value.status,
              timestamp: date,
              type: value.type,
              uid:value.uid
            })
            withdrawtable.unsubscribe()
          
        
        });
      });
    });
    
  }

/*   payout(uid, amount, id) {
    //console.log(uid,+amount,+id)
    this.amount = amount
    this.afs.collection('INVESTORS').doc(uid).valueChanges({ idField: 'id' }).subscribe((data)=>{ // basic  deatils 
      this.investors = data;
      this.fullName = this.investors.fullName
      this.email = this.investors.email
      this.phone = this.investors.phone
      this.city = this.investors.city
      this.afs.collection('INVESTORS').doc(uid).collection('BANKS').valueChanges({ idField: 'id' }).subscribe((data)=>{ // bank details
        this.banks = data;
       this.accountNumber = this.banks[0]?.account_number; 
       this.ifsc = this.banks[0]?.ifsc_code; 
       this.name_on_account = this.banks[0]?.name_on_account
      this.OneService.payout(this.email,this.phone,this.accountNumber, this.ifsc,this.name_on_account, this.amount).subscribe(resultData => {
        this.result = resultData;
        console.log(this.result)
        this.toastr.success('success', ' Successfully', {
          timeOut: 100000,
        }); 
        })  
        
        this.afs.collection('WITHDRAW').doc(id).update({ 
            status:2,
          });
       
         let data1= this.afs.collection('BALANCE').doc(uid).valueChanges().subscribe((data)=>{
          console.log(data)
          this.resultbalance = data
          this.profit = this.resultbalance.profit
          this.newProfit = this.profit - amount.toFixed(2);
            console.log(this.newProfit)
            data1.unsubscribe();
            this.afs.collection('BALANCE').doc(uid).update({ 
            profit:this.newProfit
              });
             //return;
        }) 
       });
      });
 
      this.getAllPendingPayoutsList()
    
    
  }  */

  
}
