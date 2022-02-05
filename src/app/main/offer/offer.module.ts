import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CoreCommonModule } from '@core/common.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {NgxPaginationModule} from 'ngx-pagination';
import { CreateofferComponent} from './createoffer/createoffer.component'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { DatePipe } from '@angular/common';
import {ToastrModule} from 'ngx-toastr';
import { OfferlistComponent } from './offerlist/offerlist.component'
import { Angular2CsvModule } from 'angular2-csv';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
const routes = [
  {
    path: 'createoffer',
    component: CreateofferComponent,
    data: { animation: 'createoffer' }
  },
  {
    path: 'createoffer/:id',
    component: CreateofferComponent,
    data: { animation: 'createoffer' }
  },
  {
    path: 'offerlist',
    component: OfferlistComponent,
    data: { animation: 'offerlist' }
  },
  {
    path: 'offerlist/:id',
    component: OfferlistComponent,
    data: { animation: 'offerlist' }
  }
];
@NgModule({
  declarations: [
    CreateofferComponent,
    OfferlistComponent
  ],
  imports: [
    HttpClientModule,
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
  providers: [
    DatePipe,
  ],
  exports: [CreateofferComponent,OfferlistComponent]
})
export class OfferModule { }
