import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionlistComponent } from './transactionlist/transactionlist.component';

import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CoreCommonModule } from '@core/common.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {NgxPaginationModule} from 'ngx-pagination';
import { Angular2CsvModule } from 'angular2-csv';
import {Ng2SearchPipeModule} from 'ng2-search-filter'
import { NgxSpinnerModule } from 'ngx-spinner';
const routes = [
  {
    path: 'transactionlist',
    component: TransactionlistComponent,
    data: { animation: 'transactionlist' }
  },
];


@NgModule({
  declarations: [
    TransactionlistComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    ContentHeaderModule,
    TranslateModule,
    CoreCommonModule,
    NgxDatatableModule,
    NgxPaginationModule,
    NgbModule,
    Angular2CsvModule,
    Ng2SearchPipeModule,NgxSpinnerModule
  ],
  exports: [TransactionlistComponent]
})
export class TransactionModule { }
