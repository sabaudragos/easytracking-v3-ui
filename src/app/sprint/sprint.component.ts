import {Component, OnInit} from '@angular/core';
import {MatDialog, MatTableDataSource} from "@angular/material";
import {Task} from "../model/task";
import {SprintService} from "../service/sprint-service";
import {Sprint} from "../model/sprint";
import {TaskService} from "../service/task-service";
import {ActivatedRoute} from "@angular/router";
import {Util} from "../util/util";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {SprintDialogComponent} from "../dialog/sprint-dialog/sprint-dialog.component";
import {ToastrService} from "ngx-toastr";
import {BoardItemStatusEnum} from "../util/board-item-status-enum";
import {User} from "../model/user";
import {UserService} from "../service/user-service";
import {TaskDialogComponent} from "../dialog/task-dialog/task-dialog.component";
import {isNotNullOrUndefined} from "codelyzer/util/isNotNullOrUndefined";

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.css']
})
export class SprintComponent implements OnInit {
  displayedColumns: string[] =
    ['id', 'title', 'estimation', 'priority', 'user'];
  dataSource = new MatTableDataSource<Task>([]);
  sprintList: Sprint[] = [];
  currentSprint: Sprint = Sprint.getBlankSprint();
  allUsers: User[] = [];

  constructor(private sprintService: SprintService,
              private taskService: TaskService,
              private userService: UserService,
              private route: ActivatedRoute,
              private toastr: ToastrService,
              public dialog: MatDialog,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.sprintService.getAllSprints().subscribe(
      (response: Sprint[]) => {
        if (response && response.length > 0) {
          this.sprintList = response;
          let sprintId = this.route.snapshot.params['id'];
          if (!Util.isNullOrUndefined(sprintId)) {
            this.currentSprint = this.sprintList[0];
            if (sprintId === "current") {
              sprintId = this.currentSprint.id;
            }
            this.taskService.getTasksBySprintId(sprintId).subscribe(
              (response) => this.dataSource = new MatTableDataSource<Task>(response),
              (error) => console.log("Something went wrong while fetching tasks for sprint " + sprintId)
            );
          }
        }
      },
      (error) => console.log("Error fetching all sprints" + error)
    );

    this.userService.getAllUsers().subscribe(
      (response) => {
        if (response) {
          this.allUsers = response;
        }
      },
      (error) => console.log("Something went wrong while fetching the users")
    );
  }

  fetchTasksForSprint(sprintId: number) {
    this.taskService.getTasksBySprintId(sprintId).subscribe(
      (response) => {
        if (response) {
          this.dataSource = new MatTableDataSource<Task>(response);
          this.currentSprint = this.sprintList.find(sprint => sprint.id === sprintId);
        }
      },
      (error) => console.log("Something went wrong while fetching tasks for sprint" + error)
    );
  }

  addNewSprint() {
    // show predefined data
    let sprintFormControlGroup: FormGroup = this.formBuilder.group({
      'sprintNumber': new FormControl(""),
      'startDate': new FormControl(""),
      'endDate': new FormControl(""),
    });

    const dialogRef = this.dialog.open(SprintDialogComponent, {
      data: {
        sprintFormControlGroup,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed');
      if (result != null) {
        let sprint: Sprint = Sprint.getBlankSprint();
        sprint.sprintNumber = result.sprintFormControlGroup.controls['sprintNumber'].value;
        sprint.startDate = result.sprintFormControlGroup.controls['startDate'].value;
        sprint.endDate = result.sprintFormControlGroup.controls['endDate'].value;

        this.sprintService.create(sprint).subscribe(
          (response) => {
            this.sprintList.push(response);
            this.toastr.success("Sprint " + sprint.sprintNumber + ' was created', 'Sprint add')
          },
          (error) => {
            this.toastr.error("Sprint " + sprint.sprintNumber + ' was not created', 'Sprint creation failed');
            console.log(error);
          });
      }
    });
  }

  addNewTask() {
    let boardItemForm: FormGroup = this.formBuilder.group({
      'id': new FormControl(null),
      'name': new FormControl("", Validators.required),
      'description': new FormControl(""),
      'status': new FormControl(BoardItemStatusEnum.NEW),
      'priority': new FormControl(2),
      'estimation': new FormControl(2),
      'user': new FormControl(null, Validators.required)
    });

    const allUsers = this.allUsers;
    const statusList: string[] = [BoardItemStatusEnum.NEW, BoardItemStatusEnum.IN_PROGRSESS,
      BoardItemStatusEnum.IN_REVIEW, BoardItemStatusEnum.DONE];
    const isNew = true;
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      data: {
        boardItemForm,
        allUsers,
        statusList,
        isNew
      }
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        if (result != null) {
          let taskToSave: Task = Task.getBlankTask();
          taskToSave.title = result.boardItemForm.controls['title'].value;
          taskToSave.description = result.boardItemForm.controls['description'].value;
          // taskToSave.status = result.boardItemForm.controls['status'].value;
          taskToSave.priority = result.boardItemForm.controls['priority'].value;
          taskToSave.estimation = result.boardItemForm.controls['estimation'].value;

          taskToSave.user = result.boardItemForm.controls['user'].value;
          let sprint = Sprint.getBlankSprint();
          sprint.id = this.currentSprint.id;
          taskToSave.sprint = sprint;

          this.taskService.create(taskToSave).subscribe(
            (response: Task) => {
              if (isNotNullOrUndefined(this.dataSource.data)) {
                this.dataSource = new MatTableDataSource<Task>([response]);
              } else {
                // this.dataSource.data.push(response);
                // add data to existing table
              }
            },
            (error) => console.log(error));
        }
      });
  }
}
