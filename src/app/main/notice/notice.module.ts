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
import { CreatenoticeComponent } from './createnotice/createnotice.component';
import { NoticelistComponent } from './noticelist/noticelist.component'

const routes = [
  {
    path: 'createnotice',
    component: CreatenoticeComponent,
    data: { animation: 'createnotice' }
  },
  {
    path: 'noticelist',
    component: NoticelistComponent,
    data: { animation: 'noticelist' }
  },
];

@NgModule({
  declarations: [
    CreatenoticeComponent,
    NoticelistComponent
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
    ToastrModule
  ],
  exports: [CreatenoticeComponent,NoticelistComponent]

})
export class NoticeModule { }
