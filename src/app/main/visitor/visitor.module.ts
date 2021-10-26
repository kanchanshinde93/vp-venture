import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisitorlistComponent } from './visitorlist/visitorlist.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CoreCommonModule } from '@core/common.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {NgxPaginationModule} from 'ngx-pagination';
const routes = [
  {
    path: 'visitorlist',
    component: VisitorlistComponent,
    data: { animation: 'visitorlist' }
  },

];

@NgModule({
  declarations: [
    VisitorlistComponent
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
  exports: [VisitorlistComponent]
})
export class VisitorModule { }
