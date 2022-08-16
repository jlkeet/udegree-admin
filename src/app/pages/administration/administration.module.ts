import { NgModule } from '@angular/core';
import { NbActionsModule, NbCardModule, NbSearchModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { ManageUsersComponent } from './manage-users.component';

import { AdministrationRoutingModule, routedComponents } from './administration-routing.module';

@NgModule({
  imports: [
    NbCardModule,
    ThemeModule,
    AdministrationRoutingModule,
    NbSearchModule,
    NbActionsModule
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class AdministrationModule { }
