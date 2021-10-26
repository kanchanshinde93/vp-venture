import { Component, OnInit ,ViewChild} from '@angular/core';
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap'; // angular bootsrap modal

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
  pageSize = 5;
  pageSizes = [5, 10, 15];
  config:any
  constructor(public afs: AngularFirestore, private store: AngularFireStorage,config: NgbModalConfig,private modalService: NgbModal) { 
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
      this.afs.collectionGroup('TRANSACTION').valueChanges({ idField: 'id' }).subscribe(data => {
        this.transaction = data
        console.log(data.length)
        for (var i=0; i <= data.length; i++){
          console.log(data[i])
          console.log(data[i]['amount'])

          this.amount= data[i]['amount'],
          this.id= data[i]['id'],
          this.reason= data[i]['reason'],
          this.status= data[i]['status'],
          this.type= data[i]['type'],
          this.timestamp= data[i]['timestamp'],
          this.uid= data[i]['uid'],
          this.afs.collection('INVESTORS').doc(data[i]['uid']).valueChanges({ idField: 'id' }).subscribe((result)=>{ // basic  deatils 
            this.investors = result;
            this.fullName =  this.investors.fullName,
            this.email =  this.investors.email,
            this.phone =  this.investors.phone,
            this.city =  this.investors.city,
            this.transactionData.push({
              fullName: this.investors.fullName,
              email: this.investors.email,
              phone: this.investors.phone,
              city: this.investors.city,
              id: this.id,
              reason:this.reason,
              status:this.status,
              type:this.type,
              timestamp:this.timestamp,
              uid:this.uid
            })
          });
        }
        console.log(this.transactionData, "transaction")
    });
    }


    

  
}
