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
import { NgxSpinnerService } from 'ngx-spinner';
// import { Observable } from 'rxjs';
@Component({
  selector: 'app-referrallist',
  templateUrl: './referrallist.component.html',
  styleUrls: ['./referrallist.component.scss']
})
export class ReferrallistComponent implements OnInit {
  public contentHeader: object
  referrals:any
  uid:any;
  investors=[];
  fullName:any
  referralsData:any =[];
  ReferralQuerySubscription:any;
  ReferredByInvestorDetails:any
  ReferredByInvestor:any;
  ReferredQuerySubscription:any
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
    headers: ['Referral By Name','Referral By Phone', 'Full Name', 'Phone'],
    showTitle: false,
    useBom: true,
    removeNewLines: false,
    keys: ['fullName','phone', 'referralsfullName', 'referralsPhone']

  };
  constructor(public afs: AngularFirestore,private spinner: NgxSpinnerService, private store: AngularFireStorage,config: NgbModalConfig,private modalService: NgbModal,public toastr: ToastrService, private activerouter: ActivatedRoute) { 
    config.backdrop = 'static';
    config.keyboard = false;
  }
  
  @ViewChild(DatatableComponent) table: DatatableComponent;

  ngOnInit(): void {
     // header content 

    this.contentHeader = {
      headerTitle: 'Referral List',
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
            name: 'Referral',
            isLink: true,
            link: '/'
          },
          {
            name: 'Referral List',
            isLink: false
          }
        ]
      }
    };
    this.getAllReferralList()
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
     //  get All Referra List From Firbase
      getAllReferralList(){
        this.referralsData=[];
        this.spinner.show();
        let ReferralQuery= (this.afs.collection('REFERRAL').get());
        this.ReferralQuerySubscription = ReferralQuery.subscribe(ReferralQueryData => {
          ReferralQueryData.forEach((RefferalDocuments) => { 
            console.log(RefferalDocuments.id)
              this.afs.collection('INVESTORS',  ref => ref.where('phone', '==', RefferalDocuments.id)).valueChanges().subscribe(ReferredByInvestorDetails=>{
                  this.ReferredByInvestor = ReferredByInvestorDetails // get Referred By Investor details by Investor phone number
              });
            let ReferredQuery =  (this.afs.collection('REFERRAL').doc(RefferalDocuments.id).collection('Data').get());
            this.ReferredQuerySubscription = ReferredQuery.subscribe((InvestorRawData) => {
                InvestorRawData.forEach((InvestorDocuments) => {
                    this.referrals = InvestorDocuments.data()
                    console.log( this.referrals)
                    this.ReferredByInvestor.forEach((key) => {
                      key["referralsfullName"] = this.referrals.fullName
                      key["referralsPhone"] = this.referrals.phone
                    })
                    this.ReferredByInvestorDetails = this.ReferredByInvestor
                    this.ReferredByInvestorDetails.forEach(element => {
                      this.referralsData.push(
                        {
                          referralsfullName:element.referralsfullName,
                          referralsPhone:element.referralsPhone,
                          fullName:element.fullName,
                          phone:element.phone
                        }
                      )
                    });
                    console.log(this.referralsData, "referralsData");
                });
                this.ReferredQuerySubscription.unsubscribe();
              });
            });
            this.spinner.hide();
          this.ReferralQuerySubscription.unsubscribe();
        });



        
      
      }
}
