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
  selector: 'app-allpayoutlist',
  templateUrl: './allpayoutlist.component.html',
  styleUrls: ['./allpayoutlist.component.scss']
})
export class AllpayoutlistComponent implements OnInit {

  public contentHeader: object
  // basic details
  offersData :any
  offers:any = [];
  investors:any
  fullName:any
  phone:any
searchText:any

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
    headers: ['Full Name','Phone','Amount','Reason', 'Payout Request Type','Date Time'],
    showTitle: false,
    useBom: true,
    removeNewLines: false,
    keys: ['fullName','phone','amount','reason', 'type',  'timestamp']
  
  };
  constructor(public afs: AngularFirestore, private store: AngularFireStorage,config: NgbModalConfig,private modalService: NgbModal,public datePipe: DatePipe) { 
    config.backdrop = 'static';
    config.keyboard = false;
  }
  
  @ViewChild(DatatableComponent) table: DatatableComponent;

  ngOnInit(): void {
      // header content 
      this.contentHeader = {
        headerTitle: 'All Payout List',
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
              name: 'All Payout  List',
              isLink: false
            }
          ]
        }
      };
   this.getAllPayoutsList()

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

  getAllPayoutsList(){
    this.afs.collection('WITHDRAW').valueChanges({ idField: 'id' }).subscribe((data)=>{
      this.offersData = data;
      this.offersData.forEach(value => {
        this.afs.collection('INVESTORS').doc(value.uid).valueChanges({ idField: 'id' }).subscribe((data)=>{ // basic  deatils 
            this.investors = data;
            // console.log(value)
            var date =  this.datePipe.transform(value.timestamp.toDate(),"medium");
            // console.log(date)
            this.fullName = this.investors.fullName
            this.phone = this.investors.phone
           this.offers.push({
            fullName:this.fullName,
            phone:this.phone,
            amount:value.amount,
            reason:value.reason,
            timestamp: date,
            type:value.type,
        
           }) 
        });
      });
     
      console.log(this.offers,"withdraw")
    });
  }
  
}
