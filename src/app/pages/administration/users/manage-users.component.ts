import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: "manage-users",
  styleUrls: ["./manage-users.component.scss"],
  template: `
    <nb-card>
      <nb-card-header> Manage Users </nb-card-header>
      <nb-card-header>
        Search by User Email
        <button
          class="btn_close"
          [routerLink]="['/manage-users']"
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
          (blur)="hideInput()"
          (input)="onInput($event)"
        />
      </nb-card-body>
      <ul>
        <div *ngIf="user">
          <div *ngIf="userOrder.email"><b>Email</b>: {{ userOrder.email }}</div>

          <div *ngIf="userOrder.name"><b>Name</b>: {{ userOrder.name }}</div>

          <div *ngIf="userOrder.role"><b>Role</b>: {{ userOrder.role }}
            <button class="btn_edit" (click)="this.canEditRole = true">
              Edit Role
            </button>
          </div>
          <input
          (keyup)="onKey($event)"
          *ngIf="this.canEditRole"
          type="text"
          class="form-control"
          (keydown.enter)="editRole(userOrder.email, $event)"
        />
          
        </div>
      </ul>
    </nb-card>
  `,
})
export class ManageUsersComponent {
  public user;
  public userOrder;
  public inputValue;

  public canEditRole = false;

  constructor(private db: AngularFirestore, public afAuth: AngularFireAuth) {
    this.userOrder = {
      name: null,
      email: null,
      role: null,
    };
  }

  @ViewChild("input", { static: true }) input: ElementRef;

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
    if (val !== "") {
      this.userOrder = {};
      this.db
        .collection("users") // Here is where we set the docID to the email so its accessible in the database.
        .doc(val)
        .get()
        .toPromise()
        .then((result) => this.assignUserResult(result.data()));
    } else {
      //  this.db.list('/').valueChanges().subscribe(result => console.log(result))
    }
  }

  save(event) {
    console.log("You entered: ", event.target.value);
    this.searchFirebase(event.target.value);
  }

  close() {}

  assignUserResult(user) {
    this.user = Object.assign(this.userOrder, user);
    console.log(this.user);
  }


  editRole(email, val) {

    console.log("Email: ", email, " val: ", val.target.value)

    this.db
    .collection("users") 
    .doc(email) // Here is where we set the docID to the email so its accessible in the database.
    .update({role: val.target.value})

    this.userOrder = {};
    this.db
      .collection("users") // Here is where we set the docID to the email so its accessible in the database.
      .doc(email)
      .get()
      .toPromise()
      .then((result) => this.assignUserResult(result.data()));

      this.canEditRole = false;

  }
}
