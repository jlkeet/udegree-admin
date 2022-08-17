import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdministrationComponent } from './administration.component';
import { ManageUsersComponent } from './users/manage-users.component';

const routes: Routes = [{
  path: '',
  component: AdministrationComponent,
  children: [{
    path: 'manage-users',
    component: ManageUsersComponent,
  }
],
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministrationRoutingModule { }

export const routedComponents = [
    AdministrationComponent,
    ManageUsersComponent
];
