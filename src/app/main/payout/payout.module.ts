import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CoreCommonModule } from '@core/common.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { AllpayoutlistComponent } from './allpayoutlist/allpayoutlist.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {NgxPaginationModule} from 'ngx-pagination';
import { Angular2CsvModule } from 'angular2-csv';
import { PendingpayoutlistComponent } from './pendingpayoutlist/pendingpayoutlist.component';
import { CompletepayoutlistComponent } from './completepayoutlist/completepayoutlist.component';
import { HttpClientModule } from '@angular/common/http';

const routes = [
  {
    path: 'allpayoutlist',
    component: AllpayoutlistComponent,
    data: { animation: 'allpayoutlist' }
  },

  {
    path: 'pendingpayoutlist',
    component: PendingpayoutlistComponent,
    data: { animation: 'pendingpayoutlist' }
  },
  
  {
    path: 'completepayoutlist',
    component: CompletepayoutlistComponent,
    data: { animation: 'completepayoutlist' }
  },

];

@NgModule({
  declarations: [
    AllpayoutlistComponent,
    PendingpayoutlistComponent,
    CompletepayoutlistComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ContentHeaderModule,
    TranslateModule,
    CoreCommonModule,
    NgxDatatableModule,
    NgxPaginationModule,
    NgbModule,
    Angular2CsvModule,
    HttpClientModule
  ],
  exports: [AllpayoutlistComponent]
})
export class PayoutModule { }
