import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort} from "@angular/material";
import {MatTableDataSource} from "@angular/material/table";
import {Task} from "../model/task";
import {SprintService} from "../service/sprint-service";
import {Sprint} from "../model/sprint";
import {TaskService} from "../service/task-service";
import {ActivatedRoute} from "@angular/router";
import {Util} from "../util/util";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {BoardItemStatusEnum} from "../util/board-item-status-enum";
import {User} from "../model/user";
import {UserService} from "../service/user-service";
import {TaskDialogComponent} from "../dialog/task-dialog/task-dialog.component";
import {RemoveDialogComponent} from "../dialog/remove-dialog/remove-dialog.component";

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.css']
})
export class SprintComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'status', 'estimation', 'priority', 'user', 'remove'];
  dataSource = new MatTableDataSource<Task>([]);
  sprintList: Sprint[] = [];
  currentSprint: Sprint = Sprint.getBlankSprint();
  allUsers: User[] = [];
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

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
              (response) => {
                this.dataSource = new MatTableDataSource(response);
                this.dataSource.sort = this.sort;
                this.dataSource.paginator = this.paginator;
              },
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
          this.dataSource = new MatTableDataSource(response);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.currentSprint = this.sprintList.find(sprint => sprint.id === sprintId);
        }
      },
      (error) => console.log("Something went wrong while fetching tasks for sprint" + error)
    );
  }

  addNewTask() {
    console.log("Testing the build - 21");
    let boardItemForm: FormGroup = this.formBuilder.group({
      'id': new FormControl(null),
      'title': new FormControl("", Validators.required),
      'description': new FormControl(""),
      'status': new FormControl(BoardItemStatusEnum.NEW),
      'priority': new FormControl(2),
      'estimation': new FormControl(2),
      'user': new FormControl(null, Validators.required)
    });

    const allUsers = this.allUsers;
    const statusList: string[] = [BoardItemStatusEnum.NEW, BoardItemStatusEnum.IN_PROGRSESS,
      BoardItemStatusEnum.IN_REVIEW, BoardItemStatusEnum.DONE];
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      data: {
        boardItemForm,
        allUsers,
        statusList
      }
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        if (result != null) {
          let taskToSave: Task = Task.getBlankTask();
          taskToSave.title = result.boardItemForm.controls['title'].value;
          taskToSave.description = result.boardItemForm.controls['description'].value;
          taskToSave.status = result.boardItemForm.controls['status'].value;
          taskToSave.priority = result.boardItemForm.controls['priority'].value;
          taskToSave.estimation = result.boardItemForm.controls['estimation'].value;

          taskToSave.user = result.boardItemForm.controls['user'].value;
          let sprint = Sprint.getBlankSprint();
          sprint.id = this.currentSprint.id;
          taskToSave.sprint = sprint;

          this.taskService.create(taskToSave).subscribe(
            (response: Task) => {
              this.dataSource.data.push(response);
              this.dataSource._updateChangeSubscription();
            },
            (error) => console.log(error));
        }
      });
  }

  editTask(task: Task) {
    let boardItemForm: FormGroup = this.formBuilder.group({
      'id': new FormControl(task.id),
      'title': new FormControl(task.title, Validators.required),
      'description': new FormControl(task.description),
      'status': new FormControl(task.status),
      'priority': new FormControl(task.priority),
      'estimation': new FormControl(task.estimation),
      'user': new FormControl(task.user, Validators.required)
    });

    const allUsers = this.allUsers;
    const statusList: string[] = [BoardItemStatusEnum.NEW, BoardItemStatusEnum.IN_PROGRSESS,
      BoardItemStatusEnum.IN_REVIEW, BoardItemStatusEnum.DONE];
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      data: {
        boardItemForm,
        allUsers,
        statusList
      }
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        if (result != null) {
          task.title = result.boardItemForm.controls['title'].value;
          task.description = result.boardItemForm.controls['description'].value;
          task.status = result.boardItemForm.controls['status'].value;
          task.priority = result.boardItemForm.controls['priority'].value;
          task.estimation = result.boardItemForm.controls['estimation'].value;

          task.user = result.boardItemForm.controls['user'].value;
          let sprint = Sprint.getBlankSprint();
          sprint.id = this.currentSprint.id;
          task.sprint = sprint;

          this.taskService.update(task).subscribe(
            (response: Task) => {
              this.dataSource._updateChangeSubscription();
              this.toastr.success("Task was updated");
            },
            (error) => this.toastr.error("Task was not updated"))
        }
      });
  }

  getUserName(user: User): string {
    if (Util.isNullOrUndefined(user)) {
      return 'none';
    } else {
      return user.firstName;
    }
  }

  openRemoveDialog(data: Task) {
    const title = data.title;
    const dialogRef = this.dialog.open(RemoveDialogComponent, {
      width: '30%',
      height: '20%',
      minHeight: 170, // assumes px
      data: {
        title
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed');
      if (result != null) {
        this.taskService.delete(data.id).subscribe(
          () => {
            const index = this.dataSource.data.findIndex(task => task.id === data.id);
            this.dataSource.data.splice(index, 1);
            this.dataSource._updateChangeSubscription();
            this.toastr.success("Task was removed");
          },
          () => this.toastr.error("Task was not removed")
        );
      }
    });
  }

// (
// (response) => {
//   // should remove user from organization not from the app
//   if (response == null) {
//   this.toastr.success(name + ' was removed', 'User removed');
// }
// },
// (error) => {
//   this.toastr.error(name + ' was not removed', 'User removal failed');
//   console.log(error);
// })

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
