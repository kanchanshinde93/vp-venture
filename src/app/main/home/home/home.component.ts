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
  constructor(public afs: AngularFirestore,public datepipe: DatePipe,
    private _route: ActivatedRoute,
    private _router: Router, private store: AngularFireStorage,config: NgbModalConfig,private modalService: NgbModal,public toastr: ToastrService,public db: AngularFireDatabase, private activerouter: ActivatedRoute) { 
  }

  ngOnInit(): void {
      // header content 
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
  }


    AllInvestorCount(){
      this.afs.collection('INVESTORS').valueChanges({ idField: 'id' }).subscribe((data)=>{
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
}
