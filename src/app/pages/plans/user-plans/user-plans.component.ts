import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from "@angular/core";

import { AngularFirestore } from "@angular/fire/firestore";
import { FacultyService } from "app/@core/data/faculty.service";
import { DepartmentService } from "app/@core/data/department.service";
import { PlansService } from "app/@core/data/plans.service";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { DialogBoxComponent } from "app/@core/dialog/dialog-box.component";
import { AuthService } from "app/auth/auth-service.service";
import { AdminService } from "app/@core/data/admin.service";

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
  public filteredPlans = [];

  public count = 0;

  public displayedColumns: string[] = [
    "position",
    "name",
    "email",
    "faculty",
    "department",
    "date",
    "notes",
    "edit",
    "approve",
  ];

  public userCourses = [];

  constructor(
    public adminService: AdminService,
    private db: AngularFirestore,
    public facultyService: FacultyService,
    public departmentService: DepartmentService,
    public plansService: PlansService,
    public authService: AuthService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getCount();
    // console.log(this.plansService.pendingPlans[0].faculty)
    this.adminService.getAdminFaculty("jackson.keet@knowledge-basket.co.nz");

    setTimeout(() => {
      this.plansService.getFilteredFac();
    }, 3500);
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
    this.user_data = [];
    this.filteredPlans = [];
    // console.log(this.plansService.pendingPlans)
    this.count = 0;
    for (let i = 0; i < this.allPlans.length; i++) {
      if (this.allPlans[i].status === 2) {
        // console.log(this.plansService.pendingPlans[this.count].faculty)
        this.user_data.push({
          date: null,
          edit: null,
        });
        this.pendingPlans.push(this.allPlans[i]);
        this.count++;
      }
    }
  }

  public openDialog(student) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      id: 1,
      title: "Angular For Beginners",
    };

    const dialogRef = this.dialog.open(DialogBoxComponent, dialogConfig);

    dialogRef
      .afterClosed()
      .subscribe((data) => console.log("Dialog output:", data));
  }

 public openUdegMain(url) {
    window.open(url, "_blank");
}
}
