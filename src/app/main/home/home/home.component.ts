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

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public contentHeader: object

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
  }

}
