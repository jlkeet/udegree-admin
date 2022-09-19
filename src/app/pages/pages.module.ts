import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { NotificationIconComponent } from './notification-counter/notification-counter.component';
import { UserPlansComponent } from './plans/user-plans/user-plans.component';
import { AuditLogComponent } from './plans/audit-log/audit-log.component';


@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
  ],
  declarations: [
    PagesComponent
  ],
  providers: [
    UserPlansComponent,
    AuditLogComponent,
  ]
})
export class PagesModule {
}
