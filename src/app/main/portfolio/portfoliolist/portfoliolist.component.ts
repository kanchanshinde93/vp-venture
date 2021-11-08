import { Component, OnInit ,ViewChild} from '@angular/core';
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap'; // angular bootsrap modal
import  { Observable } from 'rxjs'
import { map } from 'rxjs/operators';
import { mergeMap } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-portfoliolist',
  templateUrl: './portfoliolist.component.html',
  styleUrls: ['./portfoliolist.component.scss']
})
export class PortfoliolistComponent implements OnInit {
  public contentHeader: object
  // basic details
  investors:any;
  InvestorQueryData:any;
  PortfolioQueryData:any
  investorList:any = [];
  portfoliosDataDetails:any = [];
  fullName:any
  email:any
  phone:any
  city:any
  doc_uid:any
  searchText:any

  //portfolios
  portfolios:any = [];
  portfoliosData:any = [];
  finalData:any = [];
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
    headers: ['Full Name','Phone','Amount','Locking', 'Profit', 'Rate', 'Date Time'],
    showTitle: false,
    useBom: true,
    removeNewLines: false,
    keys: ['fullName','phone','amount','locking', 'profit', 'rate', 'timestamp']
  
  };
  constructor(public afs: AngularFirestore, private store: AngularFireStorage,config: NgbModalConfig,private modalService: NgbModal,public datePipe: DatePipe) { 
    config.backdrop = 'static';
    config.keyboard = false;
  }
  
  @ViewChild(DatatableComponent) table: DatatableComponent;

  ngOnInit(): void {
      // header content 
      this.contentHeader = {
        headerTitle: 'Portfolio List',
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
              name: 'Portfolio',
              isLink: true,
              link: '/'
            },
            {
              name: 'Portfolio List',
              isLink: false
            }
          ]
        }
      };
   this.getAllPortfoliosList()

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

    getAllPortfoliosList(){
      let PortfolioQuery =  (this.afs.collectionGroup('PORTFOLIO').get());
      this.PortfolioQueryData = PortfolioQuery.subscribe((PortfolioRawData) => { 
        PortfolioRawData.forEach((PortfolioDocuments) => { 
          let portfolios = PortfolioDocuments.data();
          var date =  this.datePipe.transform(portfolios["timestamp"].toDate(),"medium");
         
          this.afs.collection('INVESTORS',  ref => ref.where('uid', '==', portfolios["uid"])).doc(portfolios["uid"]).valueChanges().subscribe(InvestorDetails=>{
                this.investors = InvestorDetails // get  Investor details by portfolios uid 
               if(this.investors){
                if(this.investors.phone){
                  portfolios["fullName"] =  this.investors.fullName
                  portfolios["phone"] =  this.investors.phone
                  portfolios["timestamp"] = date
                  this.portfoliosData.push(portfolios);
                }
               }
             
            });
        
          });
          
        this.PortfolioQueryData.unsubscribe();
      });
      console.log(this.portfoliosData ,"potfolios")
    
    }



}
