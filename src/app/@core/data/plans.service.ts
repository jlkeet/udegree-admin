import { T } from "@angular/cdk/keycodes";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AngularFireList } from "@angular/fire/database";
import { AngularFirestore } from "@angular/fire/firestore";
import { MatTableDataSource } from "@angular/material/table";
import { Observable } from "rxjs";
import { AdminService } from "./admin.service";

@Injectable({
  providedIn: "root",
})
export class PlansService {
  messages: AngularFireList<any>;
  public plans;
  public allPlans = [];
  public pendingPlans = [];
  public approvedPlans = [];
  public auditLogHistoryArray = [];
  public counter = 0;
  public dataSource;

  constructor(
    private http: HttpClient,
    private db: AngularFirestore,
    private adminService: AdminService
  ) {}

  ngOnInit() {
  }

  public getAuditLog(userID) {
    this.searchForAuditLog(userID)
    // this.getAuditLogActionsID(userID)
  }

  public searchForAuditLog(userID) {
  if (this.auditLogHistoryArray.length < 1) {
    this.db
      .collection("audit-log")
      .doc(userID)
      .get()
      .toPromise()
      .then((result) => {
        // this.auditLogHistoryArray = [];
        this.auditLogHistoryArray.push(result.data())
        this.auditLogHistoryArray[this.counter].id = this.counter;
        this.getAuditLogActionsID(userID, this.counter)
        this.counter++;
      });
    }
  }

  public getAuditLogActionsID(userID, index) {
    this.db
      .collection("audit-log")
      .doc(userID)
      .collection("actions")
      .get()
      .toPromise()
      .then( (result) => {
        for (let i = 0; i < result.docs.length; i++) {
        this.getAuditLogActionsData(userID, result.docs[i].id, index)
        }
      })
  }

  public getAuditLogActionsData(userID, docID, index) {
    if (this.auditLogHistoryArray[index].actions.length < 1) {
    this.db
    .collection("audit-log")
    .doc(userID)
    .collection("actions")
    .doc(docID)
    .get()
    .toPromise()
    .then( (result) => {
      this.auditLogHistoryArray[index].actions.push(result.data())
    })
    // console.log(this.auditLogHistoryArray)
    this.dataSource = new MatTableDataSource(this.auditLogHistoryArray);
}
  }

  public clickMe(element) {
    console.log(element)
    console.log(this.auditLogHistoryArray)
  }

