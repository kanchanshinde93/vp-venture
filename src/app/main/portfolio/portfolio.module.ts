import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CoreCommonModule } from '@core/common.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { PortfoliolistComponent } from './portfoliolist/portfoliolist.component'
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {NgxPaginationModule} from 'ngx-pagination';
import { Angular2CsvModule } from 'angular2-csv';

const routes = [
  {
    path: 'portfoliolist',
    component: PortfoliolistComponent,
    data: { animation: 'portfoliolist' }
  },

];
@NgModule({
  declarations: [
    PortfoliolistComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    ContentHeaderModule,
    TranslateModule,
    CoreCommonModule,
    NgxDatatableModule,
    NgxPaginationModule,
    NgbModule,
    Angular2CsvModule
  ],
  exports: [PortfoliolistComponent]
})
export class PortfolioModule { }
