import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";

import { Component, EventEmitter, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { PlansService } from "../data/plans.service";

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

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogBoxComponent>,
    private plansService: PlansService,

    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.description = data.description;
    // this.userService.getCurrentUser().then( (user) => {this.name = user.displayName, this.email = user.email})
  }

  ngOnInit() {
    this.form = this.fb.group({
      description: [this.description, []],
    });
  }

  save() {
    this.dialogRef.close();
    this.plansService.setExportStatus();
  }

  close() {
    this.dialogRef.close();
  }

}
