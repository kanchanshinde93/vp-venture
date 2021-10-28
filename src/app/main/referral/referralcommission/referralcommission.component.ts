import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap'; // angular bootsrap modal
import { Validators, FormGroup, FormControl } from '@angular/forms';
import {ToastrService} from 'ngx-toastr'
import { AngularFireDatabase } from '@angular/fire/compat/database'
import { Router } from '@angular/router';


@Component({
  selector: 'app-referralcommission',
  templateUrl: './referralcommission.component.html',
  styleUrls: ['./referralcommission.component.scss']
})
export class ReferralcommissionComponent implements OnInit {
  public contentHeader: object
  form: FormGroup;
  commission:any
  date:any
  rawData:any;
  amount:any
  ReferralCommissionQuery:any
  commissiondata:any =[];
  commissionId:any
  constructor(public afs: AngularFirestore,private router: Router, private store: AngularFireStorage,config: NgbModalConfig,private modalService: NgbModal,public toastr: ToastrService,public db: AngularFireDatabase) { 
  }

  ngOnInit(): void {
     // header content 
     this.contentHeader = {
      headerTitle: 'Create Referral Commission',
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
            name: 'Create Referral Commission',
            isLink: false
          }
        ]
      }
    };
   
    let CommissionQuery= (this.afs.collection('REFERRALCOMMISSION').get());
    this.ReferralCommissionQuery = CommissionQuery.subscribe(ReferralQueryData => {
      ReferralQueryData.forEach((RefferalDocuments) => { 
        // console.log( RefferalDocuments.exists)
        if(RefferalDocuments.exists == true){
          this.commission =  this.afs.collection('REFERRALCOMMISSION').doc(RefferalDocuments.id).valueChanges().subscribe((data)=>{ // bank details
            this.commission  = data;
              if(this.commission){
                this.amount = this.commission.amount
                this.commissionId = this.commission.commissionId
                this.form = new FormGroup({ // Login Form Input Field
                  amount: new FormControl(this.commission.amount, [Validators.required]),
                });
              }else{
                this.form = new FormGroup({ // Login Form Input Field
                  amount: new FormControl('', [Validators.required]),
                });
              }
          });
        }else{
          this.form = new FormGroup({ // Login Form Input Field
            amount: new FormControl('', [Validators.required]),
          });
        }
      });
      this.ReferralCommissionQuery.unsubscribe();
    });
    
    this.form = new FormGroup({ // Login Form Input Field
     amount: new FormControl('', [Validators.required]),
    });
    
  }
  onSubmit() {
    if(!this.commissionId){
      const docid  = this.afs.createId();
      this.commissionId = docid
    }
    this.afs.collection('REFERRALCOMMISSION').doc(this.commissionId).set({ 
      commissionId :this.commissionId,
      amount: this.form.value["amount"],
    });
    this.commission =  this.afs.collection('REFERRALCOMMISSION').doc(this.commissionId).snapshotChanges().subscribe((data)=>{ // bank details
      this.commission  = data;
    }); 
  
    if(this.commission){
      this.toastr.success('success', 'Referral Commission updated Successfully', {
        timeOut: 3000,
      });
      setTimeout(()=>{      //<<<---using ()=> syntax
         window.location.reload();
      }, 3000);
      this.router.navigate(['/referral/createreferral']);

    }
  }
}
