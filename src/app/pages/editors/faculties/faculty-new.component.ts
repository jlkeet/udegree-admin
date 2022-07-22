import {
    Component,
    ElementRef,
    EventEmitter,
    Output,
    ViewChild,
  } from "@angular/core";
  import { AngularFireDatabase } from "@angular/fire/database";
  import postInstall from "@nebular/theme/schematics/ng-add/post-install";
  import { FacultyService } from "../../../@core/data/faculty.service";
  
  @Component({
    selector: "faculty-new",
    styleUrls: ["faculty-new.component.scss"],
    template: ` <nb-card>
      <nb-card-header>
        <button *ngIf="addingFaculty === false" (click)="addNewFaculty()">
          Add New Faculty
        </button>
      </nb-card-header>
  
      <div *ngIf="addingFaculty === true">
        ID: {{ this.dbIndexNew }}
        <input
          placeholder="Type Faculty Name Here..."
          (keyup)="onKeyFacultyName($event)"
          type="text"
          class="form-control"
        />
        <input
          placeholder="Type Abbreviation Here..."
          (keyup)="onKeyFacultyAbbrv($event)"
          type="text"
          class="form-control"
        />
  
        <button (click)="addNewReq()">Add New Requirement</button><button (click)="addConjointReq();">Add New Conjoint Requirement</button>
        <div *ngFor="let req of [].constructor(reqIndex); let i = index">
          <input
            *ngIf="this.addingReq === true"
            placeholder="0 for points or 1 for Courses"
            (keyup)="onKeyTypeRequirements($event, i)"
            type="text"
            class="form-control"
          />
          <input
            *ngIf="this.addingReq === true"
            placeholder="Number Required for pre-req"
            (keyup)="onKeyPointRequirements($event, i)"
            type="text"
            class="form-control"
          />
  
          <input
            *ngIf="this.addingReqCourse"
            placeholder="Courses required"
            (keyup)="onKeyCourseRequirements($event, i)"
            type="text"
            class="form-control"
          />
          <input
            *ngIf="this.addingReqFac"
            placeholder="Require Faculty(s)"
            (keyup)="onKeyFacRequirements($event, i)"
            type="text"
            class="form-control"
          />
          <input
            *ngIf="this.addingReqDept"
            placeholder="Require Department(s)"
            (keyup)="onKeyDeptRequirements($event, i)"
            type="text"
            class="form-control"
          />
          <input
            *ngIf="this.addingReqStage"
            placeholder="Require Stage"
            (keyup)="onKeyStageRequirements($event, i)"
            type="text"
            class="form-control"
          />
          <input
            *ngIf="this.addingReqAboveStage"
            placeholder="Above Stage"
            (keyup)="onKeyAboveStageRequirements($event, i)"
            type="text"
            class="form-control"
          />
  
          <button (click)="addingReqCourse = true">Require Course</button
          ><button (click)="addingReqFac = true">Require Faculty(s)</button
          ><button (click)="addingReqDept = true">Require Department(s)</button
          ><button (click)="addingReqStage = true">Require Stage</button
          ><button (click)="addingReqAboveStage = true">
            Require Above Stage</button
          >
        </div>
  
        <div *ngFor="let req of [].constructor(reqConIndex); let i = index">
          <input
            *ngIf="this.addingConReq === true"
            placeholder="0 for points or 1 for Courses"
            (keyup)="onKeyTypeRequirementsConjoint($event, i)"
            type="text"
            class="form-control"
          />
          <input
            *ngIf="this.addingConReq === true"
            placeholder="Number Required for pre-req"
            (keyup)="onKeyPointRequirementsConjoint($event, i)"
            type="text"
            class="form-control"
          />
  
          <input
            *ngIf="this.addingConReqCourse"
            placeholder="Courses required"
            (keyup)="onKeyCourseRequirementsConjoint($event, i)"
            type="text"
            class="form-control"
          />
          <input
            *ngIf="this.addingConReqFac"
            placeholder="Require Faculty(s)"
            (keyup)="onKeyFacRequirementsConjoint($event, i)"
            type="text"
            class="form-control"
          />
          <input
            *ngIf="this.addingConReqDept"
            placeholder="Require Department(s)"
            (keyup)="onKeyDeptRequirementsConjoint($event, i)"
            type="text"
            class="form-control"
          />
          <input
            *ngIf="this.addingConReqStage"
            placeholder="Require Stage"
            (keyup)="onKeyStageRequirementsConjoint($event, i)"
            type="text"
            class="form-control"
          />
          <input
            *ngIf="this.addingConReqAboveStage"
            placeholder="Above Stage"
            (keyup)="onKeyAboveStageRequirementsConjoint($event, i)"
            type="text"
            class="form-control"
          />
  
          <button (click)="addingConReqCourse = true">Require Course</button
          ><button (click)="addingConReqFac = true">Require Faculty(s)</button
          ><button (click)="addingConReqDept = true">Require Department(s)</button
          ><button (click)="addingConReqStage = true">Require Stage</button
          ><button (click)="addingConReqAboveStage = true">
            Require Above Stage</button
          >

    </div>
  
  
        <button (click)="saveNewFaculty()">Save New Faculty</button>
      </div>
    </nb-card>`,
  })
  export class FacultyNewComponent {
    public addingFaculty = false;
    public listRef;
    public dbIndexNew;
  
    public reqIndex = 0;
    public reqFacIndex = 0;
    public reqDeptIndex = 0;


    public reqConIndex = 0;
    public reqConRuleIndex = 0;


    public reqConFacIndex = 0;
    public reqConDeptIndex = 0;
    public reqConCourseIndex = 0;
  
    public facultyNameValue;
    public facultyTitleValue;
    public facultyAbbrvValue;
    public facultyDeptValue;
    public facultyFacValue;
    public facultyPointsValue;
    public facultyStageValue;
    public facultyCourseRequirementsValue;
    public facultyActiveValue;
  
    public addingReq = false;
  
    public addingReqFaculty = false;
    public addingReqFac = false;
    public addingReqDept = false;
    public addingReqStage = false;
    public addingReqAboveStage = false;

    public addingConReq = false;

    public addingConReqCourse = false;
    public addingConReqFac = false;
    public addingConReqDept = false;
    public addingConReqStage = false;
    public addingConReqAboveStage = false;
  
    public reqTypeValue;
    public reqPointValue;
    public reqCourseValue;
    public reqFacValue;
    public reqDeptValue;
    public reqStageValue;
    public reqAboveStageValue;

    public reqConTypeValue;
    public reqConPointValue;
    public reqConCourseValue;
    public reqConFacValue;
    public reqConDeptValue;
    public reqConStageValue;
    public reqConAboveStageValue;


    public reqComplex;
  
    public reqFacValueArray = [];
    public reqDeptValueArray = [];

    public reqConFacValueArray = [];
    public reqConDeptValueArray = [];
    public reqConCourseValueArray = [];
  
    public newReqsArray = [];
    public newReqsObject = {};
  
    public complexRuleParameters = false;
    public newConReqsArray = [];
    public newConReqsObject = {};
    public newConReqsRuleObject = {};
  
    constructor(
      public facultyService: FacultyService,
      private db: AngularFireDatabase
    ) {
      this.listRef = this.db
        .list("/" + "1" + "/" + "faculties_admin" + "/", (ref) => ref.orderByChild("id"))
        .valueChanges();
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
  
    onKeyFacultyName(event) {
      this.facultyNameValue = event.target.value;
    }
    onKeyFacultyTitle(event) {
      this.facultyTitleValue = event.target.value;
    }
    onKeyFacultyAbbrv(event) {
      this.facultyAbbrvValue = event.target.value;
    }
    onKeyFacultyDept(event) {
      this.facultyDeptValue = event.target.value;
    }
    onKeyFacultyFac(event) {
      this.facultyFacValue = event.target.value;
    }
    onKeyFacultyPoints(event) {
      this.facultyPointsValue = event.target.value;
    }
    onKeyFacultyStage(event) {
      this.facultyStageValue = event.target.value;
    }
    onKeyFacultyRequirements(event) {
      this.facultyCourseRequirementsValue = event.target.value;
    }
    onKeyFacultyActive(event) {
      this.facultyActiveValue = event.target.value;
    }
  
    // onKeyTypeRequirements(event, index) { this.reqTypeValue = event.target.value;}
    // onKeyPointRequirements(event, index) { this.reqPointValue = event.target.value;}
    // onKeyFacultysRequirements(event, index) { this.reqFacultysValue = event.target.value;}
    // onKeyFacRequirements(event, index) { this.reqFacValue = event.target.value;}
    // onKeyDeptRequirements(event, index) { this.reqDeptValue = event.target.value;}
    // onKeyStageRequirements(event, index) { this.reqStageValue = event.target.value;}
    // onKeyAboveStageRequirements(event, index) { this.reqAboveStageValue = event.target.value;}
    // onKeyComplexRequirements(event, index) { this.reqComplex = event.target.value;}
  
    onKeyTypeRequirements(event, index) {
      this.newReqsArray[index].type = event.target.value;
    }
    onKeyPointRequirements(event, index) {
      this.newReqsArray[index].required = event.target.value;
    }
    onKeyCourseRequirements(event, index) {
      this.newReqsArray[index].papers = event.target.value;
    }
    onKeyFacRequirements(event, index) {
      this.newReqsArray[index].faculties = event.target.value;
    }
    onKeyDeptRequirements(event, index) {
      this.newReqsArray[index].department = event.target.value;
    }
    onKeyStageRequirements(event, index) {
      this.newReqsArray[index].stage = event.target.value;
    }
    onKeyAboveStageRequirements(event, index) {
      this.newReqsArray[index].aboveStage = event.target.value;
    }
  
  
  
    onKeyTypeRequirementsConjoint(event, index) {
      this.newConReqsArray[index].type = event.target.value;
    }
    onKeyPointRequirementsConjoint(event, index) {
      this.newConReqsArray[index].required = event.target.value;
    }
    onKeyCourseRequirementsConjoint(event, index) {
      this.newConReqsArray[index].papers = event.target.value;
    }
    onKeyFacRequirementsConjoint(event, index) {
      this.newConReqsArray[index].faculties = event.target.value;
    }
    onKeyDeptRequirementsConjoint(event, index) {
      this.newConReqsArray[index].department = event.target.value;
    }
    onKeyStageRequirementsConjoint(event, index) {
      this.newConReqsArray[index].stage = event.target.value;
    }
    onKeyAboveStageRequirementsConjoint(event, index) {
      this.newConReqsArray[index].aboveStage = event.target.value;
    }
  
  
    addNewFaculty() {
      this.addingFaculty = true;
      this.testing();
    }
  
    testing() {
      this.listRef.subscribe((ref) => (this.dbIndexNew = ref.length + 1));
    }
  
    newFacultyName() {
      console.log(this.facultyNameValue);
      this.db
        .list("/" + "1" + "/" + "faculties_admin" + "/" + (this.dbIndexNew - 1))
        .set("name", this.facultyNameValue.toUpperCase());
    }

    newFacultyAbbrv() {
      console.log(this.facultyAbbrvValue);
      this.db
        .list("/" + "1" + "/" + "faculties_admin" + "/" + (this.dbIndexNew - 1))
        .set("abbrv", this.facultyAbbrvValue);
    }
  
    newCourseDept() {
      console.log(this.facultyDeptValue);
      // this.db.list('/' + (this.dbIndexNew - 1)).set('Faculty', this.FacultyDeptValue)
      this.db
        .list("/" + "1" + "/" + "faculties_admin" + "/"+ (this.dbIndexNew - 1) + "/" + "papers")
        .set("0", this.facultyDeptValue);
    }
  
    newFacultyFac() {
      console.log(this.facultyFacValue);
      // this.db.list('/' + (this.dbIndexNew - 1)).set('faculties', this.FacultyFacValue)
      this.db
        .list("/" + "1" + "/" + "faculties_admin" + "/"+ (this.dbIndexNew - 1) + "/" + "faculties")
        .set("0", this.facultyFacValue);
    }
  
    newFacultyStage() {
      console.log(this.facultyStageValue);
      this.db
        .list("/" + "1" + "/" + "faculties_admin" + "/" + (this.dbIndexNew - 1))
        .set("stage", parseInt(this.facultyStageValue));
    }
  
    newFacultyPoints() {
      console.log(this.facultyPointsValue);
      this.db
        .list("/" + "1" + "/" + "faculties_admin" + "/" + (this.dbIndexNew - 1))
        .set("points", parseInt(this.facultyPointsValue));
    }
  
    newFacultyActive() {
      console.log(this.facultyActiveValue);
      this.db
        .list("/" + "1" + "/" + "faculties_admin" + "/" + (this.dbIndexNew - 1))
        .set("isActive", this.facultyActiveValue.toLowerCase() === "true");
    }
  
    newFacultyId() {
      this.db.list("/" + "1" + "/" + "faculties_admin" + "/" + (this.dbIndexNew - 1)).set("id", this.dbIndexNew);
    }
  
    reqTypeNewSaveBtn() {
        for (let i = 0; i < this.newReqsArray.length; i++) {
            console.log(this.newReqsArray)
          if (this.newReqsArray[i].type) {
          this.db
            .list(
              "/" + "1" + "/" + "faculties_admin" + "/"+
                (this.dbIndexNew - 1) +
                "/" +
                "majorRequirements" +
                "/" +
                this.newReqsArray[i].id
            )
            .set("type", parseInt(this.newReqsArray[i].type));
        }
      }
    }
  
    reqPointsNewSaveBtn() {
        for (let i = 0; i < this.newReqsArray.length; i++) {
          if (this.newReqsArray[i].required) {
          this.db
            .list(
              "/" + "1" + "/" + "faculties_admin" + "/"+
                (this.dbIndexNew - 1) +
                "/" +
                "majorRequirements" +
                "/" +
                this.newReqsArray[i].id
            )
            .set("required", parseInt(this.newReqsArray[i].required));
        }
      }
    }
  
    reqCourseNewSaveBtn() {
      for (let j = 0; j < this.newReqsArray.length; j++) {
        if (this.newReqsArray[j].papers) {
          this.reqFacValueArray = this.newReqsArray[j].papers.split(",");
          this.reqFacIndex = this.reqFacValueArray.length;
          for (let i = 0; i < this.reqFacIndex; i++) {
        this.db
          .list(
            "/" + "1" + "/" + "faculties_admin" + "/" +
              (this.dbIndexNew - 1) +
              "/" +
              "majorRequirements" +
              "/" +
              (j) +
              "/" +
              "papers"
          )
          .set("" + i, this.reqFacValueArray[i].trim());
        }
      }
    }
  }
  
    reqFacNewSaveBtn() {
      for (let j = 0; j < this.newReqsArray.length; j++) {
        if (this.newReqsArray[j].faculties) {
          this.reqFacValueArray = this.newReqsArray[j].faculties.split(",");
          this.reqFacIndex = this.reqFacValueArray.length;
          for (let i = 0; i < this.reqFacIndex; i++) {
            this.db
              .list(
                "/" + "1" + "/" + "faculties_admin" + "/"+
                  (this.dbIndexNew - 1) +
                  "/" +
                  "majorRequirements" +
                  "/" +
                  (j) +
                  "/" +
                  "faculties"
              )
              .set("" + i, this.reqFacValueArray[i].trim());
          }
        }
      }
    }
  
    reqDeptNewSaveBtn() {
      for (let j = 0; j < this.newReqsArray.length; j++) {
        if (this.newReqsArray[j].department) {
          this.reqDeptValueArray = this.newReqsArray[j].department.split(",");
          this.reqDeptIndex = this.reqDeptValueArray.length;
          for (let i = 0; i < this.reqDeptIndex; i++) {
            this.db
              .list(
                "/" + "1" + "/" + "faculties_admin" + "/"+
                  (this.dbIndexNew - 1) +
                  "/" +
                  "majorRequirements" +
                  "/" +
                  (j) +
                  "/" +
                  "department"
              )
              .set("" + i, this.reqDeptValueArray[i].trim());
          }
        }
      }
    }
  
    reqStageNewSaveBtn() {
        for (let i = 0; i < this.newReqsArray.length; i++) {
          if (this.newReqsArray[i].stage) {
          this.db
            .list(
              "/" + "1" + "/" + "faculties_admin" + "/"+
                (this.dbIndexNew - 1) +
                "/" +
                "majorRequirements" +
                "/" +
                this.newReqsArray[i].id
            )
            .set("stage", parseInt(this.newReqsArray[i].stage));
        }
      }
    }
  
    reqAboveStageNewSaveBtn() {
        for (let i = 0; i < this.newReqsArray.length; i++) {
          if (this.newReqsArray[i].aboveStage) {
          this.db
            .list(
              "/" + "1" + "/" + "faculties_admin" + "/"+
                (this.dbIndexNew - 1) +
                "/" +
                "majorRequirements" +
                "/" +
                this.newReqsArray[i].id
            )
            .set("aboveStage", parseInt(this.newReqsArray[i].aboveStage));
        }
      }
    }
  
    









    reqConTypeNewSaveBtn() {
      for (let i = 0; i < this.newConReqsArray.length; i++) {
          console.log(this.newConReqsArray)
        if (this.newConReqsArray[i].type) {
        this.db
          .list(
            "/" + "1" + "/" + "faculties_admin" + "/"+
              (this.dbIndexNew - 1) +
              "/" +
              "doubleMajorRequirements" +
              "/" +
              this.newConReqsArray[i].id
          )
          .set("type", parseInt(this.newConReqsArray[i].type));
      }
    }
  }

  reqConPointsNewSaveBtn() {
      for (let i = 0; i < this.newConReqsArray.length; i++) {
        if (this.newConReqsArray[i].required) {
        this.db
          .list(
            "/" + "1" + "/" + "faculties_admin" + "/"+
              (this.dbIndexNew - 1) +
              "/" +
              "doubleMajorRequirements" +
              "/" +
              this.newConReqsArray[i].id
          )
          .set("required", parseInt(this.newConReqsArray[i].required));
      }
    }
  }

  reqConCourseNewSaveBtn() {
    for (let j = 0; j < this.newConReqsArray.length; j++) {
      if (this.newConReqsArray[j].papers) {
        this.reqConCourseValueArray = this.newConReqsArray[j].papers.split(",");
        this.reqConCourseIndex = this.reqConCourseValueArray.length;
        for (let i = 0; i < this.reqConCourseIndex; i++) {
      this.db
        .list(
          "/" + "1" + "/" + "faculties_admin" + "/" +
            (this.dbIndexNew - 1) +
            "/" +
            "doubleMajorRequirements" +
            "/" +
            (j) +
            "/" +
            "papers"
        )
        .set("" + i, this.reqConCourseValueArray[i].trim());
      }
    }
  }
}

  reqConFacNewSaveBtn() {
    for (let j = 0; j < this.newConReqsArray.length; j++) {
      if (this.newConReqsArray[j].faculties) {
        this.reqConFacValueArray = this.newConReqsArray[j].faculties.split(",");
        this.reqConFacIndex = this.reqConFacValueArray.length;
        for (let i = 0; i < this.reqConFacIndex; i++) {
          this.db
            .list(
              "/" + "1" + "/" + "faculties_admin" + "/"+
                (this.dbIndexNew - 1) +
                "/" +
                "doubleMajorRequirements" +
                "/" +
                (j) +
                "/" +
                "faculties"
            )
            .set("" + i, this.reqConFacValueArray[i].trim());
        }
      }
    }
  }

  reqConDeptNewSaveBtn() {
    for (let j = 0; j < this.newConReqsArray.length; j++) {
      if (this.newConReqsArray[j].department) {
        this.reqConDeptValueArray = this.newConReqsArray[j].department.split(",");
        this.reqConDeptIndex = this.reqConDeptValueArray.length;
        for (let i = 0; i < this.reqConDeptIndex; i++) {
          this.db
            .list(
              "/" + "1" + "/" + "faculties_admin" + "/"+
                (this.dbIndexNew - 1) +
                "/" +
                "doubleMajorRequirements" +
                "/" +
                (j) +
                "/" +
                "department"
            )
            .set("" + i, this.reqConDeptValueArray[i].trim());
        }
      }
    }
  }

  reqConStageNewSaveBtn() {
      for (let i = 0; i < this.newConReqsArray.length; i++) {
        if (this.newConReqsArray[i].stage) {
        this.db
          .list(
            "/" + "1" + "/" + "faculties_admin" + "/"+
              (this.dbIndexNew - 1) +
              "/" +
              "doubleMajorRequirements" +
              "/" +
              this.newConReqsArray[i].id
          )
          .set("stage", parseInt(this.newConReqsArray[i].stage));
      }
    }
  }

  reqConAboveStageNewSaveBtn() {
      for (let i = 0; i < this.newConReqsArray.length; i++) {
        if (this.newConReqsArray[i].aboveStage) {
        this.db
          .list(
            "/" + "1" + "/" + "faculties_admin" + "/"+
              (this.dbIndexNew - 1) +
              "/" +
              "doubleMajorRequirements" +
              "/" +
              this.newConReqsArray[i].id
          )
          .set("aboveStage", parseInt(this.newConReqsArray[i].aboveStage));
      }
    }
  }
  
  
  
    saveNewFaculty() {
      this.newFacultyName();
    //   this.newFacultyDept();
      this.newFacultyAbbrv();
    //    this.newFacultyFac();
    //   this.newFacultyActive();
      this.newFacultyId();
  
      this.reqTypeNewSaveBtn();
      this.reqPointsNewSaveBtn();
      this.reqCourseNewSaveBtn();
      this.reqFacNewSaveBtn();
      this.reqDeptNewSaveBtn();
      this.reqStageNewSaveBtn();
      this.reqAboveStageNewSaveBtn();
      // this.addingReq = false;

      this.reqConTypeNewSaveBtn();
      this.reqConPointsNewSaveBtn();
      this.reqConCourseNewSaveBtn();
      this.reqConFacNewSaveBtn();
      this.reqConDeptNewSaveBtn();
      this.reqConStageNewSaveBtn();
      this.reqConAboveStageNewSaveBtn();

    }
  
    addNewReq() {
      this.addingReq = true;
  
      this.newReqsObject = {
        id: this.reqIndex,
        abbrv: null,
        flags: null,
        majorRequirements: null,
        majors: null,
        name: null,
        conjointTotal: null,
        doubleMajorRequirements: null,
      };
  
      this.newReqsArray.push(this.newReqsObject);
      this.reqIndex++;
      console.log(this.newReqsArray);
    }
  
    addConjointReq() {
        console.log("firing ")
        this.addingConReq = true;
  
        this.newConReqsObject = {
          id: this.reqConIndex,
          type: null,
          papers: null,
          department: null,
          faculties: null,
          required: null,
          stage: null,
          aboveStage: null,
        };
        this.newConReqsArray.push(this.newConReqsObject);
        this.reqConIndex++;
        console.log(this.newConReqsArray);
  
    }
  }
  