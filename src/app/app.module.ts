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
import { SampleModule } from 'app/main/sample/sample.module';
import {InvestorModule} from 'app/main/investor/investor.module'
import {PortfolioModule} from 'app/main/portfolio/portfolio.module'
import {TransactionModule} from 'app/main/transaction/transaction.module'
import { VisitorModule } from './main/visitor/visitor.module';
import { OfferModule } from './main/offer/offer.module'

import { AngularFireModule } from "@angular/fire/compat";
// import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxDatatableModule } from '@tusharghoshbd/ngx-datatable';
import {AngularFireStorageModule, AngularFireStorageReference, AngularFireUploadTask,// StorageBucket 
} from "@angular/fire/compat/storage";
import 'firebase/storage';
import { environment } from "../environments/environment";
// import { CreateofferComponent } from './main/offer/createoffer/createoffer.component';
// import {ToastrModule} from 'ngx-toastr'

const appRoutes: Routes = [
  {
    path: 'pages',
    loadChildren: () => import('./main/pages/pages.module').then(m => m.PagesModule)
  },
  
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
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
    path: '**',
    redirectTo: '/pages/miscellaneous/error' //Error 404 - Page not found
  }
];

@NgModule({
  declarations: [AppComponent],
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
    // Core modules
    CoreModule.forRoot(coreConfig),
    CoreCommonModule,
    CoreSidebarModule,
    CoreThemeCustomizerModule,
    // firebase
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    // App modules
    LayoutModule,
    SampleModule,
    InvestorModule,
    PortfolioModule,
    TransactionModule,
    VisitorModule
  ],

  bootstrap: [AppComponent]
})
export class AppModule {}
