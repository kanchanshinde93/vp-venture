import { Component, OnInit ,ViewChild} from '@angular/core';
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap'; // angular bootsrap modal
import  { Observable } from 'rxjs'
import { map } from 'rxjs/operators';
import { mergeMap } from 'rxjs/operators';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-portfoliolist',
  templateUrl: './portfoliolist.component.html',
  styleUrls: ['./portfoliolist.component.scss']
})
export class PortfoliolistComponent implements OnInit {
  public contentHeader: object
  // basic details
  investors:any ;
  investorList:any = [];
  fullName:any
  email:any
  phone:any
  city:any
  doc_uid:any
  //portfolios
  portfolios:any;
  portfoliosData:any = [];
  finalData:any = [];
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
     let query = this.afs.collectionGroup('PORTFOLIO').valueChanges({ idField: 'id' }).subscribe(data => {
        this.portfolios = data
        this.portfoliosData = [];
        this.portfolios.forEach((value: any) => {
          this.afs.collection('INVESTORS').doc(value.uid).valueChanges().subscribe((result)=>{ 
            this.investors = [];
            this.investors = result;
            this.portfoliosData.push({
              fullName: this.investors.fullName,
              email: this.investors.email,
              phone: this.investors.phone,
              city: this.investors.city,
              id: value.id,
              amount:value.amount,
              locking: value.locking,
              order_id: value.order_id,
              payment_id: value.payment_id,
              profit: value.profit,
              rate: value.rate,
              timestamp: value.timestamp,
              uid: value.uid,
            })
          });

        });
        console.log(this.portfoliosData)

      });
      query.unsubscribe();

    }
}
