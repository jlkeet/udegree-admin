import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { CourseService } from "../../../@core/data/courses";
import { CourseNewComponent } from "./course-new.component";

@Component({
  selector: "course-edit",
  styleUrls: ["./course-edit.component.scss"],
  template: `
    <nb-card>
      <nb-card-header> Course Editor </nb-card-header>
      <nb-card-header>
        Search by Course Code
        <button
          *ngIf="showCourse === true"
          class="btn_close"
          [routerLink]="['/course-edit']"
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
        <div *ngIf="courseKeys">
          <div *ngIf="courseKeys[0] === 'id'">
            <b>ID</b>: {{ courseValues[0] }}
          </div>

          <div *ngIf="courseKeys[1] === 'name'">
            <b>Name</b>: {{ courseValues[1] }}

            <button class="btn_edit" (click)="this.canEditName = true">
              Edit Name
            </button>
            <button
              class="btn_save"
              *ngIf="this.canEditName === true"
              (click)="courseNameEditSaveBtn()"
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
            (keydown.enter)="courseNameEdit($event)"
          />

          <div *ngIf="courseKeys[2] === 'title'">
            <b>Title</b>: {{ courseValues[2] }}

            <button class="btn_edit" (click)="this.canEditTitle = true">
              Edit Title
            </button>
            <button
              class="btn_save"
              *ngIf="this.canEditTitle === true"
              (click)="courseTitleEditSaveBtn()"
            >
              Save
            </button>
            <button
              *ngIf="this.canEditTitle === true"
              (click)="this.canEditTitle = false"
            >
              Cancel
            </button>
          </div>
          <input
            (keyup)="onKey($event)"
            *ngIf="this.canEditTitle"
            type="text"
            class="form-control"
            (keydown.enter)="courseTitleEdit($event)"
          />

          <div *ngIf="courseKeys[3] === 'desc'">
            <b>Description</b>: {{ courseValues[3] }}

            <button class="btn_edit" (click)="this.canEditDesc = true">
              Edit Description
            </button>
            <button
              class="btn_save"
              *ngIf="this.canEditDesc === true"
              (click)="courseDescEditSaveBtn()"
            >
              Save
            </button>
            <button
              *ngIf="this.canEditDesc === true"
              (click)="this.canEditDesc = false"
            >
              Cancel
            </button>
          </div>
          <input
            (keyup)="onKey($event)"
            *ngIf="this.canEditDesc"
            type="text"
            class="form-control"
            (keydown.enter)="courseDescEdit($event)"
          />

          <div *ngIf="courseKeys[4] === 'department'">
            <b>Department</b>: {{ courseValues[4] }}

            <button class="btn_edit" (click)="this.canEditDept = true">
              Edit Department
            </button>
            <button class="btn_add" (click)="this.canAddDept = true">
              Add Department
            </button>
            <button
              class="btn_save"
              *ngIf="this.canEditDept === true"
              (click)="courseDeptEditSaveBtn()"
            >
              Save
            </button>
            <button
              *ngIf="this.canEditDept === true"
              (click)="this.canEditDept = false; this.canAddDept = false"
            >
              Cancel
            </button>
          </div>
          <input
            (keyup)="onKey($event)"
            *ngIf="this.canEditDept"
            type="text"
            class="form-control"
            (keydown.enter)="courseDeptEdit($event)"
          />
          <input
            (keyup)="onKey($event)"
            *ngIf="this.canAddDept"
            type="text"
            class="form-control"
            (keydown.enter)="courseDeptAdd($event)"
          />

          <div *ngIf="courseKeys[5] === 'faculties'">
            <b>Faculty</b>: {{ courseValues[5] }}
            <button class="btn_edit" (click)="this.canEditFac = true">
              Edit Faculty
            </button>
            <button class="btn_add" (click)="this.canAddFac = true">
              Add Faculty
            </button>
            <button
              class="btn_save"
              *ngIf="this.canEditFac === true"
              (click)="courseFacEditSaveBtn()"
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
            (keydown.enter)="courseFacEdit($event)"
          />
          <input
            (keyup)="onKey($event)"
            *ngIf="this.canAddFac"
            type="text"
            class="form-control"
            (keydown.enter)="courseFacAdd($event)"
          />

          <div *ngIf="courseKeys[6] === 'stage'">
            <b>Stage</b>: {{ courseValues[6] }}
            <button class="btn_edit" (click)="this.canEditStage = true">
              Edit Stage
            </button>
            <button
              class="btn_save"
              *ngIf="this.canEditStage === true"
              (click)="courseStageEditSaveBtn()"
            >
              Save
            </button>
            <button
              *ngIf="this.canEditStage === true"
              (click)="this.canEditStage = false"
            >
              Cancel
            </button>
          </div>
          <input
            (keyup)="onKey($event)"
            *ngIf="this.canEditStage"
            type="text"
            class="form-control"
            (keydown.enter)="courseStageEdit($event)"
          />

          <div *ngIf="courseKeys[11] === 'periods'">
          <b>Periods</b>: {{ courseValues[11] }}
          <button class="btn_edit" (click)="this.canEditPeriods = true">
            Edit Periods
          </button>
          <button
            class="btn_save"
            *ngIf="this.canEditPeriods === true"
            (click)="coursePeriodEditSaveBtn()"
          >
            Save
          </button>
          <button
            *ngIf="this.canEditPeriods === true"
            (click)="this.canEditPeriods = false"
          >
            Cancel
          </button>
        </div>
        <input
          (keyup)="onKey($event)"
          *ngIf="this.canEditPeriods"
          type="text"
          class="form-control"
          (keydown.enter)="coursePeriodsEdit($event)"
        />

          

          <div *ngIf="courseKeys[7] === 'points'">
            <b>Points</b>: {{ courseValues[7] }}
            <button class="btn_edit" (click)="this.canEditPoints = true">
              Edit Points
            </button>
            <button
              class="btn_save"
              *ngIf="this.canEditPoints === true"
              (click)="coursePointsEditSaveBtn()"
            >
              Save
            </button>
            <button
              *ngIf="this.canEditPoints === true"
              (click)="this.canEditPoints = false"
            >
              Cancel
            </button>
          </div>
          <input
            (keyup)="onKey($event)"
            *ngIf="this.canEditPoints"
            type="text"
            class="form-control"
            (keydown.enter)="coursePointsEdit($event)"
          /><BR />

          <div *ngIf="courseKeys[8] === 'requirements'">
            <b>Requirements</b>
            <BR />
            <div *ngFor="let req of courseValues[8]; index as i">
              <b>Papers</b>: {{ req.papers }}
              <button class="btn_edit" (click)="req.hideme = !req.hideme">
                Edit Papers
              </button>
              <button class="btn_add" (click)="req.hideme = !req.hideme">
                Add Papers
              </button>
              <button
                class="btn_save"
                *ngIf="this.canEditReqCourse === true"
                (click)="courseReqCourseEditSaveBtn(index)"
              >
                Save
              </button>
              <button
                *ngIf="this.canEditReqCourse === true"
                (click)="this.canEditReqCourse = false"
              >
                Cancel</button
              ><BR />

              <input
                (keyup)="onKey($event)"
                [hidden]="!req.hideme"
                type="text"
                class="form-control"
                (keydown.enter)="courseReqCourseEdit($event, i)"
              />
              <input
                (keyup)="onKey($event)"
                *ngIf="this.canAddReqCourse"
                type="text"
                class="form-control"
                (keydown.enter)="courseReqCourseAdd($event, i)"
              />

              <b>Required</b>: {{ req.required }}
              <button class="btn_edit" (click)="req.hideme = !req.hideme">
                Edit Points
              </button>
              <button
                class="btn_save"
                *ngIf="this.canEditReqPoints === true"
                (click)="courseReqPointsEditSaveBtn(index)"
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
                [hidden]="!req.hideme"
                type="text"
                class="form-control"
                (keydown.enter)="courseReqPointsEdit($event, i)"
              />
            </div>

            <div *ngIf="courseKeys[9] === 'isActive'">
              <b>Active?</b>: {{ courseValues[9] }}

              <button
                *ngIf="courseValues[9] === false"
                class="btn_edit"
                (click)="courseActivate()"
              >
                Activate Course
              </button>
              <button
                *ngIf="courseValues[9] === true"
                (click)="courseDeactivate()"
              >
                Deactivate Course
              </button>
            </div>


            <div *ngIf="courseKeys[10] === 'general'">
              <b>General?</b>: {{ courseValues[10] }}

              <button
                *ngIf="courseValues[10] === false"
                class="btn_edit"
                (click)="courseGeneralActivate()"
              >
                Make General
              </button>
              <button
                *ngIf="courseValues[10] === true"
                (click)="courseGeneralDeactivate()"
              >
                Deactivate General
              </button>
          </div>
          </div>
        </div>
      </ul>
    </nb-card>
    <course-new></course-new>
  `,
})
export class CourseEditComponent {
  public course;
  public listRef;
  public courseRef;
  public showCourse;
  public inputValue;
  public courseOrder;
  public courseKeys;
  public courseValues;

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

