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

@Component({
  selector: 'app-offerlist',
  templateUrl: './offerlist.component.html',
  styleUrls: ['./offerlist.component.scss']
})
export class OfferlistComponent implements OnInit {
  public contentHeader: object
  offers:any
  // pagination
  page = 1;
  count = 0;
  pageSize = 5;
  pageSizes = [5, 10, 15];
  config:any
  constructor(public afs: AngularFirestore, private store: AngularFireStorage,config: NgbModalConfig,private modalService: NgbModal,public toastr: ToastrService) { 
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
    this.getAllOfferList()
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
      this.offers = data;
      console.log(this.offers)
    });
  }
  delete(doc_id){
    this.afs.collection('OFFER').doc(doc_id).delete();
    this.toastr.success('success', 'Offer Deleted Successfully', {
      timeOut: 3000,
    });
  }
  // Update(doc_id){
  //   this.afs.collection('OFFER').doc(doc_id).set({

  //   });
  //   this.toastr.success('success', 'Offer Deleted Successfully', {
  //     timeOut: 3000,
  //   });
  // }
}
