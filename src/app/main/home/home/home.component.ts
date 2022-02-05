import { Component, OnInit, ViewChild,Input } from '@angular/core';
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap'; // angular bootsrap modal
import { Validators, FormGroup, FormControl } from '@angular/forms';
import {ToastrService} from 'ngx-toastr'
import { AngularFireDatabase } from '@angular/fire/compat/database'
import { DatePipe } from '@angular/common'
import {ActivatedRoute} from "@angular/router"
import { Router } from '@angular/router';
import { forEach,sum} from 'lodash';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public contentHeader: object
  investors:any
  investorsCount:any;
  activeinvestorsCount:any
  portfolios:any
  portfoliosdata:any= [];
  portfoliosCount:any
  transactions:any
  transactionsCount:any
  TotalInvestment:any
  withdraw:any
  withdrawCount:any
  completewithdraw:any
  completewithdrawCount:any
  pendingwithdraw:any
  pendingwithdrawCount:any
  referrals:any
referralsCount:any
public load = false;
show = false;
fullScreen = true;
template = ``
  constructor(public afs: AngularFirestore,public datepipe: DatePipe,
    private _route: ActivatedRoute,
    private _router: Router, private store: AngularFireStorage,config: NgbModalConfig,private modalService: NgbModal,public toastr: ToastrService,public db: AngularFireDatabase, private activerouter: ActivatedRoute,private spinner: NgxSpinnerService) { 
  }

  ngOnInit(): void {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);

       this.contentHeader = {
        headerTitle: 'Create Offer',
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
              name: 'Offer',
              isLink: true,
              link: '/'
            },
            {
              name: 'Create Offer',
              isLink: false
            }
          ]
        }
      };
      console.log(localStorage.getItem('loggedIn'));
      if(localStorage.getItem('loggedIn') === 'true'){
        this._router.navigate(['/home']);
      }else{
        this._router.navigate(['/adminlogin']);
      }
      this.AllInvestorCount()
      this.getAllActiveInvestorsList()
      this.getAllPortfoliosList()
      this.getAllTransactionList()
      this.getAllPayoutList()
      this.getReferralsList()
      this.getCompletePayoutList()
      this.getPendingPayoutList()
      
  }


    AllInvestorCount(){
      this.show = true;
      this.fullScreen = true;
      this.template =``
      this.afs.collection('INVESTORS').valueChanges({ idField: 'id' }).subscribe((data)=>{
        setTimeout(() => {
          this.show = false;
      }, 4000);
       this.investors = data;
        this.investorsCount = data.length
      });
    }

    getAllActiveInvestorsList(){ 
      this.afs.collection('INVESTORS', ref => ref.where('type', '==', 1)).valueChanges({ idField: 'id' }).subscribe((data)=>{
        this.investors = data;
        this.activeinvestorsCount = data.length
        
      });
    }

    getAllPortfoliosList(){ 
      
      this.afs.collectionGroup('PORTFOLIO').valueChanges({ idField: 'id' }).subscribe((data)=>{
        this.portfolios = data;
        this.portfoliosdata = data
        this.portfoliosCount = data.length
        let amounttotal = [];
        forEach(this.portfoliosdata,value => {
         
          amounttotal.push(value.amount);
        });
        // console.log(sum(amounttotal));
        this.TotalInvestment = sum(amounttotal)
      });
    }

    getAllTransactionList(){ 
      this.afs.collectionGroup('TRANSACTION').valueChanges({ idField: 'id' }).subscribe((data)=>{
        this.transactions = data;
        // console.log(data)
        this.transactionsCount = data.length
      });
    }

    getAllPayoutList(){ 
      this.afs.collectionGroup('WITHDRAW').valueChanges({ idField: 'id' }).subscribe((data)=>{
        this.withdraw = data;
        // console.log(data)
        this.withdrawCount = data.length
      });
    }

    getCompletePayoutList(){ 
      this.afs.collectionGroup('WITHDRAW', ref => ref.where('status', '==', 2)).valueChanges({ idField: 'id' }).subscribe((data)=>{
        this.completewithdraw = data;
        // console.log(data)
        this.completewithdrawCount = data.length
      });
    }

    getPendingPayoutList(){ 
      this.afs.collectionGroup('WITHDRAW', ref => ref.where('status', '==', 1)).valueChanges({ idField: 'id' }).subscribe((data)=>{
        this.pendingwithdraw = data;
         console.log(data)
        this.pendingwithdrawCount = data.length
      });
    }
    getReferralsList(){ 
      this.afs.collectionGroup('Data').valueChanges({ idField: 'id' }).subscribe((data)=>{
        this.referrals = data;
        // console.log(data , "REFERRAL")
        this.referralsCount = data.length
      });
    }
}
