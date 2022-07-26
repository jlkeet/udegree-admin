import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { ConjointService } from "../../../@core/data/conjoint.service"
import { ConjointNewComponent } from './conjoint-new.component';

@Component({
  selector: "conjoint-edit",
  styleUrls: ["./conjoint-edit.component.scss"],
  template: `
    <nb-card>
      <nb-card-header> Conjoint Editor </nb-card-header>
      <nb-card-header>
        Search by Conjoint
        <button
          *ngIf="showCourse === true"
          class="btn_close"
          [routerLink]="['/conjoint-edit']"
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
        <div *ngIf="conjointKeys">
          <div *ngIf="conjointKeys[0] === 'abbrv'">
            <b>Abbreviation</b>: {{ conjointValues[0] }}
          </div>

          <div *ngIf="conjointKeys[1] === 'flags'">
            <b>Flags</b>: {{ conjointValues[1] }}
            <button class="btn_edit" (click)="this.canEditCon = true">
              Edit Flags
            </button>
            <button class="btn_add" (click)="this.canAddCon = true">
              Add Flags
            </button>
            <button
              class="btn_save"
              *ngIf="this.canEditCon === true"
              (click)="conjointFacEditSaveBtn()"
            >
              Save
            </button>
            <button
              *ngIf="this.canEditCon === true"
              (click)="this.canEditCon = false; this.canAddCon = false"
            >
              Cancel
            </button>
          </div>
          <input
            (keyup)="onKey($event)"
            *ngIf="this.canEditCon"
            type="text"
            class="form-control"
            (keydown.enter)="conjointConEdit($event)"
          />
          <input
            (keyup)="onKey($event)"
            *ngIf="this.canAddCon"
            type="text"
            class="form-control"
            (keydown.enter)="conjointConAdd($event)"
          />

          <div *ngIf="conjointKeys[4] === 'name'">
            <b>Name</b>: {{ conjointValues[4] }}

            <button class="btn_edit" (click)="this.canEditName = true">
              Edit Name
            </button>
            <button
              class="btn_save"
              *ngIf="this.canEditName === true"
              (click)="conjointNameEditSaveBtn()"
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
            (keydown.enter)="conjointNameEdit($event)"
          />

          <div *ngIf="conjointKeys[3] === 'majors'">
            <b>Majors</b>: {{ conjointValues[3] }}

            <button class="btn_edit" (click)="this.canEditDesc = true">
              Edit Majors
            </button>
            <button
              class="btn_save"
              *ngIf="this.canEditDesc === true"
              (click)="conjointDescEditSaveBtn()"
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
            (keydown.enter)="conjointDescEdit($event)"
          />
          <BR />
          <div *ngIf="conjointKeys[2] === 'majorRequirements'">
            <b>Major Requirements</b>
            <BR />
            <div *ngFor="let req of conjointValues[2]; index as i">
              <b>Faculties</b>: {{ req.faculties }}
              <button class="btn_edit" (click)="this.canEditReqCourse = true">
                Edit Faculties
              </button>
              <button class="btn_add" (click)="this.canAddReqCourse = true">
                Add Faculties
              </button>
              <button
                class="btn_save"
                *ngIf="this.canEditReqCourse === true"
                (click)="conjointReqCourseEditSaveBtn(index)"
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
                (keydown.enter)="conjointReqCourseEdit($event, i)"
              />
              <input
                (keyup)="onKey($event)"
                *ngIf="this.canAddReqCourse"
                type="text"
                class="form-control"
                (keydown.enter)="conjointReqCourseAdd($event, i)"
              />

              <b>Required</b>: {{ req.required }}
              <button class="btn_edit" (click)="this.canEditReqPoints = true">
                Edit Points
              </button>
              <button
                class="btn_save"
                *ngIf="this.canEditReqPoints === true"
                (click)="conjointReqPointsEditSaveBtn(index)"
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
                (keydown.enter)="conjointReqPointsEdit($event, i)"
              />
            </div>
          </div>

          <div *ngIf="conjointKeys[5] === 'conjointTotal'">
          <b>Conjoint Total</b>: {{ conjointValues[5][0].required }}

          <button class="btn_edit" (click)="this.canEditDesc = true">
            Edit Conjoint Total
          </button>
          <button
            class="btn_save"
            *ngIf="this.canEditDesc === true"
            (click)="conjointDescEditSaveBtn()"
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
          (keydown.enter)="conjointDescEdit($event)"
        />
        
      </div>
      </ul>
    </nb-card>
    <conjoint-new></conjoint-new>
  `,
})
export class ConjointEditComponent {
  public conjoint;
  public listRef;
  public courseRef;
  public showCourse;
  public inputValue;
  public conjointOrder;
  public conjointKeys;
  public conjointValues;

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

