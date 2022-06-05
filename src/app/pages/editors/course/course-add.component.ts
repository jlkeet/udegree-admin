import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { CourseService } from '../../../@core/data/courses'

@Component({
  selector: 'course-add',
  styleUrls: ['./course-edit.component.scss'],
  template: `
    <nb-card>
      <nb-card-header>
        Course Editor
      </nb-card-header>
      <nb-card-header>
      Search by Course Code
      <button *ngIf="showCourse === true" class="btn_close" [routerLink]="['/course-edit']" (click)="close()">Close</button>
    </nb-card-header>
      <nb-card-body>
        <i class="control-icon ion ion-ios-search"
        (click)="showInput()"></i>
     <input (keydown.enter)="save($event)" placeholder="Type your search request here..."
            #input
            [class.hidden]="!isInputShown"
            (blur)="hideInput()"
            (input)="onInput($event)">
            </nb-card-body>  

    <ul>
        <div *ngFor="let courseinfo of course | keyvalue">

        <div *ngIf="courseinfo.key === 'id'"> <b>ID</b>:  {{courseinfo.value}} </div>
        <div *ngIf="courseinfo.key === 'name'"> <b>Name</b>:  {{courseinfo.value}}  <button class="btn_edit" (click)="courseinfo.canEditName = true">Edit Name</button> <button (click)="courseNameDel()">Delete</button> <button (click)="courseinfo.canEditName = false">Cancel</button></div>
        <input *ngIf="courseinfo.canEditName" [(ngModel)]="courseinfo.value" type="text" class="form-control" (keydown.enter)="courseNameEdit($event)"/>
       
        <div *ngIf="courseinfo.key === 'faculties'"> <b>Faculty</b>:  {{courseinfo.value}} <button class="btn_edit" (click)="courseinfo.canEditFac = true">Edit Faculty</button>  <button class="btn_add" (click)="courseinfo.canAddFac = true">Add Faculty</button>  <button (click)="courseinfo.canEditFac = false;courseinfo.canAddFac = false">Cancel</button></div>
        <input *ngIf="courseinfo.canEditFac" [(ngModel)]="courseinfo.value" type="text" class="form-control" (keydown.enter)="courseFacEdit($event)"/>
        <input *ngIf="courseinfo.canAddFac" [(ngModel)]="courseinfo.value" type="text" class="form-control" (keydown.enter)="courseFacAdd($event)"/>


        <div *ngIf="courseinfo.key === 'department'"> <b>Department</b>:  {{courseinfo.value}} <button class="btn_edit" (click)="courseinfo.canEditDept = true">Edit Department</button> <button class="btn_add" (click)="courseinfo.canAddDept = true">Add Department</button> <button (click)="courseinfo.canAddDept = false">Cancel</button></div>
        <input *ngIf="courseinfo.canEditDept" [(ngModel)]="courseinfo.value" type="text" class="form-control" (keydown.enter)="courseDeptEdit($event)"/>
        <input *ngIf="courseinfo.canAddDept" [(ngModel)]="courseinfo.value" type="text" class="form-control" (keydown.enter)="courseDeptAdd($event)"/>

        <div *ngIf="courseinfo.key === 'desc'"> <b>Description</b>:  {{courseinfo.value}} <button class="btn_edit" (click)="courseinfo.canEditDesc = true">Edit Description</button><button (click)="courseinfo.canEditDesc = false">Cancel</button></div>
        <input *ngIf="courseinfo.canEditDesc" [(ngModel)]="courseinfo.value" type="text" class="form-control" (keydown.enter)="courseDescEdit($event)"/>

        <div *ngIf="courseinfo.key === 'points'"> <b>Points</b>:  {{courseinfo.value}} <button class="btn_edit" (click)="courseinfo.canEditPoints = true">Edit Points</button><button (click)="courseinfo.canEditPoints = false">Cancel</button></div>
        <input *ngIf="courseinfo.canEditPoints" [(ngModel)]="courseinfo.value" type="text" class="form-control" (keydown.enter)="coursePointsEdit($event)"/>

        <div *ngIf="courseinfo.key === 'requirements'">
        <b>Requirements</b>:
        <BR>
        <BR>
          <div *ngFor="let req of courseinfo.value | keyvalue ; index as i">
              <b>Papers</b>:  {{req.value.papers}} <button class="btn_edit" (click)="courseinfo.canEditReqCourse = true">Edit Papers</button>  <button class="btn_add" (click)="courseinfo.canAddReqCourse = true">Add Papers</button>  <button (click)="courseinfo.canEditReqCourse = false">Cancel</button><BR> 
              <input *ngIf="courseinfo.canEditReqCourse" [(ngModel)]="courseinfo.value" type="text" class="form-control" (keydown.enter)="courseReqCourseEdit($event, i)"/><BR>
              <input *ngIf="courseinfo.canAddReqCourse" [(ngModel)]="courseinfo.value" type="text" class="form-control" (keydown.enter)="courseReqCourseAdd($event, i)"/><BR>

              <b>Points/Papers required</b>:  {{req.value.required}} <button class="btn_edit" (click)="courseinfo.canEditReqPoints = true">Edit Points</button><button (click)="courseinfo.canEditReqPoints = false">Cancel</button>
              <input *ngIf="courseinfo.canEditReqPoints" [(ngModel)]="courseinfo.value" type="text" class="form-control" (keydown.enter)="courseReqPointsEdit($event, i)"/><BR>
              <BR>
          </div>
        </div>

        <div *ngIf="courseinfo.key === 'stage'"> <b>Stage</b>:  {{courseinfo.value}} <button class="btn_edit" (click)="courseinfo.canEditStage = true">Edit Stage</button><button (click)="courseinfo.canEditStage = false">Cancel</button></div>
        <input *ngIf="courseinfo.canEditStage" [(ngModel)]="courseinfo.value" type="text" class="form-control" (keydown.enter)="courseStageEdit($event)"/>

        <div *ngIf="courseinfo.key === 'title'"> <b>Title</b>:  {{courseinfo.value}} <button class="btn_edit" (click)="courseinfo.canEditTitle = true">Edit Title</button><button (click)="courseinfo.canEditTitle = false">Cancel</button></div>
        <input *ngIf="courseinfo.canEditTitle" [(ngModel)]="courseinfo.value" type="text" class="form-control" (keydown.enter)="courseTitleEdit($event)"/>

        <div *ngIf="courseinfo.key === 'year'"> <b>Year</b>:  {{courseinfo.value}} </div>
        <div *ngIf="courseinfo.key === 'period'"> <b>Period</b>:  {{courseinfo.value}} </div>
        <div *ngIf="courseinfo.key === 'status'"> <b>Status</b>:  {{courseinfo.value}} </div>
        </div>
</ul>
</nb-card>

<nb-card>
<nb-card-header>
<button>Add New Course</button>
</nb-card-header>
</nb-card>

  `,
})
export class CourseEditComponent {

