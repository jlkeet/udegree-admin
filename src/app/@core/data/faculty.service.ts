import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { DepartmentService } from './department.service';

@Injectable({
  providedIn: 'root',
})
export class FacultyService {
  messages: AngularFireList<any>;
  public faculty;

  constructor(private http: HttpClient, private db: AngularFireDatabase, public departmentService: DepartmentService) {}

  ngOnInit() {}

  /**
   * Get All tickers from firebase
   */
  getMessages() {
    return new Promise((resolve) => {
      this.db
        .list('/')
        .valueChanges()
        .subscribe((result) => {
          resolve(result);
        });
    });
  }

  public getFaculties() {
    return this.db
      .list('/' + '1' + '/' + 'faculties_admin' + '/', (ref) =>
        ref.orderByChild('name'),
      )
      .valueChanges()
      .subscribe((result) => {
        this.faculty = result;
      });
  }

  public getSingleFac(facultyName) {
    for (let i = 0; i < this.faculty.length; i++) {
      if (this.faculty[i].name === facultyName) {
        this.departmentService.departmentsInFaculty(this.faculty[i]);
        }
      }
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
