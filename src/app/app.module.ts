import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import 'hammerjs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr'; // For auth after login toast

import { CoreModule } from '@core/core.module';
import { CoreCommonModule } from '@core/common.module';
import { CoreSidebarModule, CoreThemeCustomizerModule } from '@core/components';
import { coreConfig } from 'app/app-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import {HomeModule} from './main/home/home.module'
import {InvestorModule} from 'app/main/investor/investor.module'
import {PortfolioModule} from 'app/main/portfolio/portfolio.module'
import {TransactionModule} from 'app/main/transaction/transaction.module'
import { VisitorModule } from './main/visitor/visitor.module';
import { OfferModule } from './main/offer/offer.module'
import { NoticeModule } from './main/notice/notice.module';
import { PayoutModule } from './main/payout/payout.module';
import { SupportModule} from './main/support/support.module';
import {AuthenticationModule } from './main/pages/authentication/authentication.module'
import {  ReferralModule} from './main/referral/referral.module'
import { AngularFireModule } from "@angular/fire/compat";
import { NgxDatatableModule } from '@tusharghoshbd/ngx-datatable';
import {AngularFireStorageModule, AngularFireStorageReference, AngularFireUploadTask, } from "@angular/fire/compat/storage";
import { Angular2CsvModule } from 'angular2-csv';
import 'firebase/storage';
import { environment } from "../environments/environment";
import { SearchPipe } from './search.pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
const appRoutes: Routes = [
  {
    path: 'pages',
    loadChildren: () => import('./main/pages/pages.module').then(m => m.PagesModule)
  },
  {
    path: '',
    redirectTo: '/adminlogin',
    pathMatch: 'full'
  },
    
  {
    path: 'adminlogin',
    loadChildren: () => import('./main/pages/authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./main/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'investor',
    loadChildren: () => import('./main/investor/investor.module').then(m => m.InvestorModule)
  },
  {
    path: 'portfolio',
    loadChildren: () => import('./main/portfolio/portfolio.module').then(m => m.PortfolioModule)
  },
  {
    path: 'transaction',
    loadChildren: () => import('./main/transaction/transaction.module').then(m => m.TransactionModule)
  },
  {
    path: 'visitor',
    loadChildren: () => import('./main/visitor/visitor.module').then(m => m.VisitorModule)
  },
  {
    path: 'offer',
    loadChildren: () => import('./main/offer/offer.module').then(m => m.OfferModule)
  },
  {
    path: 'notice',
    loadChildren: () => import('./main/notice/notice.module').then(m => m.NoticeModule)
  },
  {
    path: 'referral',
    loadChildren: () => import('./main/referral/referral.module').then(m => m.ReferralModule)
  },
  {
    path: 'payout',
    loadChildren: () => import('./main/payout/payout.module').then(m => m.PayoutModule)
  },
  {
    path: 'support',
    loadChildren: () => import('./main/support/support.module').then(m => m.SupportModule)
  },
  {
    path: '**',
    redirectTo: '/pages/miscellaneous/error' //Error 404 - Page not found
  }
];

@NgModule({
  declarations: [AppComponent, SearchPipe],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, {
      scrollPositionRestoration: 'enabled', // Add options right here
      relativeLinkResolution: 'legacy'
    }),
    TranslateModule.forRoot(),

    //NgBootstrap
    NgbModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      // positionClass: 'toast-bottom-right'
    }),
    NgxDatatableModule,
    Angular2CsvModule,
    // Core modules
    CoreModule.forRoot(coreConfig),
    CoreCommonModule,
    CoreSidebarModule,
    CoreThemeCustomizerModule,
    Ng2SearchPipeModule,
    // firebase
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    // App modules
    LayoutModule,
    InvestorModule,
    PortfolioModule,
    TransactionModule,
    VisitorModule,
    OfferModule,
    NoticeModule,
    ReferralModule,
    HomeModule,
    SupportModule,
    AuthenticationModule,
    PayoutModule
  ],

  bootstrap: [AppComponent]
})
export class AppModule {}
