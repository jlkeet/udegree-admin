import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AngularFireList } from "@angular/fire/database";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AdminService {

  public adminFac;

  constructor(private http: HttpClient, private db: AngularFirestore) {}

  ngOnInit() {}
    
  getAdminFaculty(authID) {
    return new Promise((resolve) => {
    this.db
    .collection('users')
    .doc(authID)
    .get()
    .toPromise()
    .then( (result) => this.getFilteredAdmin(result.data()))
  })}
  
  getFilteredAdmin(faculty) {
    this.adminFac = faculty.faculties[0]
  }

}
