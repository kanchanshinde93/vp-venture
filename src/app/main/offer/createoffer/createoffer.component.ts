import { Component, OnInit, ViewChild,Input } from '@angular/core';
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap'; // angular bootsrap modal
import { Validators, FormGroup, FormControl } from '@angular/forms';
import {ToastrService} from 'ngx-toastr'
import { AngularFireDatabase } from '@angular/fire/compat/database'
import { DatePipe } from '@angular/common'
import {ActivatedRoute} from "@angular/router"
// import { OneSignalService } from 'onesignal-ngx';
// import {OnesignalService} from 'app/service/onesignal.service'
import { OnesignalService} from '../../../service/onesignal.service'

@Component({
  selector: 'app-createoffer',
  templateUrl: './createoffer.component.html',
  styleUrls: ['./createoffer.component.scss']
})
export class CreateofferComponent implements OnInit {
  public contentHeader: object
  form: FormGroup;
  Offers:any
  date:any
  rawData:any;
  uid:any
  result:any;
  constructor(public afs: AngularFirestore,public datepipe: DatePipe,public OneService: OnesignalService, private store: AngularFireStorage,config: NgbModalConfig,private modalService: NgbModal,public toastr: ToastrService,public db: AngularFireDatabase, private activerouter: ActivatedRoute) { 
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
    this.uid  = this.activerouter.snapshot.paramMap.get('id'); 

    this.form = new FormGroup({ // Login Form Input Field
      amount: new FormControl('', [Validators.required]),
      profit: new FormControl('', [Validators.required]),
      duration: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      uid :new FormControl(this.uid, [Validators.required])
    });
  }
  onSubmit() {
    console.log(this.form.value);
   this.date=this.form.value['date'];
    let myDateTemp = new Date(this.date);
    const docid  = this.afs.createId();
    this.afs.collection('OFFER').doc(docid).set({ 
      offerId :docid,
      amount: this.form.value["amount"],
      profit: this.form.value["profit"],
      duration: this.form.value["duration"],
      type:0,
      uid: this.form.value['uid'],
      date: myDateTemp
    });
    this.Offers =  this.afs.collection('OFFER').doc(docid).snapshotChanges().subscribe((data)=>{ // bank details
      this.Offers = data;
    }); 
    console.log(this.Offers)
    if(this.Offers){
      this.OneService.onesignal().subscribe(resultData => { // call api 
        this.result = resultData;
          console.log(this.result)
          });
      this.toastr.success('success', 'Offer Created Successfully', {
        timeOut: 100000,
      });
      setTimeout(()=>{      //<<<---using ()=> syntax
         window.location.reload();
      }, 30000);

     
    } 
  }
  // GetAllDetailsofStorebyId(){ // get All Details of Store By Store Id
  //   this.oneSignal.onesignal()
  // }

}
