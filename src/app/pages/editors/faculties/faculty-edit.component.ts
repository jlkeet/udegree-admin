import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { FacultyService } from "../../../@core/data/faculty.service";
// import { FacultyNewComponent } from './faculty-new.component';

@Component({
  selector: "faculty-edit",
  styleUrls: ["./faculty-edit.component.scss"],
  template: `
    <nb-card>
      <nb-card-header> Degree Editor </nb-card-header>
      <nb-card-header>
        Search by Faculty
        <button
          *ngIf="showCourse === true"
          class="btn_close"
          [routerLink]="['/faculty-edit']"
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
        <div *ngIf="facultyKeys">
          <div *ngIf="facultyKeys[0] === 'abbrv'">
            <b>Abbreviation</b>: {{ facultyValues[0] }}
          </div>

          <div *ngIf="facultyKeys[1] === 'flags'">
            <b>Flags</b>: {{ facultyValues[1] }}
            <button class="btn_edit" (click)="this.canEditFac = true">
              Edit Flags
            </button>
            <button class="btn_add" (click)="this.canAddFac = true">
              Add Flags
            </button>
            <button
              class="btn_save"
              *ngIf="this.canEditFac === true"
              (click)="facultyFacEditSaveBtn()"
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

          <div *ngIf="facultyKeys[4] === 'name'">
            <b>Name</b>: {{ facultyValues[4] }}

            <button class="btn_edit" (click)="this.canEditName = true">
              Edit Major Requirements
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

          <div *ngIf="facultyKeys[3] === 'majors'">
            <b>Majors</b>: {{ facultyValues[3] }}

            <button class="btn_edit" (click)="this.canEditDesc = true">
              Edit Majors
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

          <div *ngIf="facultyKeys[2] === 'majorRequirements'">
            <b>Major Requirements</b>
            <BR />
            <div *ngFor="let req of facultyValues[2]; index as i">
              <b>Faculties</b>: {{ req.faculties }}
              <button class="btn_edit" (click)="this.canEditReqCourse = true">
                Edit Departments
              </button>
              <button class="btn_add" (click)="this.canAddReqCourse = true">
                Add Departments
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
                *ngIf="this.canEditReqCourse"
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
              <button class="btn_edit" (click)="this.canEditReqPoints = true">
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
                *ngIf="this.canEditReqPoints"
                type="text"
                class="form-control"
                (keydown.enter)="courseReqPointsEdit($event, i)"
              />
            </div>
          </div>
        </div>
      </ul>
    </nb-card>
  `,
})
export class FacultyEditComponent {
  public faculty;
  public listRef;
  public courseRef;
  public showCourse;
  public inputValue;
  public facultyOrder;
  public facultyKeys;
  public facultyValues;

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

  constructor(
    public facultyService: FacultyService,
    private db: AngularFireDatabase
  ) {
    this.listRef = this.db.list("/", (ref) => ref.orderByChild("id"));

    this.facultyOrder = {
      abbrv: null,
      flags: null,
      majorRequirements: null,
      majors: null,
      name: null,
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
    //   this.db.list('/', ref => ref.orderByChild('name').equalTo("Drama")).valueChanges().subscribe((result: any) => console.log(result))
    //  this.db.list('/' + '2' + '/' + 'departments_admin' + '/', ref => ref.orderByChild('name').equalTo("Drama")).valueChanges().subscribe((result: any) => console.log(result[0]))
  }

  orderCourse(faculty) {
    // console.log(Object.keys(course), Object.values(course))
    this.facultyKeys = Object.keys(faculty);
    this.facultyValues = Object.values(faculty);
  }

  searchFirebase(val) {
    if (val !== "") {
      //   this.db.list('/', ref => ref.orderByChild('name').equalTo(val)).valueChanges().subscribe(result => {this.course = Object.assign(this.departmentOrder, result[0]), this.orderCourse(this.course)})
      this.db
        .list("/" + "1" + "/" + "faculties_admin" + "/", (ref) =>
          ref.orderByChild("name").equalTo(val)
        )
        .valueChanges()
        .subscribe((result) => {
          (this.faculty = Object.assign(this.facultyOrder, result[0])),
            this.orderCourse(this.faculty);
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
    this.db.list("/" + (this.faculty.id - 1)).set("name", newName.target.value);
  }

  departmentNameEditSaveBtn() {
    console.log(this.inputValue);
    this.db.list("/" + (this.faculty.id - 1)).set("name", this.inputValue);
  }

  departmentDeactivate() {
    console.log(this.faculty.name);
    this.db.list("/" + (this.faculty.id - 1)).set("isActive", false);
  }

  departmentActivate() {
    console.log(this.faculty.name);
    this.db.list("/" + (this.faculty.id - 1)).set("isActive", true);
  }

  departmentFacEdit(newName) {
    console.log(newName.target.value);
    this.db
      .list("/" + (this.faculty.id - 1) + "/" + "faculties")
      .set("0", newName.target.value);
  }

  departmentFacEditSaveBtn() {
    console.log(this.inputValue);
    this.db
      .list("/" + (this.faculty.id - 1) + "/" + "faculties")
      .set("0", this.inputValue);
  }

  departmentFacAdd(newName) {
    console.log(newName.target.value);
    this.db
      .list("/" + (this.faculty.id - 1) + "/" + "faculties")
      .set("" + this.faculty.faculties.length, newName.target.value);
  }

  departmentReqCourseEdit(newName, index) {
    console.log(newName.target.value);
    let i;
    let newArray = newName.target.value.split(",");
    for (i = 0; i < newArray.length; i++) {
      this.db
        .list(
          "/" +
            (this.faculty.id - 1) +
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
            (this.faculty.id - 1) +
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
          (this.faculty.id - 1) +
          "/" +
          "requirements" +
          "/" +
          index +
          "/" +
          "papers"
      )
      .set(
        "" + this.faculty.requirements[index].papers.length,
        newName.target.value
      );
  }
}
