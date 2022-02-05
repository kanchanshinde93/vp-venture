import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CoreCommonModule } from '@core/common.module';

import { AuthLoginV2Component } from 'app/main/pages/authentication/auth-login-v2/auth-login-v2.component';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import * as firebase from 'firebase/app';
import { environment } from "../../../../environments/environment";

firebase.initializeApp(environment.firebase);

// routing
const routes: Routes = [
  {
    path: 'adminlogin',
    component: AuthLoginV2Component,
    data: { animation: 'adminlogin' }
  }
];

@NgModule({
  declarations: [AuthLoginV2Component],
  imports: [CommonModule, RouterModule.forChild(routes), NgbModule, FormsModule, ReactiveFormsModule, CoreCommonModule,
    AngularFireAuthModule,
    
  
  ]
})
export class AuthenticationModule {}
