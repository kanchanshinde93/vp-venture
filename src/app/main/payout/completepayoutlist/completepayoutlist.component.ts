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
  selector: 'app-completepayoutlist',
  templateUrl: './completepayoutlist.component.html',
  styleUrls: ['./completepayoutlist.component.scss']
})
export class CompletepayoutlistComponent implements OnInit {
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
searchText:any

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
  constructor(public afs: AngularFirestore, private spinner: NgxSpinnerService,private store: AngularFireStorage, config: NgbModalConfig, private modalService: NgbModal, public datePipe: DatePipe, public OneService :OnesignalService) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  @ViewChild(DatatableComponent) table: DatatableComponent;


  ngOnInit(): void {
      // header content 
      this.contentHeader = {
        headerTitle: 'Complete Payout List',
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
              name: 'Complete Payout  List',
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
    this.spinner.show();
    let withdrawtable=this.afs.collection('WITHDRAW', ref => ref.where('status', '==', 2)).valueChanges({ idField: 'id' }).subscribe((data) => {
      this.offersData = data;
      this.offersData.forEach(value => {
        this.afs.collection('INVESTORS').doc(value.uid).valueChanges({ idField: 'id' }).subscribe((data) => { // basic  deatils 
          this.investors = data;
          // console.log(value)
          var date = this.datePipe.transform(value.timestamp?.toDate(), "medium");
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
          this.spinner.hide();
          withdrawtable.unsubscribe()
        });
      });
      // console.log(this.offers, "withdraw")
    });
  }
}
