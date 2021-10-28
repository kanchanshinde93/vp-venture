import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CoreCommonModule } from '@core/common.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { InvestorlistComponent } from './investorlist/investorlist.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {NgxPaginationModule} from 'ngx-pagination';
import { InvestorportfolioComponent } from './investorportfolio/investorportfolio.component';
import { InvestortransactionlistComponent } from './investortransactionlist/investortransactionlist.component';

import { DatePipe } from '@angular/common';
import { ActiveinvestorlistComponent } from './activeinvestorlist/activeinvestorlist.component';
const routes = [
  {
    path: 'investorlist',
    component: InvestorlistComponent,
    data: { animation: 'investorlist' }
  },

  {
    path: 'acitveinvestorlist',
    component: ActiveinvestorlistComponent,
    data: { animation: 'acitveinvestorlist' }
  },

];
@NgModule({
  declarations: [
    InvestorlistComponent,
    InvestorportfolioComponent,
    InvestortransactionlistComponent,
    ActiveinvestorlistComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    ContentHeaderModule,
    TranslateModule,
    CoreCommonModule,
    NgxDatatableModule,
    NgxPaginationModule,
    NgbModule
  ],
  providers: [
    DatePipe,
  ],
  exports: [InvestorlistComponent, ActiveinvestorlistComponent]
})
export class InvestorModule { }
