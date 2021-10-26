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
const routes = [
  {
    path: 'investorlist',
    component: InvestorlistComponent,
    data: { animation: 'investorlist' }
  },
];
@NgModule({
  declarations: [
    InvestorlistComponent,
    InvestorportfolioComponent,
    InvestortransactionlistComponent
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
  exports: [InvestorlistComponent]
})
export class InvestorModule { }
