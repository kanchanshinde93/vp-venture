import { Component, OnInit,ViewChild} from '@angular/core';
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap'; // angular bootsrap modal
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-visitorlist',
  templateUrl: './visitorlist.component.html',
  styleUrls: ['./visitorlist.component.scss']
})
export class VisitorlistComponent implements OnInit {
  public contentHeader: object
  visitors:any;
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
    headers: ['Full Name','Email', 'Phone', 'City'],
    showTitle: false,
    useBom: true,
    removeNewLines: false,
    keys: ['fullname','email', 'phone', 'city']
  };
  constructor(public afs: AngularFirestore, private store: AngularFireStorage,config: NgbModalConfig,private modalService: NgbModal,private spinner: NgxSpinnerService) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
  @ViewChild(DatatableComponent) table: DatatableComponent;
  ngOnInit(): void {
     // header content 
     this.contentHeader = {
      headerTitle: 'Visitor List',
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
            name: 'Visitor',
            isLink: true,
            link: '/'
          },
          {
            name: 'Visitor List',
            isLink: false
          }
        ]
      }
    };
   this.getAllVisitorsList()
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

  getAllVisitorsList(){
    this.spinner.show();
    this.afs.collection('LEADS').valueChanges({ idField: 'id' }).subscribe((data)=>{
      this.visitors = data;
      this.spinner.hide();
    });
  }

}
