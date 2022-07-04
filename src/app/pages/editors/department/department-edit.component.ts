import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { DepartmentService } from "../../../@core/data/department.service";
// import { DepartmentNewComponent } from './department-new.component';

@Component({
  selector: "department-edit",
  styleUrls: ["./department-edit.component.scss"],
  template: `
    <nb-card>
      <nb-card-header> Department Editor </nb-card-header>
      <nb-card-header>
        Search by Department
        <button
          *ngIf="showCourse === true"
          class="btn_close"
          [routerLink]="['/department-edit']"
          (click)="close()"
        >
          Close
        </button>
      </nb-card-header>
      <nb-card-body>
        <i class="control-icon ion ion-ios-search" (click)="showInput()"></i>
        <input
          (keydown.enter)="save($event)"
          placeholder="Type your search request here..."
          #input
          [class.hidden]="!isInputShown"
          (blur)="hideInput()"
          (input)="onInput($event)"
        />
      </nb-card-body>
      <ul>
        <div *ngIf="departmentKeys">
          <div *ngIf="departmentKeys[0] === 'conjointRequirements'">
            <b>Conjoint Requirements</b>
            <BR />
            <div *ngFor="let req of departmentValues[0]; index as i">

              <b>Required</b>: {{ req.required }}
              <button class="btn_edit" (click)="this.canEditReqConPoint = true">
                Edit Points
              </button>
              <button
                class="btn_save"
                *ngIf="this.canEditReqConPoint === true"
                (click)="departmentConReqPointsEditSaveBtn(i)"
              >
                Save
              </button>
              <button
                *ngIf="this.canEditReqConPoint === true"
                (click)="this.canEditReqConPoint = false"
              >
                Cancel
              </button>
              <input
                (keyup)="onKey($event)"
                *ngIf="this.canEditReqConPoint"
                type="text"
                class="form-control"
                (keydown.enter)="departmentConReqPointsEdit($event, i)"
              />

              <b>Papers</b>: {{ req.papers }}
              <button class="btn_edit" (click)="this.canEditReqConPaper = true">
                Edit Courses
              </button>
              <button
                class="btn_save"
                *ngIf="this.canEditReqConPaper === true"
                (click)="departmentConReqPapersEditSaveBtn(i)"
              >
                Save
              </button>
              <button
                *ngIf="this.canEditReqConPaper === true"
                (click)="this.canEditReqConPaper = false"
              >
                Cancel
              </button>
              <input
                (keyup)="onKey($event)"
                *ngIf="this.canEditReqConPaper"
                type="text"
                class="form-control"
                (keydown.enter)="departmentConReqPapersEdit($event, i)"
              />

              <b>Department</b>: {{ req.departments }}
              <button class="btn_edit" (click)="this.canEditReqConDept = true">
                Edit Department
              </button>
              <button
                class="btn_save"
                *ngIf="this.canEditReqConDept === true"
                (click)="departmentConReqDeptEditSaveBtn(i)"
              >
                Save
              </button>
              <button
                *ngIf="this.canEditReqConDept === true"
                (click)="this.canEditReqConDept = false"
              >
                Cancel
              </button>
              <input
                (keyup)="onKey($event)"
                *ngIf="this.canEditReqConDept"
                type="text"
                class="form-control"
                (keydown.enter)="departmentConReqDeptEdit($event, i)"
              />

              <b>Above Stage</b>: {{ req.aboveStage }}
              <button class="btn_edit" (click)="this.canEditReqConStage = true">
                Edit Points
              </button>
              <button
                class="btn_save"
                *ngIf="this.canEditReqConStage === true"
                (click)="departmentConReqStageEditSaveBtn(i)"
              >
                Save
              </button>
              <button
                *ngIf="this.canEditReqConStage === true"
                (click)="this.canEditReqConStage = false"
              >
                Cancel
              </button>
              <input
                (keyup)="onKey($event)"
                *ngIf="this.canEditReqConStage"
                type="text"
                class="form-control"
                (keydown.enter)="departmentConReqStageEdit($event, i)"
              />
            </div>
          </div>

          <div *ngIf="departmentKeys[1] === 'faculties'">
            <b>Faculty</b>: {{ departmentValues[1] }}
            <button class="btn_edit" (click)="this.canEditFac = true">
              Edit Faculty
            </button>
            <button class="btn_add" (click)="this.canAddFac = true">
              Add Faculty
            </button>
            <button
              class="btn_save"
              *ngIf="this.canEditFac === true"
              (click)="departmentFacEditSaveBtn()"
            >
              Save
            </button>
            <button
              *ngIf="this.canEditFac === true"
              (click)="this.canEditFac = false; this.canAddFac = false"
            >
              Cancel
            </button>
          </div>
          <input
            (keyup)="onKey($event)"
            *ngIf="this.canEditFac"
            type="text"
            class="form-control"
            (keydown.enter)="departmentFacEdit($event)"
          />
          <input
            (keyup)="onKey($event)"
            *ngIf="this.canAddFac"
            type="text"
            class="form-control"
            (keydown.enter)="courseFacAdd($event)"
          />

          <div *ngIf="departmentKeys[2] === 'name'">
            <b>Name</b>: {{ departmentValues[2] }}

            <button class="btn_edit" (click)="this.canEditName = true">
              Edit Name
            </button>
            <button
              class="btn_save"
              *ngIf="this.canEditName === true"
              (click)="departmentNameEditSaveBtn()"
            >
              Save
            </button>
            <button
              *ngIf="this.canEditName === true"
              (click)="this.canEditName = false"
            >
              Cancel
            </button>
          </div>
          <input
            (keyup)="onKey($event)"
            *ngIf="this.canEditName"
            type="text"
            class="form-control"
            (keydown.enter)="departmentNameEdit($event)"
          />

          <div *ngIf="departmentKeys[3] === 'papers'">
            <b>Courses</b>: {{ departmentValues[3] }}

            <button class="btn_edit" (click)="this.canEditPapers = true">
              Edit Courses
            </button>
            <button
              class="btn_save"
              *ngIf="this.canEditPapers === true"
              (click)="departmentPapersEditSaveBtn()"
            >
              Save
            </button>
            <button
              *ngIf="this.canEditPapers === true"
              (click)="this.canEditPapers = false"
            >
              Cancel
            </button>
          </div>
          <input
            (keyup)="onKey($event)"
            *ngIf="this.canEditPapers"
            type="text"
            class="form-control"
            (keydown.enter)="departmentPapersEdit($event)"
          />

          <div *ngIf="departmentKeys[4] === 'requirements'">
            <b>Requirements</b>
            <BR />
            <div *ngFor="let req of departmentValues[4]; index as i">

              <b>Departments</b>: {{ req.departments }}
              <button class="btn_edit" (click)="this.canEditReqDept = true">
                Edit Departments
              </button>
              <button class="btn_add" (click)="this.canEditReqDept = true">
                Add Departments
              </button>
              <button
                class="btn_save"
                *ngIf="this.canEditReqDept === true"
                (click)="departmentReqDeptEditSaveBtn(i)"
              >
                Save
              </button>
              <button
                *ngIf="this.canEditReqDept === true"
                (click)="this.canEditReqDept = false"
              >
                Cancel</button
              ><BR />

              <input
                (keyup)="onKey($event)"
                *ngIf="this.canEditReqDept"
                type="text"
                class="form-control"
                (keydown.enter)="departmentReqDeptEdit($event, i)"
              />
              <input
                (keyup)="onKey($event)"
                *ngIf="this.canAddReqCourse"
                type="text"
                class="form-control"
                (keydown.enter)="courseReqCourseAdd($event, i)"
              />

              <b>Required</b>: {{ req.required }}
              <button class="btn_edit" (click)="this.canEditReqPoints = true">
                Edit Points
              </button>
              <button
                class="btn_save"
                *ngIf="this.canEditReqPoints === true"
                (click)="departmentReqPointsEditSaveBtn(i)"
              >
                Save
              </button>
              <button
                *ngIf="this.canEditReqPoints === true"
                (click)="this.canEditReqPoints = false"
              >
                Cancel
              </button>
              <input
                (keyup)="onKey($event)"
                *ngIf="this.canEditReqPoints"
                type="text"
                class="form-control"
                (keydown.enter)="departmentReqPointsEdit($event, i)"
              />

              <b>Papers</b>: {{ req.papers }}
              <button class="btn_edit" (click)="this.canEditReqCourse = true">
                Edit Papers
              </button>
              <button
                class="btn_save"
                *ngIf="this.canEditReqCourse === true"
                (click)="departmentReqCourseEditSaveBtn(i)"
              >
                Save
              </button>
              <button
                *ngIf="this.canEditReqCourse === true"
                (click)="this.canEditReqCourse = false"
              >
                Cancel
              </button>
              <input
                (keyup)="onKey($event)"
                *ngIf="this.canEditReqCourse"
                type="text"
                class="form-control"
                (keydown.enter)="departmentReqCourseEdit($event, i)"
              />

              <b>Above Stage</b>: {{ req.aboveStage }}
              <button class="btn_edit" (click)="this.canEditReqAboveStage = true">
                Edit Above Stage
              </button>
              <button
                class="btn_save"
                *ngIf="this.canEditReqAboveStage === true"
                (click)="departmentReqAboveStageEditSaveBtn(i)"
              >
                Save
              </button>
              <button
                *ngIf="this.canEditReqAboveStage === true"
                (click)="this.canEditReqAboveStage = false"
              >
                Cancel
              </button>
              <input
                (keyup)="onKey($event)"
                *ngIf="this.canEditReqAboveStage"
                type="text"
                class="form-control"
                (keydown.enter)="departmentReqAboveStageEdit($event, i)"
              />
            </div>
          </div>
        </div>
      </ul>
    </nb-card>
  `,
})
export class DepartmentEditComponent {
  public department;
  public listRef;
  public courseRef;
  public showCourse;
  public inputValue;
  public departmentOrder;
  public departmentKeys;
  public departmentValues;

