import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CoreCommonModule } from '@core/common.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {NgxPaginationModule} from 'ngx-pagination';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import {ToastrModule} from 'ngx-toastr';
import { Angular2CsvModule } from 'angular2-csv';

import { SupportComponent } from './support/support.component';

const routes = [

  {
    path: 'supportlist',
    component: SupportComponent,
    data: { animation: 'supportlist' }
  },
];


@NgModule({
  declarations: [
    SupportComponent
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
    ReactiveFormsModule,
    FormsModule,
    ToastrModule,
    Angular2CsvModule

  ],
  exports: [SupportComponent]

})
export class SupportModule { }
