import { Component, OnInit, ViewChild,Input } from '@angular/core';
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap'; // angular bootsrap modal
@Component({
  selector: 'app-investortransactionlist',
  templateUrl: './investortransactionlist.component.html',
  styleUrls: ['./investortransactionlist.component.scss']
})
export class InvestortransactionlistComponent implements OnInit {
  transactionData:any
  public contentHeader: object
  investorData:any;
  fullName:any;
  // pagination
  page = 1;
  count = 0;
  pageSize = 5;
  pageSizes = [5, 10, 15];
  config:any
  @Input() public doc_uid;
  constructor(public afs: AngularFirestore, private store: AngularFireStorage,config: NgbModalConfig,private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.afs.collection('INVESTORS').doc(this.doc_uid).valueChanges({ idField: 'id' }).subscribe((data)=>{ // bank details
      this.investorData = data;
      this.fullName = this.investorData.fullName
    });
    this.afs.collection('INVESTORS').doc(this.doc_uid).collection('TRANSACTION').valueChanges({ idField: 'id' }).subscribe((data)=>{ // bank details
      this.transactionData = data;
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
close(){
  this.modalService.dismissAll();
}
}
