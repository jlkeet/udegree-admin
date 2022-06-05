import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditorsComponent } from './editors.component';
// import { TinyMCEComponent } from './tiny-mce/tiny-mce.component';
import { CKEditorComponent } from './ckeditor/ckeditor.component';
import { CourseEditComponent } from './course/course-edit.component';

const routes: Routes = [{
  path: '',
  component: EditorsComponent,
  children: [{
    path: 'course-edit',
    component: CourseEditComponent,
  }, {
    path: 'ckeditor',
    component: CKEditorComponent,
  }
],
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditorsRoutingModule { }

export const routedComponents = [
  EditorsComponent,
  CKEditorComponent,
  CourseEditComponent,
];
