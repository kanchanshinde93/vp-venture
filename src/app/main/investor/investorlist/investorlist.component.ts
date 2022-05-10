import { Component, OnInit,ViewChild} from '@angular/core';
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { AngularFirestore, AngularFirestoreCollection , AngularFirestoreDocument  } from '@angular/fire/compat/firestore';


import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap'; // angular bootsrap modal
// import { PortfoliolistComponent } from 'app/main/portfolio/portfoliolist/portfoliolist.component';
import { InvestorportfolioComponent } from '../investorportfolio/investorportfolio.component';
import {InvestortransactionlistComponent} from '../investortransactionlist/investortransactionlist.component'
import {ToastrService} from 'ngx-toastr'
import { NgxSpinnerService } from "ngx-spinner";
import { stringify } from 'querystring';
import { Observable, pipe} from 'rxjs'

import { map, switchMap } from "rxjs/operators";
import { log } from 'console';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-investorlist',
  templateUrl: './investorlist.component.html',
  styleUrls: ['./investorlist.component.scss']
})
export class InvestorlistComponent implements OnInit {
  public contentHeader: object
  investors:any =[]
  investorDetails:any = [];
  // basic details
  fullName:any
  email:any
  phone:any
  city:any
  doc_uid:any
  filterString = "";
  filtered;
  searchText:any
  aa:boolean=false;
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
  portfolios:any[];
  //transactions
  transactions:any[];
// pagination
  page = 1;
  count = 0;
  pageSize = 10;
  pageSizes = [5, 10, 15];
  config:any
  options = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    headers: ['Full Name','Email', 'Phone', 'City','Date/Time','Current Investment Balance','Wallet Balance'],
    showTitle: false,
    useBom: true,
    removeNewLines: false,
    keys: ['fullName','email', 'phone', 'city','timestamp','investment','profit']

  };
  NewData: any=[];
  inverstorQueryData: any;
  investorsTable: any;
  balanceTable: any;
  investmentAmount:any
  objectivesCollection: any;
  lastVisible: any;
  curentindex: number=0;inverstorQueryData1: any;
  investorsDetails: any;
  investorkycDetails: any;
  balanceDetails: any;
  banksLength: any;
  searchValue: string = "";
  results: any;
  balanceData: any;
;
  
  constructor(public afs: AngularFirestore, public datePipe: DatePipe,private store: AngularFireStorage,config: NgbModalConfig,private spinner: NgxSpinnerService,private modalService: NgbModal,public toastr: ToastrService) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
  @ViewChild(DatatableComponent) table: DatatableComponent;
  ngOnInit(): void {
    // header content 
    this.NewData=[];
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
   //this.handlePageChange(this.page)
   this.portfolios=[];
  }