  public canEditName = false;
  public canEditTitle = false;
  public canEditFac = false;
  public canAddFac = false;
  public canEditDept = false;
  public canAddDept = false;
  public canEditDesc = false;
  public canEditPoints = false;
  public canEditStage = false;
  public canEditReqPoints = false;
  public canEditReqCourse = false;
  public canAddReqCourse = false;

  public canEditReqConPoint = false;
  public canEditReqConPaper = false;
  public canEditReqConDept = false;
  public canEditReqConStage = false;
  public canEditPapers = false;
  public canEditReqDept = false;
  public canEditReqAboveStage = false;


  constructor(
    public departmentService: DepartmentService,
    private db: AngularFireDatabase
  ) {
    this.listRef = this.db.list("/", (ref) => ref.orderByChild("id"));

    this.departmentOrder = {
      conjointRequirements: null,
      faculties: null,
      name: null,
      papers: null,
      requirements: null,
    };
  }

  @ViewChild("input", { static: true }) input: ElementRef;

  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  isInputShown = false;

  showInput() {
    this.isInputShown = true;
    this.input.nativeElement.focus();
  }

  hideInput() {
    this.isInputShown = false;
  }

  onInput(val: string) {
    this.search.emit(val);
  }

  ngOnInit() {}

  orderCourse(department) {
    console.log(department)
    // console.log(Object.keys(course), Object.values(course))
    this.departmentKeys = Object.keys(department);
    this.departmentValues = Object.values(department);
  }

