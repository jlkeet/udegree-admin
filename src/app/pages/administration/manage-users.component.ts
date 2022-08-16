import {
    Component,
    ElementRef,
    EventEmitter,
    Output,
    ViewChild,
  } from "@angular/core";
  import { AngularFireDatabase } from "@angular/fire/database";
  
  @Component({
    selector: "manage-users",
    styleUrls: ["./manage-users.component.scss"],
    template: `
      <nb-card>
        <nb-card-header> Manage Users </nb-card-header>
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
      </nb-card>
      <conjoint-new></conjoint-new>
    `,
  })
  export class ManageUsersComponent {

    constructor(
      private db: AngularFireDatabase
    ) {};
    }