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
  referralsData:any;
  ReferralQuerySubscription:any;
  RefferedByInvestorDetails:any
  RefferedQuerySubscription:any
  // pagination
  page = 1;
  count = 0;
  pageSize = 5;
  pageSizes = [5, 10, 15];
  config:any
  constructor(public afs: AngularFirestore, private store: AngularFireStorage,config: NgbModalConfig,private modalService: NgbModal,public toastr: ToastrService, private activerouter: ActivatedRoute) { 
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
        
        let ReferralQuery= (this.afs.collection('REFERRAL').get());
        this.ReferralQuerySubscription = ReferralQuery.subscribe(ReferralQueryData => {
          ReferralQueryData.forEach((RefferalDocuments) => { 
            console.log("document id  : " + RefferalDocuments.id);
            this.afs.collection('REFERRAL').doc(RefferalDocuments.id).collection('Data').get().subscribe((RefferedByInvestorDocId) => { 
              RefferedByInvestorDocId.forEach((RefferedByInvestorDocuments) => { 
              this.afs.collection('INVESTORS',  ref => ref.where('phone', '==', RefferalDocuments.id)).valueChanges().subscribe(RefferedByInvestorDetails=>{
                this.RefferedByInvestorDetails = RefferedByInvestorDetails
                console.log("Reffered By data  : ", this.RefferedByInvestorDetails);
                // console.log() 
                // this.investors.push({
                //   refferedbyname: this.RefferedByInvestorDetails.fullName,
                //   refferedbyphone: this.RefferedByInvestorDetails.phone
                // })              
                });
              });
            });

            let RefferedQuery =  (this.afs.collection('REFERRAL').doc(RefferalDocuments.id).collection('Data').get());
            this.RefferedQuerySubscription = RefferedQuery.subscribe((InvestorRawData) => {
                InvestorRawData.forEach((InvestorDocuments) => {
                  this.afs.collection('INVESTORS').doc(InvestorDocuments.id).valueChanges().subscribe((InvestorDetails)=>{
                    this.referrals = InvestorDetails
                  });
                  this.RefferedByInvestorDetails.forEach((key) => {
                    key["referralsfullName"] = this.referrals.fullName
                  })
                  this.referralsData =  this.RefferedByInvestorDetails
                  console.log(this.referralsData, "referralsData");
                });
                this.RefferedQuerySubscription.unsubscribe();
              });
            });
            
          this.ReferralQuerySubscription.unsubscribe();
        });

        
        // this.afs.collection("REFERRAL").get().subscribe((querySnapshot) => {
        //   querySnapshot.forEach((RefferalDocuments) => {
        //     console.log("document id  : " + RefferalDocuments.id);
        //     this.afs.collection('INVESTORS',  ref => ref.where('phone', '==', RefferalDocuments.id)).valueChanges().subscribe((InvestorDetails)=>{
        //       console.log("Reffered By data  : ");
        //       console.log(InvestorDetails);                 
        //     });
        //     this.afs.collection('REFERRAL').doc(RefferalDocuments.id).collection('Data').get().subscribe((InvestorRawData) => {
        //       InvestorRawData.forEach((InvestorDocuments) => {
        //         console.log("Investor id  : " + InvestorDocuments.id);
        //         this.afs.collection('INVESTORS').doc(InvestorDocuments.id).valueChanges().subscribe((InvestorDetails)=>{
        //           console.log("Investor data  : ");
        //           console.log(InvestorDetails);                 
        //         });
        //       });
        //     });
        //   });
        // });




        // this.afs.collection("REFERRAL").get().subscribe((querySnapshot) => {
        //   this.investors = [];
        //   querySnapshot.forEach((doc) => {
        //       this.afs.collection('REFERRAL').doc(doc.id).collection('Data').get().subscribe((data) => {
        //         data.forEach((docresult) => {
        //           console.log(`${docresult.id} => ${docresult.data()}`);
        //           this.afs.collection('INVESTORS').doc(docresult.id).valueChanges().subscribe((result)=>{ 
        //             this.referrals = result;
        //             console.log(this.referrals, "referrals")
        //           });
        //         });
        //       });
        //       console.log(`${doc.id} => ${doc.data()}`);              
        //       this.afs.collection('INVESTORS', ref => ref.where('phone', '==', doc.id)).valueChanges().subscribe((result)=>{ 
        //         this.investors = [];
        //         this.investors = result;
        //         console.log(this.investors, "investors")
        //       });
        //     });
        // });
      }
}