  searchFirebase(val) {
    if (val !== "") {
      //   this.db.list('/', ref => ref.orderByChild('name').equalTo(val)).valueChanges().subscribe(result => {this.course = Object.assign(this.departmentOrder, result[0]), this.orderCourse(this.course)})
      this.db
        .list("/" + "2" + "/" + "departments_admin" + "/", (ref) =>
          ref.orderByChild("name").equalTo(val)
        )
        .valueChanges()
        .subscribe((result) => {
          (this.department = Object.assign(this.departmentOrder, result[0])),
            this.orderCourse(this.department);
        });
    } else {
      //  this.db.list('/').valueChanges().subscribe(result => console.log(result))
    }
  }

  save(event) {
    console.log("You entered: ", event.target.value);
    this.searchFirebase(event.target.value);
    this.showCourse = true;
  }

  close() {
    this.showCourse = false;
  }

  setTitleEdit(item) {
    this.canEditName = true;
    this.canEditTitle = true;
    this.canEditFac = true;
    this.canAddFac = true;
    this.canEditDept = true;
    this.canAddDept = true;
    this.canEditDesc = true;
    this.canEditPoints = true;
    this.canEditStage = true;
    this.canEditReqPoints = true;
    this.canEditReqCourse = true;
    this.canAddReqCourse = true;
  }