  public course;
  public listRef;
  public courseRef;
  public showCourse;


  constructor(public courseService: CourseService,  private db: AngularFireDatabase) {
     this.listRef = this.db.list('/', ref => ref.orderByChild('id'))
  }
  

    @ViewChild('input', { static: true }) input: ElementRef;

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


    searchFirebase(val) {
      if (val !== '') {
      this.db.list('/', ref => ref.orderByChild('name').equalTo(val)).valueChanges().subscribe(result => this.course = result[0])

      } else {
      //  this.db.list('/').valueChanges().subscribe(result => console.log(result))
      }
    }

    save(event) {
     console.log("You entered: ", event.target.value);
     this.searchFirebase(event.target.value)
     this.showCourse = true;
    }

    close() {
      this.showCourse = false;

    }


    setTitleEdit(item) {
      item.canEditName = this.showCourse;
      item.canEditFac = this.showCourse;
      item.canAddFac = this.showCourse;
      item.canEditDept = this.showCourse;
      item.canAddDept = this.showCourse;
      item.canEditDesc = this.showCourse;
      item.canEditPoints = this.showCourse;
      item.canEditStage = this.showCourse;
      item.canEditTitle = this.showCourse;
      item.canEditReqPoints = this.showCourse;
      item.canEditReqCourse = this.showCourse;
      item.canAddReqCourse = this.showCourse;
    }

    courseNameEdit(newName) {
      console.log(newName.target.value)
      this.db.list('/' + (this.course.id - 1)).set('name', newName.target.value)     
    }

    courseNameDel() {
      console.log(this.course.name)
    //  this.db.list('/' + (this.course.id - 1)).set('name', "")  
    }

    courseFacEdit(newName) {
      console.log(newName.target.value) 
      this.db.list('/' + (this.course.id - 1) + '/' + 'faculties').set('0', newName.target.value)    
    }

    courseFacAdd(newName) {
      console.log(newName.target.value)
      this.db.list('/' + (this.course.id - 1) + '/' + 'faculties').set('' + this.course.faculties.length, newName.target.value)     
    }

    courseDeptEdit(newName) {
      console.log(newName.target.value)
      this.db.list('/' + (this.course.id - 1)).set('department', newName.target.value)     
    }

    courseDeptAdd(newName) {
      console.log(newName.target.value)
      this.db.list('/' + (this.course.id - 1) + '/' + 'department').set('' + this.course.department.length, newName.target.value)     
    }


    courseDescEdit(newName) {
      console.log(newName.target.value)
      this.db.list('/' + (this.course.id - 1)).set('desc', newName.target.value)     
    }


    coursePointsEdit(newName) {
      console.log(newName.target.value)
      this.db.list('/' + (this.course.id - 1)).set('points', newName.target.value)     
    }


    courseStageEdit(newName) {
      console.log(newName.target.value)
      this.db.list('/' + (this.course.id - 1)).set('stage', newName.target.value)     
    }


    courseTitleEdit(newName) {
      console.log(newName.target.value)
      this.db.list('/' + (this.course.id - 1)).set('title', newName.target.value)     
    }


    courseReqPointsEdit(newName, index) {
      console.log(newName.target.value)
      this.db.list('/' + (this.course.id - 1) + '/' + 'requirements' + '/' + index).set('required', newName.target.value)  
    }

    courseReqCourseEdit(newName, index) {
       console.log(newName.target.value)
      let i;
      let newArray = newName.target.value.split(',')
      for (i=0; i < newArray.length; i++) {
       this.db.list('/' + (this.course.id - 1) + '/' + 'requirements' + '/' + index + '/' + 'papers').set("" + i, newArray[i])
       console.log(i)
      }
     }

     courseReqCourseAdd(newName, index) {
      console.log(newName.target.value)
      this.db.list('/' + (this.course.id - 1) + '/' + 'requirements' + '/' + index + '/' + 'papers').set('' + this.course.requirements[index].papers.length, newName.target.value)     
    }

}
