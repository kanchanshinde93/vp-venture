import { Component, OnInit, ViewChild,Input } from '@angular/core';
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap'; // angular bootsrap modal
import { Validators, FormGroup, FormControl } from '@angular/forms';
import {ToastrService} from 'ngx-toastr'
import * as firebase from "firebase/compat/app";
import { AngularFireDatabase } from '@angular/fire/compat/database'
import { map } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';
import { DatePipe } from '@angular/common'

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
  constructor(public afs: AngularFirestore,public datepipe: DatePipe, private store: AngularFireStorage,config: NgbModalConfig,private modalService: NgbModal,public toastr: ToastrService,public db: AngularFireDatabase) { 
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
    this.form = new FormGroup({ // Login Form Input Field
      amount: new FormControl('', [Validators.required]),
      profit: new FormControl('', [Validators.required]),
      duration: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
    });
       

  }
  onSubmit() {
    console.log(this.form.value['date'], "form date")
   this.date =  this.datepipe.transform(this.form.value["date"], 'dd-MM-YYYY');
   console.log(this.date, "convert")
    const docid  = this.afs.createId();
    this.afs.collection('OFFER').doc(docid).set({ 
      offerId :docid,
      amount: this.form.value["amount"],
      profit: this.form.value["profit"],
      duration: this.form.value["duration"],
      type:0,
      uid:"",
      date: this.date
    });
    this.Offers =  this.afs.collection('OFFER').doc(docid).snapshotChanges().subscribe((data)=>{ // bank details
      this.Offers = data;
    }); 
    console.log(this.Offers)
    if(this.Offers){
      this.toastr.success('success', 'Offer Created Successfully', {
        timeOut: 3000,
      });
      setTimeout(()=>{      //<<<---using ()=> syntax
         window.location.reload();
      }, 3000);
    }
  

    // this.Offers = this.afs.collection("OFFER") .snapshotChanges().pipe( map( actions.map( a => 
    //   { 
    //       const data = a.payload.doc.data(); 
    //       const id = a.payload.doc.id; 
    //       return {id, ...data}
    //   })))
      
     

//       return this.db.list('/products').snapshotChanges().pipe(
//   map((products: any[]) => products.map(prod => {
//     const payload = prod.payload.val();
//     const key = prod.key;
//     return <any>{ key, ...payload };
//   })),
// );
    // console.log(this.Offers)
    // if(!this.Offers){
    //   this.toastr.success('everything is broken', 'Major Error', {
    //     timeOut: 3000,
    //   });
    // }
 

  }
  onSubmits(){
    const docid  = this.afs.createId();
    this.Offers = this.db.list("OFFER/"+docid);
    this.db.list("OFFER").push({  
      offerId :docid,
      amount: this.form.value["amount"],
      profit: this.form.value["profit"],
      duration: this.form.value["duration"],
      type:0,
      uid:"",
      date:firebase.default.firestore.FieldValue.serverTimestamp(),
     }).then((resp)=>{
      console.log(resp,"shkfd")
     }).catch((error) =>{
      console.log(error,"err")
     });

  }
//   getByTypeData(type: string, ignoreApi = false): Observable<stringMap<any>> {
//     if (ignoreApi) {
//         return this.handleConfig(type);
//     }
//     return this.getByType(type).pipe(
//         switchMap(response => {
//             const config = response.result ? response.data : {};
//             return this.handleConfig(type, config);
//         })
//     );
// }

//   showSuccess(){
//     this.toastr.success('everything is broken', 'Major Error', {
//    timeOut: 3000,
//  });
//    }
}