  onKey(event) {
    this.inputValue = event.target.value;
  }

  departmentNameEdit(newName) {
    console.log(newName.target.value);
    this.db
      .list("/" + "2" + "/" + "departments_admin" + "/" + (this.department.id - 1))
      .set("name", newName.target.value);
  }

  departmentNameEditSaveBtn() {
    console.log(this.inputValue);
    this.db
      .list(
        "/" + "2" + "/" + "departments_admin" + "/" + (this.department.id - 1)
      )
      .set("name", this.inputValue);
  }

  departmentDeactivate() {
    console.log(this.department.name);
    this.db
      .list(
        "/" + "2" + "/" + "departments_admin" + "/" + (this.department.id - 1)
      )
      .set("isActive", false);
  }

  departmentActivate() {
    console.log(this.department.name);
    this.db
      .list(
        "/" + "2" + "/" + "departments_admin" + "/" + (this.department.id - 1)
      )
      .set("isActive", true);
  }

  departmentPapersEdit(newName) {
    console.log(newName.target.value);
    this.db
      .list(
        "/" +
          "2" +
          "/" +
          "departments_admin" +
          "/" +
          (this.department.id - 1) +
          "/" +
          "papers"
      )
      .set("0", newName.target.value);
  }

  departmentPapersEditSaveBtn() {
    console.log(this.inputValue);
    this.db
      .list(
        "/" +
          "2" +
          "/" +
          "departments_admin" +
          "/" +
          (this.department.id - 1) +
          "/" +
          "papers"
      )
      .set("0", this.inputValue);
  }

  departmentFacEdit(newName) {
    console.log(newName.target.value);
    this.db
      .list(
        "/" +
          "2" +
          "/" +
          "departments_admin" +
          "/" +
          (this.department.id - 1) +
          "/" +
          "faculties"
      )
      .set("0", newName.target.value);
  }

  departmentFacEditSaveBtn() {
    console.log(this.inputValue);
    this.db
      .list(
        "/" +
          "2" +
          "/" +
          "departments_admin" +
          "/" +
          (this.department.id - 1) +
          "/" +
          "faculties"
      )
      .set("0", this.inputValue);
  }

  departmentFacAdd(newName) {
    console.log(newName.target.value);
    this.db
      .list(
        "/" +
          "2" +
          "/" +
          "departments_admin" +
          "/" +
          (this.department.id - 1) +
          "/" +
          "faculties"
      )
      .set("" + this.department.faculties.length, newName.target.value);
  }

  departmentReqDeptEdit(newName, index) {
    console.log(newName.target.value);
    let i;
    let newArray = newName.target.value.split(",");
    for (i = 0; i < newArray.length; i++) {
      this.db
        .list(
          "/" +
            +"2" +
            "/" +
            "departments_admin" +
            "/" +
            (this.department.id - 1) +
            "/" +
            "requirements" +
            "/" +
            index +
            "/" +
            "departments"
        )
        .set("" + i, newArray[i]);
      console.log(i);
    }
  }

