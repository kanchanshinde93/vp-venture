import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap'; // angular bootsrap modal
import { Validators, UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import {ToastrService} from 'ngx-toastr'
import { AngularFireDatabase } from '@angular/fire/compat/database'
import { Router } from '@angular/router';
import {ActivatedRoute} from "@angular/router"
@Component({
  selector: 'app-createnotice',
  templateUrl: './createnotice.component.html',
  styleUrls: ['./createnotice.component.scss']
})
export class CreatenoticeComponent implements OnInit {
  public contentHeader: object
  form: UntypedFormGroup;
  Offers:any
  notices:any
  date:any
  rawData:any;
  noticeId:any
  constructor(public afs: AngularFirestore, private activerouter: ActivatedRoute,private router: Router, private store: AngularFireStorage,config: NgbModalConfig,private modalService: NgbModal,public toastr: ToastrService,public db: AngularFireDatabase) { 
  }
  ngOnInit(): void {
    // header content 
    this.contentHeader = {
      headerTitle: 'Create Notice',
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
            name: 'Notice',
            isLink: true,
            link: '/'
          },
          {
            name: 'Create Notice',
            isLink: false
          }
        ]
      }
    };
    this.noticeId  = this.activerouter.snapshot.paramMap.get('id'); 
    if(this.noticeId){
      this.afs.collection('NOTICE').doc(this.noticeId).valueChanges().subscribe((data)=>{
        this.notices = data;
        this.form = new UntypedFormGroup({ // Login Form Input Field
          title: new UntypedFormControl(this.notices.title, [Validators.required]),
        });
      });
    }
    this.form = new UntypedFormGroup({ // Login Form Input Field
      title: new UntypedFormControl('', [Validators.required]),
    });
  }
  onSubmit() {
    if(!this.noticeId){
      this.noticeId  = this.afs.createId();
    }
    this.afs.collection('NOTICE').doc(this.noticeId).set({ 
      noticeId :this.noticeId,
      title: this.form.value["title"],
    });
    this.Offers =  this.afs.collection('NOTICE').doc(this.noticeId).snapshotChanges().subscribe((data)=>{ // bank details
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
      this.router.navigate(['/notice/noticelist']);

    }
  }
}
