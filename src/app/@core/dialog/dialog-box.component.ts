import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";

import { Component, EventEmitter, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { PlansService } from "../data/plans.service";
import { ThrowStmt } from "@angular/compiler";
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";
import { formatDate } from "@angular/common";
import { AuthService } from "app/auth/auth-service.service";


@Component({
  selector: "dialog-box",
  templateUrl: "./dialog-box.template.html",
  styleUrls: ["./dialog-box.component.scss"],
})

export class DialogBoxComponent implements OnInit {
  form: FormGroup;
  description: string;

  public email: string;
  private name: string;
  private url;
  private toggle = false;
  private onPageChange = new EventEmitter<null>();
  public notes: string;
  public studentEmail;

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogBoxComponent>,
    private plansService: PlansService,
    private authService: AuthService,

    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.description = data.description;
    this.studentEmail = data.email;
    // this.userService.getCurrentUser().then( (user) => {this.name = user.displayName, this.email = user.email})
  }

saveNotes():any{
  let timestamp = Date.now();
  let timestampString = formatDate(timestamp, 'dd/MM/yyyy, h:mm a', 'en')
  this.plansService.setNotes(this.notes, this.studentEmail, timestampString, this.authService.userDetails.email)
  // this.plansService.sendNotes(this.notes)
}

  ngOnInit() {
    this.form = this.fb.group({
      description: [this.description, []],
    });
  }

  save() {
    this.dialogRef.close();
    this.plansService.setExportStatus(this.studentEmail);
  }

  close() {
    this.dialogRef.close();
  }

}