  departmentReqDeptEditSaveBtn(index) {
    console.log(this.inputValue);
    let i;
    let newArray = this.inputValue.split(",");
    for (i = 0; i < newArray.length; i++) {
      this.db
        .list(
          "/" +
            +"2" +
            "/" +
            "departments_admin" +
            "/" +
            (this.department.id - 1) +
            "/" +
            "requirements" +
            "/" +
            index +
            "/" +
            "departments"
        )
        .set("" + i, newArray[i]);
      console.log(i);
    }
  }

  departmentReqCourseEdit(newName, index) {
    console.log(newName.target.value);
    let i;
    let newArray = newName.target.value.split(",");
    for (i = 0; i < newArray.length; i++) {
      this.db
        .list(
          "/" +
            +"2" +
            "/" +
            "departments_admin" +
            "/" +
            (this.department.id - 1) +
            "/" +
            "requirements" +
            "/" +
            index +
            "/" +
            "papers"
        )
        .set("" + i, newArray[i]);
      console.log(i);
    }
  }

  departmentReqCourseEditSaveBtn(index) {
    console.log(this.inputValue);
    let i;
    let newArray = this.inputValue.split(",");
    for (i = 0; i < newArray.length; i++) {
      this.db
        .list(
          "/" +
            +"2" +
            "/" +
            "departments_admin" +
            "/" +
            (this.department.id - 1) +
            "/" +
            "requirements" +
            "/" +
            index +
            "/" +
            "papers"
        )
        .set("" + i, newArray[i]);
      console.log(i);
    }
  }

  departmentReqCourseAdd(newName, index) {
    console.log(newName.target.value);
    this.db
      .list(
        "/" +
          +"2" +
          "/" +
          "departments_admin" +
          "/" +
          (this.department.id - 1) +
          "/" +
          "requirements" +
          "/" +
          index +
          "/" +
          "papers"
      )
      .set(
        "" + this.department.requirements[index].papers.length,
        newName.target.value
      );
  }

  departmentReqPointsEdit(newName, index) {
    console.log(newName.target.value);
    let i;
    let newArray = newName.target.value.split(",");
    for (i = 0; i < newArray.length; i++) {
      this.db
        .list(
          "/" +
            +"2" +
            "/" +
            "departments_admin" +
            "/" +
            (this.department.id - 1) +
            "/" +
            "requirements" +
            "/" +
            index +
            "/" +
            "required"
        )
        .set("" + i, newArray[i]);
      console.log(i);
    }
  }

  departmentReqPointsEditSaveBtn(index) {
    console.log(this.inputValue);
    let i;
    let newArray = this.inputValue.split(",");
    for (i = 0; i < newArray.length; i++) {
      this.db
        .list(
          "/" +
            +"2" +
            "/" +
            "departments_admin" +
            "/" +
            (this.department.id - 1) +
            "/" +
            "requirements" +
            "/" +
            index +
            "/" +
            "required"
        )
        .set("" + i, newArray[i]);
      console.log(i);
    }
  }

  departmentReqAboveStageEdit(newName, index) {
    console.log(newName.target.value);
    let i;
    let newArray = newName.target.value.split(",");
    for (i = 0; i < newArray.length; i++) {
      this.db
        .list(
          "/" +
            +"2" +
            "/" +
            "departments_admin" +
            "/" +
            (this.department.id - 1) +
            "/" +
            "requirements" +
            "/" +
            index +
            "/" +
            "aboveStage"
        )
        .set("" + i, newName.target.value);
      console.log(i);
    }
  }

  departmentReqAboveStageEditSaveBtn(index) {
    console.log(this.inputValue);
    let i;
    let newArray = this.inputValue.split(",");
    for (i = 0; i < newArray.length; i++) {
      this.db
        .list(
          "/" +
            +"2" +
            "/" +
            "departments_admin" +
            "/" +
            (this.department.id - 1) +
            "/" +
            "requirements" +
            "/" +
            index +
            "/" +
            "aboveStage"
        )
        .set("" + i, newArray[i]);
      console.log(i);
    }
  }

