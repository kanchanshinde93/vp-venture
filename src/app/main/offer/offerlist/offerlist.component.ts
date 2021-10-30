import { Component, OnInit ,ViewChild} from '@angular/core';
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap'; // angular bootsrap modal
import  { Observable } from 'rxjs'
import { map } from 'rxjs/operators';
import { mergeMap } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import {ToastrService} from 'ngx-toastr'
import {ActivatedRoute} from "@angular/router"
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-offerlist',
  templateUrl: './offerlist.component.html',
  styleUrls: ['./offerlist.component.scss']
})
export class OfferlistComponent implements OnInit {
  public contentHeader: object
  offers:any =[];
  offersData:any 
  uid:any;
  investors:any
  fullName:any
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
    headers: ['Amount','Duration', 'Profit', 'Date'],
    showTitle: false,
    useBom: true,
    removeNewLines: false,
    keys: ['amount','duration', 'profit',  'date']
  
  };
  constructor(public afs: AngularFirestore, public datePipe: DatePipe, private store: AngularFireStorage,config: NgbModalConfig,private modalService: NgbModal,public toastr: ToastrService, private activerouter: ActivatedRoute) { 
    config.backdrop = 'static';
    config.keyboard = false;
  }
  
  @ViewChild(DatatableComponent) table: DatatableComponent;

  ngOnInit(): void {
     // header content 
     this.contentHeader = {
      headerTitle: 'Offfer List',
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
            name: 'Offfer',
            isLink: true,
            link: '/'
          },
          {
            name: 'Offfer List',
            isLink: false
          }
        ]
      }
    };
    this.uid  = this.activerouter.snapshot.paramMap.get('id'); 
    if(this.uid){
      this.getInvestorOfferList(this.uid)
    }else{
      this.getAllOfferList()

    }

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
    //  get All Investor List From Firbase
    getAllOfferList(){ 
      this.afs.collection('OFFER').valueChanges({ idField: 'id' }).subscribe((data)=>{
        this.offersData = data;
      console.log(this.offers,"investor")

        this.offersData.forEach(value => {
          var date =  this.datePipe.transform(value.date.toDate(),"medium");
            console.log(date)
            this.offers.push({
              amount:value.amount,
              duration:value.duration,
              profit:value.profit,
              type:value.type,
              date:value.date,
            })
          });
      console.log(this.offers,"investor")

      });
    }
  getInvestorOfferList(uid){
    this.afs.collection('INVESTORS').doc(uid).valueChanges({ idField: 'id' }).subscribe((data)=>{ // basic  deatils 
      this.investors = data;
      this.fullName = this.investors.fullName
    });
    this.afs.collection('OFFER', ref => ref.where('uid', '==', uid)).valueChanges({ idField: 'id' }).subscribe((data)=>{
      this.offersData = data;
      this.offersData.forEach(value => {
        var date =  this.datePipe.transform(value.date.toDate(),"medium");
          console.log(date)
          this.offers.push({
            amount:value.amount,
            duration:value.duration,
            profit:value.profit,
            type:value.type,
            date:value.date,
         
          })
        });
     
      console.log(this.offers,"investor")
    });
  }
  delete(doc_id){
    this.afs.collection('OFFER').doc(doc_id).delete();
    this.toastr.success('success', 'Offer Deleted Successfully', {
      timeOut: 3000,
    });
  }
  Update(doc_id){
    this.afs.collection('OFFER').doc(doc_id).set({
    });
    this.toastr.success('success', 'Offer Deleted Successfully', {
      timeOut: 3000,
    });
  }
}
