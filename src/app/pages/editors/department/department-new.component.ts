import {
    Component,
    ElementRef,
    EventEmitter,
    Output,
    ViewChild,
  } from "@angular/core";
  import { AngularFireDatabase } from "@angular/fire/database";
  import postInstall from "@nebular/theme/schematics/ng-add/post-install";
  import { DepartmentService } from "../../../@core/data/department.service";
  
  @Component({
    selector: "department-new",
    styleUrls: ["department-new.component.scss"],
    template: ` <nb-card>
      <nb-card-header>
        <button *ngIf="addingDepartment === false" (click)="addNewDepartment()">
          Add New Department
        </button>
      </nb-card-header>
  
      <div *ngIf="addingDepartment === true">
        ID: {{ this.dbIndexNew }}
        <input
          placeholder="Type Department Name Here..."
          (keyup)="onKeyDepartmentName($event)"
          type="text"
          class="form-control"
        />
        <input
          placeholder="Type Papers Here..."
          (keyup)="onKeyDepartmentDesc($event)"
          type="text"
          class="form-control"
        />
        <input
          placeholder="Type Faculties(s) Here..."
          (keyup)="onKeyDepartmentFac($event)"
          type="text"
          class="form-control"
        />
  
        <button (click)="addNewReq()">Add New Requirement</button><button (click)="addComplexReq();">Add New Conjoint Requirement</button>
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
  
        <div *ngFor="let req of [].constructor(reqComplexIndex); let i = index">
        <input
        *ngIf="this.addingReqComplex === true"
        placeholder="How many need to be satisfied"
        (keyup)="onKeyComplexRequirements($event)"
        type="text"
        class="form-control-complex"
      />
      <button *ngIf="this.reqComplex" (click)="complexRuleMulti();">Complex rule</button>
      <div *ngFor="let req of [].constructor(reqComplexRuleIndex); let i = index">
      <input
      *ngIf="this.complexRuleParameters === true"
      placeholder="0 for points or 1 for courses"
      (keyup)="onKeyTypeRequirementsComplex($event)"
      type="text"
      class="form-control-complex"
    />
    <input
      *ngIf="this.complexRuleParameters === true"
      placeholder="Number Required for pre-req"
      (keyup)="onKeyPointRequirementsComplex($event)"
      type="text"
      class="form-control-complex"
    />
  
    <input
      *ngIf="this.complexRuleParameters"
      placeholder="Courses required"
      (keyup)="onKeyCourseRequirementsComplex($event)"
      type="text"
      class="form-control-complex"
    />
    <input
      *ngIf="this.complexRuleParameters"
      placeholder="Require Faculty(s)"
      (keyup)="onKeyFacRequirementsComplex($event)"
      type="text"
      class="form-control-complex"
    />
    <input
      *ngIf="this.complexRuleParameters"
      placeholder="Require Department(s)"
      (keyup)="onKeyDeptRequirementsComplex($event)"
      type="text"
      class="form-control-complex"
    />
    <input
      *ngIf="this.complexRuleParameters"
      placeholder="Require Stage"
      (keyup)="onKeyStageRequirementsComplex($event)"
      type="text"
      class="form-control-complex"
    />
    <input
      *ngIf="this.complexRuleParameters"
      placeholder="Above Stage"
      (keyup)="onKeyAboveStageRequirementsComplex($event)"
      type="text"
      class="form-control-complex"
    />      <BR />
    </div>
    </div>
  
  
        <button (click)="saveNewDepartment()">Save New Department</button>
      </div>
    </nb-card>`,
  })
  export class DepartmentNewComponent {
    public addingDepartment = false;
    public listRef;
    public dbIndexNew;
  
    public reqIndex = 0;
    public reqCourseIndex = 0;
    public reqFacIndex = 0;
    public reqDeptIndex = 0;
    public reqComplexIndex = 0;
    public reqComplexRuleIndex = 0;
  
    public departmentNameValue;
    public departmentTitleValue;
    public departmentCourseValue;
    public departmentDescValue;
    public departmentDeptValue;
    public departmentFacValue;
    public departmentPointsValue;
    public departmentStageValue;
    public departmentCourseRequirementsValue;
    public departmentActiveValue;
  
    public addingReq = false;
  
    public addingReqDepartment = false;
    public addingReqFac = false;
    public addingReqDept = false;
    public addingReqStage = false;
    public addingReqAboveStage = false;
    public addingReqComplex = false;
  
    public reqTypeValue;
    public reqPointValue;
    public reqCourseValue;
    public reqFacValue;
    public reqDeptValue;
    public reqStageValue;
    public reqAboveStageValue;
    public reqComplex;
  
    public reqFacValueArray = [];
    public reqDeptValueArray = [];
    public reqCourseValueArray = [];
  
    public newReqsArray = [];
    public newReqsObject = {};
  
    public complexRuleParameters = false;
    public newReqsComplexArray = [];
    public newReqsComplexObject = {};
    public newReqsComplexRuleObject = {};
  
    constructor(
      public departmentService: DepartmentService,
      private db: AngularFireDatabase
    ) {
      this.listRef = this.db
        .list("/" + "2" + "/" + "departments_admin" + "/", (ref) => ref.orderByChild("id"))
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
  
    onKeyDepartmentName(event) {
      this.departmentNameValue = event.target.value;
    }
    onKeyDepartmentTitle(event) {
      this.departmentTitleValue = event.target.value;
    }
    onKeyDepartmentDesc(event) {
      this.departmentDescValue = event.target.value;
    }
    onKeyDepartmentDept(event) {
      this.departmentDeptValue = event.target.value;
    }
    onKeyDepartmentFac(event) {
      this.departmentFacValue = event.target.value;
    }
    onKeyDepartmentPoints(event) {
      this.departmentPointsValue = event.target.value;
    }
    onKeyDepartmentStage(event) {
      this.departmentStageValue = event.target.value;
    }
    onKeyDepartmentRequirements(event) {
      this.departmentCourseRequirementsValue = event.target.value;
    }
    onKeyDepartmentActive(event) {
      this.departmentActiveValue = event.target.value;
    }
  
    // onKeyTypeRequirements(event, index) { this.reqTypeValue = event.target.value;}
    // onKeyPointRequirements(event, index) { this.reqPointValue = event.target.value;}
    // onKeyDepartmentsRequirements(event, index) { this.reqDepartmentsValue = event.target.value;}
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
  
  
  
    onKeyComplexRequirements(event, index) { this.reqComplex = true, this.newReqsComplexArray[0].required = parseInt(event.target.value);
    }
  
    onKeyTypeRequirementsComplex(event, index) {
      this.newReqsComplexArray[0].complex[this.reqComplexRuleIndex - 1].type = parseInt(event.target.value);
      console.log(this.newReqsComplexArray)
    }
    onKeyPointRequirementsComplex(event, index) {
      this.newReqsComplexArray[0].complex[this.reqComplexRuleIndex - 1].required = parseInt(event.target.value);
      console.log(this.newReqsComplexArray)
    }
    onKeyCourseRequirementsComplex(event, index) {
      this.newReqsComplexArray[0].complex[this.reqComplexRuleIndex - 1].papers = event.target.value;
      console.log(this.newReqsComplexArray)
    }
    onKeyFacRequirementsComplex(event, index) {
      this.newReqsComplexArray[0].complex[this.reqComplexRuleIndex - 1].faculties = event.target.value;
      console.log(this.newReqsComplexArray)
    }
    onKeyDeptRequirementsComplex(event, index) {
      this.newReqsComplexArray[0].complex[this.reqComplexRuleIndex - 1].department = event.target.value;
      console.log(this.newReqsComplexArray)
    }
    onKeyStageRequirementsComplex(event, index) {
      this.newReqsComplexArray[0].complex[this.reqComplexRuleIndex - 1].stage = parseInt(event.target.value);
      console.log(this.newReqsComplexArray)
    }
    onKeyAboveStageRequirementsComplex(event, index) {
      this.newReqsComplexArray[0].complex[this.reqComplexRuleIndex - 1].aboveStage = parseInt(event.target.value);
      console.log(this.newReqsComplexArray)
    }
  
  
  
  
  
    addNewDepartment() {
      this.addingDepartment = true;
      this.testing();
    }
  
    testing() {
      this.listRef.subscribe((ref) => (this.dbIndexNew = ref.length + 1));
    }
  
    newDepartmentName() {
      console.log(this.departmentNameValue);
      this.db
        .list("/" + "2" + "/" + "departments_admin" + "/" + (this.dbIndexNew - 1))
        .set("name", this.departmentNameValue.toUpperCase());
    }
  
    newCourseDept() {
      console.log(this.departmentCourseValue);
      // this.db.list('/' + (this.dbIndexNew - 1)).set('department', this.DepartmentDeptValue)
      this.db
        .list("/" + "2" + "/" + "departments_admin" + "/" + (this.dbIndexNew - 1) + "/" + "department")
        .set("0", this.departmentDeptValue);
    }
  
    newDepartmentFac() {
      console.log(this.departmentFacValue);
      // this.db.list('/' + (this.dbIndexNew - 1)).set('faculties', this.DepartmentFacValue)
      this.db
        .list("/" + "2" + "/" + "departments_admin" + "/" + (this.dbIndexNew - 1) + "/" + "faculties")
        .set("0", this.departmentFacValue);
    }
  
    newDepartmentStage() {
      console.log(this.departmentStageValue);
      this.db
        .list("/" + "2" + "/" + "departments_admin" + "/" + (this.dbIndexNew - 1))
        .set("stage", parseInt(this.departmentStageValue));
    }
  
    newDepartmentPoints() {
      console.log(this.departmentPointsValue);
      this.db
        .list("/" + "2" + "/" + "departments_admin" + "/" + (this.dbIndexNew - 1))
        .set("points", parseInt(this.departmentPointsValue));
    }
  
    newDepartmentActive() {
      console.log(this.departmentActiveValue);
      this.db
        .list("/" + "2" + "/" + "departments_admin" + "/" + (this.dbIndexNew - 1))
        .set("isActive", this.departmentActiveValue.toLowerCase() === "true");
    }
  
    newDepartmentId() {
      this.db.list("/" + "2" + "/" + "departments_admin" + (this.dbIndexNew - 1)).set("id", this.dbIndexNew);
    }
  
    reqTypeNewSaveBtn() {
        for (let i = 0; i < this.newReqsArray.length; i++) {
            console.log(this.newReqsArray)
          if (this.newReqsArray[i].type) {
          this.db
            .list(
              "/" + "2" + "/" + "departments_admin" + "/" +
                (this.dbIndexNew - 1) +
                "/" +
                "requirements" +
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
              "/" + "2" + "/" + "departments_admin" + "/" +
                (this.dbIndexNew - 1) +
                "/" +
                "requirements" +
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
          this.reqCourseValueArray = this.newReqsArray[j].papers.split(",");
          this.reqCourseIndex = this.reqCourseValueArray.length;
          for (let i = 0; i < this.reqCourseIndex; i++) {
        this.db
          .list(
            "/" + "2" + "/" + "departments_admin" + "/" +
              (this.dbIndexNew - 1) +
              "/" +
              "requirements" +
              "/" +
              (j) +
              "/" +
              "papers"
          )
          .set("" + i, this.reqCourseValueArray[i].trim());
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
                "/" + "2" + "/" + "departments_admin" + "/" +
                  (this.dbIndexNew - 1) +
                  "/" +
                  "requirements" +
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
                "/" + "2" + "/" + "departments_admin" + "/" +
                  (this.dbIndexNew - 1) +
                  "/" +
                  "requirements" +
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
              "/" + "2" + "/" + "departments_admin" + "/" +
                (this.dbIndexNew - 1) +
                "/" +
                "requirements" +
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
              "/" + "2" + "/" + "departments_admin" + "/" +
                (this.dbIndexNew - 1) +
                "/" +
                "requirements" +
                "/" +
                this.newReqsArray[i].id
            )
            .set("aboveStage", parseInt(this.newReqsArray[i].aboveStage));
        }
      }
    }
  
    reqComplexInitialRequiredSave() {
      for (let i = 0; i < this.newReqsComplexArray.length; i++) {
          this.db
            .list(
              "/" + "2" + "/" + "departments_admin" + "/" +
                (this.dbIndexNew - 1) +
                "/" +
                "requirements" +
                "/" + this.reqIndex 
            )
            .set('required',this.newReqsComplexArray[i].required)
      }
    }
  
    reqComplexInitialTypeSave() {
      for (let i = 0; i < this.newReqsComplexArray.length; i++) {
          this.db
            .list(
              "/" + "2" + "/" + "departments_admin" + "/" +
                (this.dbIndexNew - 1) +
                "/" +
                "requirements" +
                "/" + this.reqIndex 
            )
            .set('type',this.newReqsComplexArray[i].type)
      }
    }
  
  
    reqComplexSave() {
      for (let i = 0; i < this.newReqsComplexArray.length; i++) {
          this.db
            .list(
              "/" + "2" + "/" + "departments_admin" + "/" +
                (this.dbIndexNew - 1) +
                "/" +
                "requirements" +
                "/" + this.reqIndex 
            )
            .set('complex',this.newReqsComplexArray[i].complex);
      }
      this.reqDeptComplexSaveBtn();
      this.reqFacComplexSaveBtn();
    }
  
    reqFacComplexSaveBtn() {
      for (let j = 0; j < this.newReqsComplexArray.length; j++) {
        if (this.newReqsComplexArray[j].complex[this.reqComplexRuleIndex - 1].faculties) {
          let reqFacValueComplexArray = this.newReqsComplexArray[j].complex[this.reqComplexRuleIndex - 1].faculties.split(",");
          let reqFacComplexIndex = reqFacValueComplexArray.length;
          for (let i = 0; i < reqFacComplexIndex; i++) {
            this.db
              .list(
                "/" + "2" + "/" + "departments_admin" + "/" +
                  (this.dbIndexNew - 1) +
                  "/" +
                  "requirements" +
                  "/" +
                  (j) +
                  "/" +
                  "complex" +
                  "/" +
                  0 +
                  "/" +
                  "faculties"
              )
              .set("" + i, reqFacValueComplexArray[i].trim());
          }
        }
      }
    }
  
    reqDeptComplexSaveBtn() {
      for (let j = 0; j < this.newReqsComplexArray.length; j++) {
        if (this.newReqsComplexArray[j].complex[this.reqComplexRuleIndex - 1].department) {
          let reqDeptValueComplexArray = this.newReqsComplexArray[j].complex[this.reqComplexRuleIndex - 1].department.split(",");
          let reqDeptComplexIndex = reqDeptValueComplexArray.length;
          for (let i = 0; i < reqDeptComplexIndex; i++) {
            this.db
              .list(
                "/" + "2" + "/" + "departments_admin" + "/" +
                  (this.dbIndexNew - 1) +
                  "/" +
                  "requirements" +
                  "/" +
                  (j) +
                  "/" +
                  "complex" +
                  "/" +
                  0 +
                  "/" +
                  "department"
              )
              .set("" + i, reqDeptValueComplexArray[i].trim());
          }
        }
      }
    }
  
  
  
    saveNewDepartment() {
      this.newDepartmentName();
    //   this.newDepartmentDept();
      this.newDepartmentFac();
    //   this.newDepartmentActive();
      this.newDepartmentId();
  
      this.reqTypeNewSaveBtn();
      this.reqPointsNewSaveBtn();
      this.reqCourseNewSaveBtn();
    //   this.reqFacNewSaveBtn();
    //   this.reqDeptNewSaveBtn();
    //   this.reqStageNewSaveBtn();
    //   this.reqAboveStageNewSaveBtn();
    //   this.reqComplexInitialTypeSave();
    //   this.reqComplexInitialRequiredSave();
    //   this.reqComplexSave();
      // this.addingReq = false;
    }
  
    addNewReq() {
      this.addingReq = true;
  
      this.newReqsObject = {
        id: this.reqIndex,
        conjointRequirements: null,
        faculties: null,
        name: null,
        papers: null,
        requirements: null,
      };
  
      this.newReqsArray.push(this.newReqsObject);
      this.reqIndex++;
      console.log(this.newReqsArray);
    }
  
    addComplexReq() {
        console.log("firing ")
        this.addingReqComplex = true;
  
        this.newReqsComplexObject = {
          id: this.reqIndex,
          type: 0,
          required: null,
          complex: [],
        };
        this.reqComplexIndex++;
        this.newReqsComplexArray.push(this.newReqsComplexObject);
  
    }
  
    complexRuleMulti() {
      this.complexRuleParameters = true;
  
      this.newReqsComplexRuleObject = {
        id: this.reqComplexRuleIndex,
        type: null,
        papers: null,
        department: null,
        faculties: null,
        required: null,
        stage: null,
        aboveStage: null,
      };
      this.newReqsComplexArray[0].complex.push(this.newReqsComplexRuleObject)
      console.log(this.newReqsComplexArray);
      this.reqComplexRuleIndex++;
    }
  }
  