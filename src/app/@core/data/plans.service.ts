import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AngularFireList } from "@angular/fire/database";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PlansService {
  messages: AngularFireList<any>;
  public plans;
  public allPlans = [];
  public pendingPlans = [];
  public counter = 0;

  constructor(private http: HttpClient, private db: AngularFirestore) {}

  ngOnInit() {}

  public getCount() {
    this.db
      .collection("users")
      .get()
      .toPromise()
      .then((result) => {
        for (let i = 0; i < result.docs.length; i++) {
          this.searchForPlans(result.docs[i].id);
        }
      });
  }

  public searchForPlans(userID) {
    this.db
      .collection("users")
      .doc(userID)
      .get()
      .toPromise()
      .then((result) => {
        this.allPlans.push(result.data());
        this.getPendingPlans();
      });
  }

  public getPendingPlans() {
    this.pendingPlans = [];
    let count = 0;
    for (let i = 0; i < this.allPlans.length; i++) {
      if (this.allPlans[i].status === 2) {
        this.pendingPlans.push(this.allPlans[i]);
        this.assignUserFac(this.allPlans[i].email, count);
        this.assignUserDept(this.allPlans[i].email, count)
        count++;
      }
    }
    // console.log(this.pendingPlans);
  }

  public getUserFaculty(userID) {
    return new Promise<any>(async (resolve) => {
      this.db
        .collection("users")
        .doc(userID)
        .collection("degree")
        .doc("faculty")
        .get()
        .toPromise()
        .then((result) => {
          resolve(result.data().name);
        });
    });
  }

  public assignUserFac(userID, index) {
    this.getUserFaculty(userID).then((copy) => {
      this.pendingPlans[index] = Object.assign(this.pendingPlans[index], {
        faculty: copy,
      });
    });
  }

  public getUserDepartment(userID) {
    return new Promise<any>(async (resolve) => {
      this.db
        .collection("users")
        .doc(userID)
        .collection("major")
        .doc("firstMajor")
        .get()
        .toPromise()
        .then((result) => {
          if (result.data()) {
            if (result.data().name) {
              resolve(result.data().name);
              }
            }
        });
    });
  }

  public assignUserDept(userID, index) {
    this.getUserDepartment(userID).then((copy) => {
      this.pendingPlans[index] = Object.assign(this.pendingPlans[index], {
        department: copy,
      });
    });
  }
}
