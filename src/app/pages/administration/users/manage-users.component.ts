import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { FacultyService } from 'app/@core/data/faculty.service';
import { DepartmentService } from 'app/@core/data/department.service';
import { AuthService } from '../../../auth/auth-service.service';

@Component({
  selector: 'manage-users',
  styleUrls: ['./manage-users.component.scss'],
  templateUrl: './manage-users.component.html',
})
export class ManageUsersComponent {
  public user;
  public userOrder;
  public inputValue;

  public isAdmin;

  public faculties;
  public departments;

  public canEditRole = false;

  constructor(private db: AngularFirestore, public afAuth: AngularFireAuth, public facultyService: FacultyService, public departmentService: DepartmentService, public authService: AuthService) {
    this.userOrder = {
      name: null,
      email: null,
      role: null,
    };

    this.faculties = this.facultyService.getFaculties();
    this.departments = this.departmentService.getDepartments();

  }

  @ViewChild('input', { static: true }) input: ElementRef;

  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  isInputShown = false;

  onKey(event) {
    this.inputValue = event.target.value;
  }

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

  searchFirebase(val) {
    if (val !== '') {
      this.userOrder = {};
      this.db
        .collection('users') // Here is where we set the docID to the email so its accessible in the database.
        .doc(val)
        .get()
        .toPromise()
        .then((result) => this.assignUserResult(result.data()));
    } else {
      //  this.db.list('/').valueChanges().subscribe(result => console.log(result))
    }
  }

  save(event) {
    console.log('You entered: ', event.target.value);
    this.searchFirebase(event.target.value);
  }

  close() {}

  assignUserResult(user) {
    this.user = Object.assign(this.userOrder, user);
    console.log(this.user.faculties);
    this.facultyService.getSingleFac(this.user.faculties[0]);
  }

  editRole(email, val) {
    console.log('Email: ', email, ' val: ', val.target.value);

    this.db
      .collection('users')
      .doc(email) // Here is where we set the docID to the email so its accessible in the database.
      .update({ role: val.target.value });

    this.userOrder = {};
    this.db
      .collection('users') // Here is where we set the docID to the email so its accessible in the database.
      .doc(email)
      .get()
      .toPromise()
      .then((result) => this.assignUserResult(result.data()));

    this.canEditRole = false;
  }

  public onFacChange(event) {
    this.db
    .collection('users')
    .doc(this.authService.userDetails.email) // Here is where we set the docID to the email so its accessible in the database.
    .update({faculties: event.source.value});
  }

  public onDeptChange(event) {
    this.db
    .collection('users')
    .doc(this.authService.userDetails.email) // Here is where we set the docID to the email so its accessible in the database.
    .update({department: event.source.value});
    console.log(event.source.value);
  }

}
