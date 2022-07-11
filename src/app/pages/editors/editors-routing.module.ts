import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditorsComponent } from './editors.component';
// import { TinyMCEComponent } from './tiny-mce/tiny-mce.component';
import { CKEditorComponent } from './ckeditor/ckeditor.component';
import { CourseEditComponent } from './course/course-edit.component';
import { CourseNewComponent } from './course/course-new.component';
import { DepartmentEditComponent } from './department/department-edit.component';
import { DepartmentNewComponent } from './department/department-new.component';
import { FacultyEditComponent } from './faculties/faculty-edit.component';
import { FacultyNewComponent } from './faculties/faculty-new.component';

const routes: Routes = [{
  path: '',
  component: EditorsComponent,
  children: [{
    path: 'course-edit',
    component: CourseEditComponent,
  },
  {
    path: 'faculty-edit',
    component: FacultyEditComponent,
  },  
  {
    path: 'department-edit',
    component: DepartmentEditComponent,
  }, 
  {
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
  CourseNewComponent,
  DepartmentEditComponent,
  FacultyEditComponent,
  DepartmentNewComponent,
  FacultyNewComponent,

];
