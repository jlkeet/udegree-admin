import { NgModule } from '@angular/core';
import { NbActionsModule, NbCardModule, NbSearchModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';

import { PlansRoutingModule, routedComponents } from './plans-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@NgModule({
  imports: [
    NbCardModule,
    ThemeModule,
    PlansRoutingModule,
    NbSearchModule,
    NbActionsModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatInputModule,
    MatTableModule,
    MatDialogModule,
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class PlansModule { }
