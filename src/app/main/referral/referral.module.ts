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
import { DatePipe } from '@angular/common';
import {ToastrModule} from 'ngx-toastr';
import { ReferrallistComponent } from './referrallist/referrallist.component';
import { ReferralcommissionComponent } from './referralcommission/referralcommission.component';
import { Angular2CsvModule } from 'angular2-csv';
import {Ng2SearchPipeModule} from 'ng2-search-filter'
const routes = [
  {
    path: 'createreferral',
    component: ReferralcommissionComponent,
    data: { animation: 'createreferral' }
  },
  {
    path: 'referrallist',
    component: ReferrallistComponent,
    data: { animation: 'referrallist' }
  },
];
@NgModule({
  declarations: [
    ReferrallistComponent,
    ReferralcommissionComponent
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
    Angular2CsvModule,
    Ng2SearchPipeModule
  ],
  exports: [ReferrallistComponent,ReferralcommissionComponent]

})
export class ReferralModule { }
