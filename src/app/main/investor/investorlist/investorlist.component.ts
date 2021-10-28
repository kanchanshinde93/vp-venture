import { Component, OnInit,ViewChild} from '@angular/core';
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap'; // angular bootsrap modal
// import { PortfoliolistComponent } from 'app/main/portfolio/portfoliolist/portfoliolist.component';
import { InvestorportfolioComponent } from '../investorportfolio/investorportfolio.component';
import {InvestortransactionlistComponent} from '../investortransactionlist/investortransactionlist.component'
import {ToastrService} from 'ngx-toastr'

@Component({
  selector: 'app-investorlist',
  templateUrl: './investorlist.component.html',
  styleUrls: ['./investorlist.component.scss']
})
export class InvestorlistComponent implements OnInit {
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
    keys: ['title']

  };
  constructor(public afs: AngularFirestore, private store: AngularFireStorage,config: NgbModalConfig,private modalService: NgbModal,public toastr: ToastrService) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
  @ViewChild(DatatableComponent) table: DatatableComponent;
  ngOnInit(): void {
    // header content 
    this.contentHeader = {
      headerTitle: 'Investor List',
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
            name: 'Investor List',
            isLink: false
          }
        ]
      }
    };
   this.getAllInvestorsList()
  }
  //  view modal
  viewopen(modalXL, uid ) {
    this.modalService.open(modalXL, {
      centered: true,
      size: 'xl'
    });
    this.doc_uid = uid
    this.getInvestorDeatilsByDocID(this.doc_uid)
  }
  
  portfolioDetails(uid) {
    const modalRef =   this.modalService.open(InvestorportfolioComponent, {
      centered: true,
      size: 'xl'
    });
    modalRef.componentInstance.doc_uid = uid;
    this.doc_uid = uid
  }
  transactionDetails(uid) {
    const modalRef =   this.modalService.open(InvestortransactionlistComponent, {
      centered: true,
      size: 'xl'
    });
    modalRef.componentInstance.doc_uid = uid;
    this.doc_uid = uid
  }
//  get All Investor List From Firbase
  getAllInvestorsList(){ 
    this.afs.collection('INVESTORS').valueChanges({ idField: 'id' }).subscribe((data)=>{
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
  getInvestorDeatilsByDocID(doc_uid){
    this.afs.collection('INVESTORS').doc(doc_uid).valueChanges({ idField: 'id' }).subscribe((data)=>{ // basic  deatils 
      this.investors = data;
      this.fullName = this.investors.fullName
      this.email = this.investors.email
      this.phone = this.investors.phone
      this.city = this.investors.city
    });
    this.afs.collection('BALANCE').doc(doc_uid).valueChanges({ idField: 'id' }).subscribe((data)=>{ // balance Details
      this.balance = data;
      this.investment = this.balance.investment
      this.profit = this.balance.profit
    });
    this.afs.collection('INVESTORS').doc(doc_uid).collection('KYC').doc('PRIMARY').valueChanges({ idField: 'id' }).subscribe((data)=>{ // kyc details
      this.investorDetails = data;
      this.aadhaar = this.investorDetails.aadhaar
      this.address = this.investorDetails.address
      this.gender = this.investorDetails.gender
      this.dob = this.investorDetails.dob
      this.work = this.investorDetails.work
      this.pan = this.investorDetails.pan
    });
    this.afs.collection('INVESTORS').doc(doc_uid).collection('BANKS').valueChanges({ idField: 'id' }).subscribe((data)=>{ // bank details
      this.banks = data;
    });

    this.afs.collection('INVESTORS').doc(doc_uid).collection('PORTFOLIO').valueChanges({ idField: 'id' }).subscribe((data)=>{ // bank details
      this.portfolios = data;
    });
    this.afs.collection('INVESTORS').doc(doc_uid).collection('TRANSACTION').valueChanges({ idField: 'id' }).subscribe((data)=>{ // bank details
      this.transactions = data;
    });
  }
  Delete(doc_id){
    this.afs.collection('INVESTORS').doc(doc_id).delete();
    this.toastr.success('success', 'Investor Deleted Successfully', {
      timeOut: 3000,
    });
  }
  
}
