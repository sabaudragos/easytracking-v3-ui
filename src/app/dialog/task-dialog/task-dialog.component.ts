import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {TaskService} from "../../service/task-service";
import {User} from "../../model/user";
import {Util} from "../../util/util";

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css']
})
export class TaskDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<TaskDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private taskService: TaskService) {
  }

  ngOnInit() {
  }

  onNoClick(): void {
    console.log('No data was changed');
    this.dialogRef.close();
  }

  getUserName(user: User): string {
    if (Util.isNullOrUndefined(user)) {
      return 'none';
    } else {
      return user.firstName;
    }
  }
}