  public canAddReqCourse = false;

  public canEditReqCourse = false;
  public canEditReqCourse1 = false;
  public canEditReqCourse2 = false;
  public canEditReqCourse3 = false;
  public canEditReqCourse4 = false;
  public canEditReqCourse5 = false;
  public canEditReqCourse6 = false;
  public canEditReqCourse7 = false;

  constructor(
    public courseService: CourseService,
    private db: AngularFireDatabase
  ) {
    this.listRef = this.db.list("/", (ref) => ref.orderByChild("id"));

    this.courseOrder = {
      id: null,
      name: null,
      title: null,
      desc: null,
      department: null,
      faculties: null,
      stage: null,
      points: null,
      requirements: null,
      isActive: null,
      general: null,
      periods: null,
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

  ngOnInit() {
  }

  orderCourse(course) {
    // console.log(Object.keys(course), Object.values(course))
    this.courseKeys = Object.keys(course);
    this.courseValues = Object.values(course);
  }

  searchFirebase(val) {
    if (val !== "") {
      this.db
        .list("/" + "0" + "/" + "courses_admin" + "/", (ref) =>
          ref.orderByChild("name").equalTo(val)
        )
        .valueChanges()
        .subscribe((result) => {
          (this.course = Object.assign(this.courseOrder, result[0])),
            this.orderCourse(this.course);
        });
    } else {
      //  this.db.list('/').valueChanges().subscribe(result => console.log(result))
    }
  }

  save(event) {
    console.log("You entered: ", event.target.value);
    this.searchFirebase(event.target.value.toUpperCase());
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

  courseNameEdit(newName) {
    console.log(newName.target.value);
    this.db
      .list("/" + "0" + "/" + "courses_admin" + "/" + (this.course.id - 1))
      .set("name", newName.target.value);
  }

  courseNameEditSaveBtn() {
    console.log(this.inputValue);
    this.db
      .list("/" + "0" + "/" + "courses_admin" + "/" + (this.course.id - 1))
      .set("name", this.inputValue);
  }

  courseDeactivate() {
    console.log(this.course.name);
    this.db
      .list("/" + "0" + "/" + "courses_admin" + "/" + (this.course.id - 1))
      .set("isActive", false);
  }

  courseActivate() {
    console.log(this.course.name);
    this.db
      .list("/" + "0" + "/" + "courses_admin" + "/" + (this.course.id - 1))
      .set("isActive", true);
  }

  courseGeneralActivate() {
    console.log(this.course.name);
    this.db
      .list("/" + "0" + "/" + "courses_admin" + "/" + (this.course.id - 1))
      .set("general", true);
  }

  courseGeneralDeactivate() {
    console.log(this.course.name);
    this.db
      .list("/" + "0" + "/" + "courses_admin" + "/" + (this.course.id - 1))
      .set("general", false);
  }

  courseFacEdit(newName) {
    console.log(newName.target.value);
    this.db
      .list(
        "/" +
          "0" +
          "/" +
          "courses_admin" +
          "/" +
          (this.course.id - 1) +
          "/" +
          "faculties"
      )
      .set("0", newName.target.value);
  }

  courseFacEditSaveBtn() {
    console.log(this.inputValue);
    this.db
      .list(
        "/" +
          "0" +
          "/" +
          "courses_admin" +
          "/" +
          (this.course.id - 1) +
          "/" +
          "faculties"
      )
      .set("0", this.inputValue);
  }

  courseFacAdd(newName) {
    console.log(newName.target.value);
    this.db
      .list(
        "/" +
          "0" +
          "/" +
          "courses_admin" +
          "/" +
          (this.course.id - 1) +
          "/" +
          "faculties"
      )
      .set("" + this.course.faculties.length, newName.target.value);
  }

  courseDeptEdit(newName) {
    console.log(newName.target.value);
    this.db
      .list("/" + "0" + "/" + "courses_admin" + "/" + (this.course.id - 1))
      .set("department", newName.target.value);
  }

  courseDeptEditSaveBtn() {
    console.log(this.inputValue);
    this.db
      .list("/" + "0" + "/" + "courses_admin" + "/" + (this.course.id - 1))
      .set("department", this.inputValue);
  }

  courseDeptAdd(newName) {
    console.log(newName.target.value);
    this.db
      .list(
        "/" +
          "0" +
          "/" +
          "courses_admin" +
          "/" +
          (this.course.id - 1) +
          "/" +
          "department"
      )
      .set("" + this.course.department.length, newName.target.value);
  }

  courseDescEdit(newName) {
    console.log(newName.target.value);
    this.db
      .list("/" + "0" + "/" + "courses_admin" + "/" + (this.course.id - 1))
      .set("desc", newName.target.value);
  }

  courseDescEditSaveBtn() {
    console.log(this.inputValue);
    this.db
      .list("/" + "0" + "/" + "courses_admin" + "/" + (this.course.id - 1))
      .set("desc", this.inputValue);
  }

  coursePointsEdit(newName) {
    console.log(newName.target.value);
    this.db
      .list("/" + "0" + "/" + "courses_admin" + "/" + (this.course.id - 1))
      .set("points", parseInt(newName.target.value));
  }

  coursePointsEditSaveBtn() {
    console.log(this.inputValue);
    this.db
      .list("/" + "0" + "/" + "courses_admin" + "/" + (this.course.id - 1))
      .set("points", parseInt(this.inputValue));
  }

  courseStageEdit(newName) {
    console.log(newName.target.value);
    this.db
      .list("/" + "0" + "/" + "courses_admin" + "/" + (this.course.id - 1))
      .set("stage", newName.target.value);
  }

  courseStageEditSaveBtn() {
    console.log(this.inputValue);
    this.db
      .list("/" + "0" + "/" + "courses_admin" + "/" + (this.course.id - 1))
      .set("stage", parseInt(this.inputValue));
  }

  courseTitleEdit(newName) {
    console.log(newName.target.value);
    this.db
      .list("/" + "0" + "/" + "courses_admin" + "/" + (this.course.id - 1))
      .set("title", newName.target.value);
  }

  courseTitleEditSaveBtn() {
    console.log(this.inputValue);
    this.db
      .list("/" + "0" + "/" + "courses_admin" + "/" + (this.course.id - 1))
      .set("title", this.inputValue);
  }

  coursePeriodsEdit(newName) {
    console.log(newName.target.value);
      let i;
      let newArray = newName.target.value.split(",");
      for (i = 0; i < newArray.length; i++) {
        this.db
          .list(
            "/" +
              "0" +
              "/" +
              "courses_admin" +
              "/" +
              (this.course.id - 1) +
              "/" +
              "periods" 
          )
          .set("" + i, parseInt(newArray[i]));
      }
  }

  coursePeriodsEditSaveBtn() {
    console.log(this.inputValue);
    this.db
      .list("/" + "0" + "/" + "courses_admin" + "/" + (this.course.id - 1))
      .set("periods", parseInt(this.inputValue));
  }

  courseReqPointsEdit(newName, index) {
    console.log(newName.target.value);
    this.db
      .list(
        "/" +
          "0" +
          "/" +
          "courses_admin" +
          "/" +
          (this.course.id - 1) +
          "/" +
          "requirements" +
          "/" +
          index
      )
      .set("required", newName.target.value);
  }

  courseReqPointsEditSaveBtn(index) {
    console.log(this.inputValue);
    this.db
      .list(
        "/" +
          "0" +
          "/" +
          "courses_admin" +
          "/" +
          (this.course.id - 1) +
          "/" +
          "requirements" +
          "/" +
          index
      )
      .set("required", this.inputValue);
  }

  courseReqCourseEdit(newName, index) {
    console.log(newName.target.value);
    let i;
    let newArray = newName.target.value.split(",");
    for (i = 0; i < newArray.length; i++) {
      this.db
        .list(
          "/" +
            "0" +
            "/" +
            "courses_admin" +
            "/" +
            (this.course.id - 1) +
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

  courseReqCourseEditSaveBtn(index) {
    console.log(this.inputValue);
    let i;
    let newArray = this.inputValue.split(",");
    for (i = 0; i < newArray.length; i++) {
      this.db
        .list(
          "/" +
            "0" +
            "/" +
            "courses_admin" +
            "/" +
            (this.course.id - 1) +
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

  courseReqCourseAdd(newName, index) {
    console.log(newName.target.value);
    this.db
      .list(
        "/" +
          "0" +
          "/" +
          "courses_admin" +
          "/" +
          (this.course.id - 1) +
          "/" +
          "requirements" +
          "/" +
          index +
          "/" +
          "papers"
      )
      .set(
        "" + this.course.requirements[index].papers.length,
        newName.target.value
      );
  }

  // public coursePapersEdit(index) {
  //   switch(index){
  //     case 0:
  //       this.canEditReqCourse1 = true;
  //     case 1:
  //       this.canEditReqCourse2 = true;
  //     case 1:
  //       this.canEditReqCourse3 = true;
  //     case 1:
  //       this.canEditReqCourse4 = true;
  //     case 1:
  //       this.canEditReqCourse5 = true;
  //     case 1:
  //       this.canEditReqCourse6 = true;
  //     case 1:
  //       this.canEditReqCourse7 = true;
  //     case 1:
  // }
}
