import { Component, OnInit,ViewChild} from '@angular/core';
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap'; // angular bootsrap modal
import { InvestorportfolioComponent } from '../investorportfolio/investorportfolio.component';
import {InvestortransactionlistComponent} from '../investortransactionlist/investortransactionlist.component'
import {ToastrService} from 'ngx-toastr'


@Component({
  selector: 'app-activeinvestorlist',
  templateUrl: './activeinvestorlist.component.html',
  styleUrls: ['./activeinvestorlist.component.scss']
})
export class ActiveinvestorlistComponent implements OnInit {
  public contentHeader: object
  investors:any = [];
  investorDetails:any = [];
  // basic details
  fullName:any
  email:any
  phone:any
  city:any
  doc_uid:any
  // kyc details
  aadhaar:any;
  address:any;
  dob:any;
  pan:any;
  gender:any
  work:any
  // balance details
  balance:any
  investment:any
  profit:any
  // bank Details
  banks:any;
  //portfolios 
  portfolios:any
  //transactions
  transactions:any;
// pagination
  page = 1;
  count = 0;
  pageSize = 5;
  pageSizes = [5, 10, 15];
  config:any
  options = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    headers: ['Full Name','Email', 'Phone', 'City'],
    showTitle: false,
    useBom: true,
    removeNewLines: false,
    keys: ['fullName','email', 'phone', 'city']

  };
  constructor(public afs: AngularFirestore, private store: AngularFireStorage,config: NgbModalConfig,private modalService: NgbModal,public toastr: ToastrService) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
  @ViewChild(DatatableComponent) table: DatatableComponent;
  ngOnInit(): void {
    // header content 
    this.contentHeader = {
      headerTitle: 'Active Investor List',
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
            name: 'Investor',
            isLink: true,
            link: '/'
          },
          {
            name: 'Active Investor List',
            isLink: false
          }
        ]
      }
    };
   this.getAllActiveInvestorsList()
  }

  //  get All Active Investor List From Firbase
  getAllActiveInvestorsList(){ 
    this.afs.collection('INVESTORS', ref => ref.where('type', '==', 1)).valueChanges({ idField: 'id' }).subscribe((data)=>{
      this.investors = data;
    });
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
}
