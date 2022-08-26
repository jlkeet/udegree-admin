import { NgModule } from '@angular/core';
import { NbActionsModule, NbCardModule, NbSearchModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';

import { AdministrationRoutingModule, routedComponents } from './administration-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [
    NbCardModule,
    ThemeModule,
    AdministrationRoutingModule,
    NbSearchModule,
    NbActionsModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatInputModule
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class AdministrationModule { }
