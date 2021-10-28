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
  selector: 'app-noticelist',
  templateUrl: './noticelist.component.html',
  styleUrls: ['./noticelist.component.scss']
})
export class NoticelistComponent implements OnInit {
  public contentHeader: object
  notices:any
  length:number
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
    headers: ['Notice Title'],
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
        headerTitle: 'Notice List',
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
              name: 'Notice',
              isLink: true,
              link: '/'
            },
            {
              name: 'Notice List',
              isLink: false
            }
          ]
        }
      };
      this.getAllNoticeList()
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
getAllNoticeList(){ 
  this.afs.collection('NOTICE').valueChanges().subscribe((data)=>{
    this.notices = data;
    this.length = this.notices.length;
    console.log(this.notices)
  });
}
delete(doc_id){
  this.afs.collection('NOTICE').doc(doc_id).delete();
  this.toastr.success('success', 'Notice Deleted Successfully', {
    timeOut: 3000,
  });
}
Update(doc_id){
  this.afs.collection('NOTICE').doc(doc_id).set({
  });
  this.toastr.success('success', 'Notice Deleted Successfully', {
    timeOut: 3000,
  });
}

}
