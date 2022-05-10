import { Component, OnInit,ViewChild} from '@angular/core';
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap'; // angular bootsrap modal
import { InvestorportfolioComponent } from '../investorportfolio/investorportfolio.component';
import {InvestortransactionlistComponent} from '../investortransactionlist/investortransactionlist.component'
import {ToastrService} from 'ngx-toastr'
import { NgxSpinnerService } from 'ngx-spinner';


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
  searchText:any

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
  inverstorQueryData: any;
  NewData: any=[];
  constructor(public afs: AngularFirestore, private store: AngularFireStorage,config: NgbModalConfig,private spinner: NgxSpinnerService,private modalService: NgbModal,public toastr: ToastrService) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
  @ViewChild(DatatableComponent) table: DatatableComponent;
  ngOnInit(): void {
    // header content
    this.NewData=[];
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
    
    this.spinner.show()
    this.NewData=[];
   /*  this.afs.collection('INVESTORS', ref => ref.where('type', '==', 1)).valueChanges({ idField: 'id' }).subscribe((data)=>{
      this.investors = data;
      this.spinner.hide()
    }); */
    let investorQuery =  (this.afs.collection('INVESTORS', ref => ref.where('type', '==', 1)).get());
    this.inverstorQueryData = investorQuery.subscribe((investorRawData) => { 
      investorRawData.forEach((investorsDocuments) => { 
        let investors = investorsDocuments.data();
       // var date =  this.datePipe.transform(investors["timestamp"].toDate(),"medium");
        this.afs.collection('BALANCE').doc(investors["uid"]).valueChanges().subscribe(InvestorDetails=>{
              this.investors = InvestorDetails // get  Investor details by transactions uid 
              investors["investment"] =  this.investors?.investment
              investors["profit"] =  this.investors?.profit
              this.NewData.push(investors);
             });
        });
        this.spinner.hide()
      this.inverstorQueryData.unsubscribe();
    });
    console.log(this.NewData ,"activeinvestors")
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
    ngOnDestroy() {
      this.inverstorQueryData.unsubscribe();
  }
}