  public canEditSecReqFac = false;  
  public canEditSecReqPoints = false;
  public canEditSecReqAboveStage = false;

  constructor(
    public conjointService: ConjointService,
    private db: AngularFireDatabase
  ) {
    this.listRef = this.db.list("/", (ref) => ref.orderByChild("id"));

    this.conjointOrder = {
      abbrv: null,
      flags: null,
      majorRequirements: null,
      majors: null,
      name: null,
      conjointTotal: null,
      doubleMajorRequirements: null,

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

    // this.db
    // .list("/" + "3" + "/" + "conjoints_admin" + "/", (ref) =>
    //   ref.orderByChild("name")
    // )
    // .valueChanges()
    // .subscribe((result) => { 
    //   console.log(result);
    // });

  }

  orderCourse(conjoint) {
    // console.log(Object.keys(course), Object.values(course))
    this.conjointKeys = Object.keys(conjoint);
    this.conjointValues = Object.values(conjoint);
  }

  searchFirebase(val) {
    if (val !== "") {
      //   this.db.list('/', ref => ref.orderByChild('name').equalTo(val)).valueChanges().subscribe(result => {this.course = Object.assign(this.departmentOrder, result[0]), this.orderCourse(this.course)})
      this.db
        .list("/" + "3" + "/" + "conjoints_admin" + "/", (ref) =>
          ref.orderByChild("name").equalTo(val)
        )
        .valueChanges()
        .subscribe((result) => { 
          (this.conjoint = Object.assign(this.conjointOrder, result[0])),
            this.orderCourse(this.conjoint);
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

    this.canEditSecReqPoints = true;
    this.canEditSecReqFac = true;
    this.canEditSecReqAboveStage = true;
  }

  onKey(event) {
    this.inputValue = event.target.value;
  }

  conjointNameEdit(newName) {
    console.log(newName.target.value);
    this.db.list("/" + "3" + "/" + "conjoints_admin" + "/" + (this.conjoint.id - 1)).set("name", newName.target.value);
  }

  conjointNameEditSaveBtn() {
    console.log(this.inputValue);
    this.db.list("/" + "3" + "/" + "conjoints_admin" + "/" + (this.conjoint.id - 1)).set("name", this.inputValue);
  }

  conjointDeactivate() {
    console.log(this.conjoint.name);
    this.db.list("/" + "3" + "/" + "conjoints_admin" + "/" + (this.conjoint.id - 1)).set("isActive", false);
  }

  conjointActivate() {
    console.log(this.conjoint.name);
    this.db.list("/" + "3" + "/" + "conjoints_admin" + "/" + (this.conjoint.id - 1)).set("isActive", true);
  }

  conjointFacEdit(newName) {
    console.log(newName.target.value);
    this.db
      .list("/" + "3" + "/" + "conjoints_admin" + "/" + (this.conjoint.id - 1) + "/" + "faculties")
      .set("0", newName.target.value);
  }

  conjointFacEditSaveBtn() {
    console.log(this.inputValue);
    this.db
      .list("/" + "3" + "/" + "conjoints_admin" + "/" + (this.conjoint.id - 1) + "/" + "faculties")
      .set("0", this.inputValue);
  }

  conjointFacAdd(newName) {
    console.log(newName.target.value);
    this.db
      .list("/" + "3" + "/" + "conjoints_admin" + "/" + (this.conjoint.id - 1) + "/" + "faculties")
      .set("" + this.conjoint.faculties.length, newName.target.value);
  }

  conjointReqCourseEdit(newName, index) {
    console.log(newName.target.value);
    let i;
    let newArray = newName.target.value.split(",");
    for (i = 0; i < newArray.length; i++) {
      this.db
        .list(
          "/" + "3" + "/" + "conjoints_admin" + "/" +
            (this.conjoint.id - 1) +
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

  conjointReqCourseEditSaveBtn(index) {
    console.log(this.inputValue);
    let i;
    let newArray = this.inputValue.split(",");
    for (i = 0; i < newArray.length; i++) {
      this.db
        .list(
          "/" + "3" + "/" + "conjoints_admin" + "/" +
            (this.conjoint.id - 1) +
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

  conjointReqCourseAdd(newName, index) {
    console.log(newName.target.value);
    this.db
      .list(
        "/" + "3" + "/" + "conjoints_admin" + "/" +
          (this.conjoint.id - 1) +
          "/" +
          "requirements" +
          "/" +
          index +
          "/" +
          "papers"
      )
      .set(
        "" + this.conjoint.requirements[index].papers.length,
        newName.target.value
      );
  }

  conjointSecReqPointsEdit(newName, index) {
    console.log(newName.target.value);
    let i;
    let newArray = newName.target.value.split(",");
    for (i = 0; i < newArray.length; i++) {
      this.db
        .list(
            "/" +
            +"3" +
            "/" +
            "conjoints_admin" +
            "/" +
            (this.conjoint.id - 1) +
            "/" +
            "doubleMajorRequirements" +
            "/" +
            index +
            "/" +
            "required"
        )
        .set("" + i, parseInt(newArray[i]));
      console.log(i);
    }
  }

  conjointSecReqPointsEditSaveBtn(index) {
    console.log(this.inputValue);
    console.log(index)
    let i;
    let newArray = this.inputValue.split(",");
    for (i = 0; i < newArray.length; i++) {
      this.db
        .list(
            "/" +
            +"3" +
            "/" +
            "conjoints_admin" +
            "/" +
            (this.conjoint.id - 1) +
            "/" +
            "doubleMajorRequirements" +
            "/" +
            index +
            "/" +
            "required"
        )
        .set("" + i, parseInt(newArray[i]));
      console.log(i);
    }
  }

  conjointSecReqFacEdit(newName, index) {
    console.log(newName.target.value);
    let i;
    let newArray = newName.target.value.split(",");
    for (i = 0; i < newArray.length; i++) {
      this.db
        .list(
          "/" + "3" + "/" + "conjoints_admin" + "/" +
            (this.conjoint.id - 1) +
            "/" +
            "doubleMajorRequirements" +
            "/" +
            index +
            "/" +
            "faculties"
        )
        .set("" + i, newArray[i]);
      console.log(i);
    }
  }

  conjointSecReqFacEditSaveBtn(index) {
    console.log(this.inputValue);
    let i;
    let newArray = this.inputValue.split(",");
    for (i = 0; i < newArray.length; i++) {
      this.db
        .list(
          "/" + "3" + "/" + "conjoints_admin" + "/" +
            (this.conjoint.id - 1) +
            "/" +
            "doubleMajorRequirements" +
            "/" +
            index +
            "/" +
            "faculties"
        )
        .set("" + i, newArray[i]);
      console.log(i);
    }
  }

  conjointSecReqAboveStageEdit(newName, index) {
    console.log(newName.target.value);
    let i;
    let newArray = newName.target.value.split(",");
    for (i = 0; i < newArray.length; i++) {
      this.db
        .list(
          "/" + "3" + "/" + "conjoints_admin" + "/" +
            (this.conjoint.id - 1) +
            "/" +
            "doubleMajorRequirements" +
            "/" +
            index +
            "/" +
            "aboveStage"
        )
        .set("" + i, parseInt(newArray[i]));
      console.log(i);
    }
  }

  conjointSecReqAboveStageEditSaveBtn(index) {
    console.log(this.inputValue);
    let i;
    let newArray = this.inputValue.split(",");
    for (i = 0; i < newArray.length; i++) {
      this.db
        .list(
          "/" + "3" + "/" + "conjoints_admin" + "/" +
            (this.conjoint.id - 1) +
            "/" +
            "doubleMajorRequirements" +
            "/" +
            index +
            "/" +
            "aboveStage"
        )
        .set("" + i, parseInt(newArray[i]));
      console.log(i);
    }
  }

}