/*   onFilterChange() {
    this.filtered = this.investors.filter((investor) => this.isMatch(investor));
  } */
  isMatch(item) {
    if (item instanceof Object) {
      return Object.keys(item).some((k) => this.isMatch(item[k]));
    } else {
      return item.toString().indexOf(this.filterString) > -1
    }
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
 async  getAllInvestorsList(){ 
  this.investors=[];
  this.spinner.show()
   let investorQuery =  (this.afs.collection('INVESTORS', ref => ref.limit(15)
   .orderBy('timestamp', 'desc')).get());
    this.inverstorQueryData = investorQuery.subscribe((investorRawData) => { 
      investorRawData.forEach((investorsDocuments) => { 
        let investors = investorsDocuments.data();
        var date =  this.datePipe.transform(investors["timestamp"].toDate(),"medium");
       this.lastVisible = investorRawData.docs[investorRawData.docs.length-1];
       this.afs.collection('BALANCE').doc(investors["uid"]).valueChanges().subscribe(InvestorDetails=>{
              this.balanceData = InvestorDetails // get  Investor details by transactions uid 
              investors["investment"] =  this.balanceData.investment
              investors["profit"] =  this.balanceData.profit
              investors["timestamp"] = date
              this.investors.push(investors);
             });
        });
        this.spinner.hide()
      this.inverstorQueryData.unsubscribe();
    });


    console.log(this.investors ,"investors")
  }
  
  // pagination section
 /*  handlePageChange(event: number): void { } */
   handlePageChange(event: number): void { // function for angular pagination handle page change event
  this.spinner.show()
  this.page = event;
  if(this.curentindex<this.page){
      var next = this.afs.collection("INVESTORS",ref => ref.limit(10) .orderBy('timestamp', 'desc').startAfter(this.lastVisible)).get()
      this.inverstorQueryData1 = next.subscribe((investorRawData) => { 
        investorRawData.forEach((investorsDocuments) => { 
          let investors = investorsDocuments.data();
          this.lastVisible = investorRawData.docs[investorRawData.docs.length-1];
        this.afs.collection('BALANCE').doc(investors["uid"]).valueChanges().subscribe(InvestorDetails=>{
            this.investors = InvestorDetails // get  Investor details by transactions uid 
            investors["investment"] =  this.investors?.investment
            investors["profit"] =  this.investors?.profit
            this.investors.push(investors);
            });
      });
      this.inverstorQueryData1.unsubscribe();
}) 
        this.curentindex++;
        this.spinner.hide();

  }else{
    console.log('pre')
    this.spinner.hide()
  }
  } 


  handlePageSizeChange(event: any): void { // function for angular pagination  handle page size on change event
    alert('')
    this.pageSize = event.target.value;
    this.page = 1;
    this.ngOnInit();// call on load function
  }
 async getInvestorDeatilsByDocID(doc_uid:any){
  this.portfolios=[];
  this.transactions=[];
    this.afs.collection('INVESTORS').doc(doc_uid).ref.get().then((doc) => {
      this.investorsDetails = doc.data();
    });
   
    this.afs.collection('BALANCE').doc(doc_uid).ref.get().then((balancedetails)=>{ // balance Details
    this.balanceDetails = balancedetails.data(); });

    this.afs.collection('INVESTORS').doc(doc_uid).collection('KYC').doc('PRIMARY').ref.get().then((kycDetails:any)=>{ // kyc details
    this.investorkycDetails = kycDetails.data() });


    this.afs.collection('INVESTORS').doc(doc_uid).collection('BANKS').valueChanges({ idField: 'id' }).subscribe((bankdetails)=>{ // bank details
      this.banks = bankdetails
      this.banksLength=this.banks.length
     // console.log(this.banks.length)
    });
  }

  portfoliotab(){
      //console.log('hsdasbd')
      this.portfolios=[];

      this.afs.collection('INVESTORS').doc(this.doc_uid).collection('PORTFOLIO').valueChanges({ idField: 'id' }).subscribe((data:any)=>{ // portfolios details
        data.forEach((doc:any) => {
        let data=doc
        this.portfolios.push({
          amount:data.amount,
          locking:data.locking,
          profit:data.profit,
          rate:data.rate,
          timestamp: data.timestamp,
        })
    })
      //console.log(this.portfolios);  
    });
  }

  transcationtab(){
   // console.log('hsdasbd22')
    this.transactions=[];
    this.afs.collection('INVESTORS').doc(this.doc_uid).collection('TRANSACTION').ref.get().then((data)=>{ // transcation details
        data.forEach(value => {
          let transdata=value.data()
          this.transactions.push({
                amount:transdata.amount,
                reason:transdata.reason,
                timestamp: transdata.timestamp,
              })
            });
          //  console.log(this.transactions);  
        });
  }
  Delete(doc_id){
    this.afs.collection('INVESTORS').doc(doc_id).delete();
    this.toastr.success('success', 'Investor Deleted Successfully', {
      timeOut: 3000,
    });
  }
  setIndex(ii){
    this.aa=ii;
    console.log
  }
  
  search() {
    this.NewData=[];
   // console.log(this.searchValue)
    if(this.searchValue==""){
      console.log("blank")
      this.getAllInvestorsList()
    }else{
      this.NewData=[];
      let self = this;
      let investorQuery =  (this.afs.collection('INVESTORS', ref => ref.limit(10)
   .orderBy('fullName').startAt(self.searchValue.toLowerCase()) .endAt(self.searchValue.toLowerCase()+"\uf8ff")).get());
    //let investorQuery = this.afs.collection(`INVESTORS`, ref => ref.orderBy("fullName").startAt(self.searchValue.toLowerCase()) .endAt(self.searchValue.toLowerCase()+"\uf8ff").limit(10).get())
        this.inverstorQueryData = investorQuery.subscribe((res) => { 
          //console.log(res)
          res.forEach((investorsDocuments:any) => { 
            let investors = investorsDocuments.data();
         //  console.log("last", investors);
           // var date =  this.datePipe.transform(investors["timestamp"].toDate(),"medium");
            this.afs.collection('BALANCE').doc(investors["uid"]).valueChanges().subscribe(InvestorDetails=>{
                  this.investors = InvestorDetails // get  Investor details by transactions uid 
                  investors["investment"] =  this.investors?.investment
                  investors["profit"] =  this.investors?.profit
  
                  this.investors.push(investors);
                 });
            });
            this.spinner.hide()
          this.inverstorQueryData.unsubscribe();
        });
    }
   
   
  } 

  ngOnDestroy() {
    this.inverstorQueryData.unsubscribe();
    this.investors=[];
}
}


