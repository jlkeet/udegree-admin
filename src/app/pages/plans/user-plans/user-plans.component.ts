import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from "@angular/core";

import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";
import { FacultyService } from "app/@core/data/faculty.service";
import { DepartmentService } from "app/@core/data/department.service";
import { PlansService } from "app/@core/data/plans.service";

@Component({
  selector: "user-plans",
  styleUrls: ["./user-plans.component.scss"],
  templateUrl: "user-plans.component.html",
})
export class UserPlansComponent {

  public user_data = this.plansService.pendingPlans;


  public allPlans = [];
  public pendingPlans = [];
  public showPlans = false;
  public displayPlans = false;

  public count = 0;

  public displayedColumns: string[] = ['position', 'name', 'email', 'faculty', 'department', 'date', 'notes' , 'edit', 'approve'];

  public userCourses = [];

  constructor(
    private db: AngularFirestore,
    public afAuth: AngularFireAuth,
    public facultyService: FacultyService,
    public departmentService: DepartmentService,
    public plansService: PlansService
  ) {}

  ngOnInit() {
    this.getCount();
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
    this.user_data = []
    // console.log(this.plansService.pendingPlans)
    this.count = 0;
    for (let i = 0; i < this.allPlans.length; i++) {
      if (this.allPlans[i].status === 2) {
        // console.log(this.plansService.pendingPlans[count])
        this.user_data.push({position: this.count + 1, name: this.plansService.pendingPlans[this.count].name, email: this.plansService.pendingPlans[this.count].email, faculty: this.plansService.pendingPlans[this.count].faculty, department: this.plansService.pendingPlans[this.count].department, date: null, edit: null, approve: this.plansService.pendingPlans[this.count].status});
        this.pendingPlans.push(this.allPlans[i]);
        this.count++;
      }
    }
  }

  public displayUserPlans(userID) {
    this.db
      .collection("users")
      .doc(userID)
      .collection("courses")
      .get()
      .toPromise()
      .then((result) => {
        for (let i = 0; i < result.docs.length; i++) {
        this.db
        .collection("users")
        .doc(userID)
        .collection("courses")
        .doc(result.docs[i].id)
        .get()
        .toPromise()
        .then((course) => {
          this.userCourses.push(course.data());
          console.log(this.userCourses)
        });
      }
      });
  }
}
