import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {TaskService} from "../../service/task-service";

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

  deleteTask(data: any) {
    let taskId: number = data.boardItemForm.controls['id'].value;
    let userStoryId: number = data.userStoryId;

    this.taskService.delete(taskId);
      // .subscribe((response) => {
      //     if (response == null) {
      //       console.log('Task was removed.');
      //       let taskList = this.userStories.find(userStory => userStory.id === userStoryId).tasks;
      //       const indexOfTask = taskList.findIndex(task => task.id === taskId);
      //       taskList.splice(indexOfTask, 1);
      //       this.changeUserStoryList.emit(this.userStories);
      //     }
      //   },
      //   (error) => console.log(error)
      // );
    this.dialogRef.close();
  }

}