  public getFilteredFac() {
    for (let i = 0; i < this.pendingPlans.length; i++) {
      if (this.pendingPlans[i].faculty === this.adminService.adminFac) {
        let newArray = this.pendingPlans.map((obj) => ({ ...obj }));
        // this.pendingPlans = newArray.splice(i, 2);
      }
    }
  }

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
        this.pendingPlans[count] = Object.assign(this.pendingPlans[count], {
          position: count + 1,
        });
        this.assignUserFac(this.allPlans[i].email, count);
        this.assignUserDept(this.allPlans[i].email, count);
        count++;
      }
    }
  }

  public getApprovedPlans() {
    this.approvedPlans = [];
    let count = 0;
    for (let i = 0; i < this.allPlans.length; i++) {
      if (this.allPlans[i].status === 3) {
        // console.log(this.allPlans[i])
        this.approvedPlans.push(this.allPlans[i]);
        this.approvedPlans[count] = Object.assign(this.approvedPlans[count], {
          position: count + 1,
        });
        this.assignTimestamp(this.allPlans[i].email, count)
        // this.assignUserFac(this.allPlans[i].email, count);
        // this.assignUserDept(this.allPlans[i].email, count);
        this.assignAdmin(this.allPlans[i].email, count)
        count++;
      }
    }
  }

  public assignTimestamp(userID, index) {
    this.getTimestamp(userID).then((copy) => {
      this.approvedPlans[index] = Object.assign(this.approvedPlans[index], {
        timestamp: copy,
      });
    });
  }

  public getTimestamp(userID) {
    return new Promise<any>(async (resolve) => {
      this.db
        .collection("users")
        .doc(userID)
        .collection("notes")
        .get()
        .toPromise()
        .then( (doc) => {
          doc.forEach((element) => {
            this.db
            .collection("users")
            .doc(userID)
            .collection("notes")
            .doc(element.id)
            .get()
            .toPromise()
            .then((result) => {
              resolve(result.data().timestamp);
          });
        })})
    });
  }

  public assignAdmin(userID, index) {
    this.getAdmin(userID).then((copy) => {
      this.approvedPlans[index] = Object.assign(this.approvedPlans[index], {
        admin: copy,
      });
    });
  }

  public getAdmin(userID) {
    return new Promise<any>(async (resolve) => {
      this.db
        .collection("users")
        .doc(userID)
        .collection("notes")
        .get()
        .toPromise()
        .then( (doc) => {
          doc.forEach((element) => {
            this.db
            .collection("users")
            .doc(userID)
            .collection("notes")
            .doc(element.id)
            .get()
            .toPromise()
            .then((result) => {
              resolve(result.data().admin);
          });
        })})
    });
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

  public setExportStatus(studentEmail) {
    this.db
      .collection("users")
      .doc(studentEmail)
      .update({ status: 3 });
  }

  public setNotes(notes, studentEmail, timestamp, admin) {
    this.db
      .collection("users")
      .doc(studentEmail)
      .collection("notes")
      .add({ 
        notes: notes,
        timestamp: timestamp,
        admin: admin,
       });
  }

  public sendNotes(notes) {
    const email = "jackson@mg.udegree.co";
    const subject = "Jackson's Plan Notes";

    this.db.collection("mail").add({
      from: email,
      to: "jackson.keet@mac.com",
      // cc: "jackson.keet@udegree.co",
      message: {
        subject: subject,
        text: notes,
      },
    });
  }

  public deleteExistingAdminPlan(person) {
    this.db
      .collection("users")
      .doc(person)
      .collection("degree")
      .doc("faculty")
      .delete();

    this.db
      .collection("users")
      .doc(person)
      .collection("major")
      .doc("firstMajor")
      .delete();

    this.db
      .collection("users")
      .doc(person)
      .collection("courses")
      .get()
      .toPromise()
      .then((result) => {
        for (let i = 0; i < result.docs.length; i++) {
          this.db
            .collection("users")
            .doc(person)
            .collection("courses")
            .doc(result.docs[i].id)
            .delete();
        }
      });
  }

  // Note that in this instance personeOne is always admin and personTwo is always student
  public copyUserPlanToAdmin(personOne, personTwo) {

    this.setStudentEmailToAdmin(personOne, personTwo)

    this.db
      .collection("users")
      .doc(personTwo)
      .collection("degree")
      .doc("faculty")
      .get()
      .toPromise()
      .then((res) => {
        console.log(res.data())
        this.db
          .collection("users")
          .doc(personOne)
          .collection("degree")
          .doc("faculty")
          .set(res.data());
      });

    this.db
      .collection("users")
      .doc(personTwo)
      .collection("major")
      .doc("firstMajor")
      .get()
      .toPromise()
      .then((res) => {
        this.db
          .collection("users")
          .doc(personOne)
          .collection("major")
          .doc("firstMajor")
          .set(res.data());
      });

    this.db
      .collection("users")
      .doc(personTwo)
      .collection("courses")
      .get()
      .toPromise()
      .then((result) => {
        for (let i = 0; i < result.docs.length; i++) {
          this.db
            .collection("users")
            .doc(personTwo)
            .collection("courses")
            .doc(result.docs[i].id)
            .get()
            .toPromise()
            .then((course) => {
              this.db
                .collection("users")
                .doc(personOne)
                .collection("courses")
                .add(course.data());
            });
        }
      });
  }

  public getNotes(userID) {
    return new Promise<any>(async (resolve) => {
      this.db
        .collection("users")
        .doc(userID)
        .collection("notes")
        .get()
        .toPromise()
        .then( (doc) => {
          doc.forEach((element) => {
            this.db
            .collection("users")
            .doc(userID)
            .collection("notes")
            .doc(element.id)
            .get()
            .toPromise()
            .then((result) => {
              resolve(result.data().notes);
          });
        })})
    });
  }

  public assignNotes(userID, index) {
    this.getNotes(userID).then((copy) => {
      this.approvedPlans[index] = Object.assign(this.approvedPlans[index], {
        notes: copy,
      });
    });
  }

  public copyAdminToUserPlan(personOne, personTwo) {

    // Note that here we reverse the roles so that it now saves to user instead of admin
    this.copyUserPlanToAdmin(personTwo, personOne)
  }

  public setStudentEmailToAdmin(admin, studentEmail) {
    this.db
      .collection("users")
      .doc(admin)
      .update({ student: studentEmail })
  }

  public setDataSource(dataSource) {
    this.dataSource = dataSource;

  }

  public getDataSource() {
    console.log(this.dataSource)
    return this.dataSource;

  }
}
