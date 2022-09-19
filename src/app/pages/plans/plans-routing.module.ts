import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuditLogComponent } from './audit-log/audit-log.component';

import { PlansComponent } from './plans.component';
import { UserPlansComponent } from './user-plans/user-plans.component'

const routes: Routes = [{
  path: '',
  component: PlansComponent,
  children: [{
    path: 'user-plans',
    component: UserPlansComponent,
  },
  {
    path: 'audit-log',
    component: AuditLogComponent,
  },
],
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlansRoutingModule { }

export const routedComponents = [
    PlansComponent,
    UserPlansComponent,
    AuditLogComponent
];
