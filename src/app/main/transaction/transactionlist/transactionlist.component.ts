import { Component, OnInit ,ViewChild} from '@angular/core';
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap'; // angular bootsrap modal
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-transactionlist',
  templateUrl: './transactionlist.component.html',
  styleUrls: ['./transactionlist.component.scss']
})
export class TransactionlistComponent implements OnInit {
  public contentHeader: object
  // basic details
  investors:any ;
  investorList:any = [];
  fullName:any
  email:any
  phone:any
  city:any
  doc_uid:any
  // transaction
  transaction:any;
  transactionData:any = [];
  transactionQueryData :any

  amount:any
  id:any
  reason:any
  status:any
  type:any
  timestamp:any
  uid:any
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
    headers: ['Full Name','Phone','Amount','Reason'],
    showTitle: false,
    useBom: true,
    removeNewLines: false,
    keys: ['fullName','phone','amount','reason']
  
  };
  constructor(public afs: AngularFirestore, private store: AngularFireStorage,config: NgbModalConfig,private modalService: NgbModal,public datePipe: DatePipe) { 
    config.backdrop = 'static';
    config.keyboard = false;
  }
  
  @ViewChild(DatatableComponent) table: DatatableComponent;

  ngOnInit(): void {
      // header content 
      this.contentHeader = {
        headerTitle: 'Transaction List',
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
              name: 'Transaction',
              isLink: true,
              link: '/'
            },
            {
              name: 'Transaction List',
              isLink: false
            }
          ]
        }
      };
   this.getAllTransactionList()

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

    getAllTransactionList(){ 
    let transactionQuery =  (this.afs.collectionGroup('TRANSACTION').get());
    this.transactionQueryData = transactionQuery.subscribe((transactionRawData) => { 
      transactionRawData.forEach((transactionDocuments) => { 
        let transactions = transactionDocuments.data();
        var date =  this.datePipe.transform(transactions["timestamp"].toDate(),"medium");
        this.afs.collection('INVESTORS',  ref => ref.where('uid', '==', transactions["uid"])).doc(transactions["uid"]).valueChanges().subscribe(InvestorDetails=>{
              this.investors = InvestorDetails // get  Investor details by transactions uid 
              transactions["fullName"] =  this.investors.fullName
              transactions["phone"] =  this.investors.phone
              transactions["timestamp"] = date
              if(this.investors.phone){
                this.transactionData.push(transactions);
                // console.log(transactions)
              }
          });
     
        });
        
      this.transactionQueryData.unsubscribe();
    });
    console.log(this.transactionData ,"potfolios")



    }


    

  
}
