import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  
    messages: AngularFireList<any>;
   public department;

   public filteredDepts;
  
   constructor(private http: HttpClient, private db: AngularFireDatabase) { }

   /**
     * Get All tickers from firebase
     */
    getMessages() {
    return new Promise(resolve => {
      this.db.list('/').valueChanges().subscribe(result => { resolve(result) });
         })
    }

    public getDepartments() {
      return this.db
      .list("/" + "2" + "/" + "departments_admin" + "/", (ref) =>
        ref.orderByChild("name")
      )
      .valueChanges()
      .subscribe((result) => {this.department = result})
    }

    public departmentsInFaculty(faculty) {
      this.department.filter((department) => {faculty.majors.includes(department.name)})
      return this.filteredDepts = this.department.filter((department) => faculty.name.includes(department.faculties[0]))
    }


//     searchFirebase() {
//     this.db.list('/').query
//     .orderByChild("serie").equalTo("0")
//     .on('value',(data) => {
//     data.forEach((child) => {
//     console.log(child.key, child.val());
//   });
//   })
// }
}