  departmentConReqPointsEdit(newName, index) {
    console.log(newName.target.value);
    let i;
    let newArray = newName.target.value.split(",");
    for (i = 0; i < newArray.length; i++) {
      this.db
        .list(
            "/" +
            +"2" +
            "/" +
            "departments_admin" +
            "/" +
            (this.department.id - 1) +
            "/" +
            "conjointRequirements" +
            "/" +
            index +
            "/" +
            "required"
        )
        .set("" + i, newArray[i]);
      console.log(i);
    }
  }

  departmentConReqPointsEditSaveBtn(index) {
    console.log(this.inputValue);
    console.log(index)
    let i;
    let newArray = this.inputValue.split(",");
    for (i = 0; i < newArray.length; i++) {
      this.db
        .list(
          "/" +
            +"2" +
            "/" +
            "departments_admin" +
            "/" +
            (this.department.id - 1) +
            "/" +
            "conjointRequirements" +
            "/" +
            index +
            "/" +
            "required"
        )
        .set("" + i, newArray[i]);
      console.log(i);
    }
  }

  departmentConReqPapersEdit(newName, index) {
    console.log(newName.target.value);
    let i;
    let newArray = newName.target.value.split(",");
    for (i = 0; i < newArray.length; i++) {
      this.db
        .list(
            "/" +
            +"2" +
            "/" +
            "departments_admin" +
            "/" +
            (this.department.id - 1) +
            "/" +
            "conjointRequirements" +
            "/" +
            index +
            "/" +
            "papers"
        )
        .set("" + i, newArray[i]);
      console.log(i);
    }
  }

  departmentConReqPapersEditSaveBtn(index) {
    console.log(this.inputValue);
    let i;
    let newArray = this.inputValue.split(",");
    for (i = 0; i < newArray.length; i++) {
      this.db
        .list(
          "/" +
            +"2" +
            "/" +
            "departments_admin" +
            "/" +
            (this.department.id - 1) +
            "/" +
            "conjointRequirements" +
            "/" +
            index +
            "/" +
            "papers"
        )
        .set("" + i, newArray[i]);
      console.log(i);
    }
  }

  departmentConReqDeptEdit(newName, index) {
    console.log(newName.target.value);
    let i;
    let newArray = newName.target.value.split(",");
    for (i = 0; i < newArray.length; i++) {
      this.db
        .list(
            "/" +
            +"2" +
            "/" +
            "departments_admin" +
            "/" +
            (this.department.id - 1) +
            "/" +
            "conjointRequirements" +
            "/" +
            index +
            "/" +
            "departments"
        )
        .set("" + i, newArray[i]);
      console.log(i);
    }
  }

  departmentConReqDeptEditSaveBtn(index) {
    console.log(this.inputValue);
    let i;
    let newArray = this.inputValue.split(",");
    for (i = 0; i < newArray.length; i++) {
      this.db
        .list(
          "/" +
            +"2" +
            "/" +
            "departments_admin" +
            "/" +
            (this.department.id - 1) +
            "/" +
            "conjointRequirements" +
            "/" +
            index +
            "/" +
            "departments"
        )
        .set("" + i, newArray[i]);
      console.log(i);
    }
  }

  departmentConReqStageEdit(newName, index) {
    console.log(newName.target.value);
    let i;
    let newArray = newName.target.value.split(",");
    for (i = 0; i < newArray.length; i++) {
      this.db
        .list(
            "/" +
            +"2" +
            "/" +
            "departments_admin" +
            "/" +
            (this.department.id - 1) +
            "/" +
            "conjointRequirements" +
            "/" +
            index +
            "/" +
            "stage"
        )
        .set("" + i, newArray[i]);
      console.log(i);
    }
  }

  departmentConReqStageEditSaveBtn(index) {
    console.log(this.inputValue);
    let i;
    let newArray = this.inputValue.split(",");
    for (i = 0; i < newArray.length; i++) {
      this.db
        .list(
          "/" +
            +"2" +
            "/" +
            "departments_admin" +
            "/" +
            (this.department.id - 1) +
            "/" +
            "conjointRequirements" +
            "/" +
            index +
            "/" +
            "stage"
        )
        .set("" + i, newArray[i]);
      console.log(i);
    }
  }

}
