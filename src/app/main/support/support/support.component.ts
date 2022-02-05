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
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {
  public contentHeader: object
  supports:any = []
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
    headers: ['Email','Address', 'Phone'],
    showTitle: false,
    useBom: true,
    removeNewLines: false,
    keys: ['email','address', 'phone']

  };
  constructor(public afs: AngularFirestore, private store: AngularFireStorage,config: NgbModalConfig,private modalService: NgbModal,public toastr: ToastrService) { 
    config.backdrop = 'static';
    config.keyboard = false;
  }
  @ViewChild(DatatableComponent) table: DatatableComponent;

  ngOnInit(): void {
      // header content 
      this.contentHeader = {
        headerTitle: 'Support List',
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
              name: 'Support',
              isLink: true,
              link: '/'
            },
            {
              name: 'Support List',
              isLink: false
            }
          ]
        }
      };
      this.getAllSupportList()
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
  getAllSupportList(){ 
    this.afs.collection('CONFIG').doc('SUPPORT').valueChanges({ idField: 'id' }).subscribe((data)=>{
      this.supports.push(data);
    });
  }

}
