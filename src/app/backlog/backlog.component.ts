import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Task} from '../model/task';
import {Sprint} from '../model/sprint';
import {User} from '../model/user';
import {SprintService} from '../service/sprint-service';
import {TaskService} from '../service/task-service';
import {UserService} from '../service/user-service';
import {ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Util} from '../util/util';
import {BoardItemStatusEnum} from '../util/board-item-status-enum';
import {TaskDialogComponent} from '../dialog/task-dialog/task-dialog.component';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.css']
})
export class BacklogComponent implements OnInit {
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
    // get backlog is a collection of tasks that do not have the sprint set
    this.taskService.getAll().subscribe(
      (response: Task[]) => {
        if (response && response.length > 0) {
          // this.task = response;

          let sprintId = this.route.snapshot.params['id'];
          if (!Util.isNullOrUndefined(sprintId)) {
            this.currentSprint = this.sprintList[0];
            if (sprintId === 'current') {
              sprintId = this.currentSprint.id;
            }
            this.taskService.getTasksBySprintId(sprintId).subscribe(
              (response) => {
                this.dataSource = new MatTableDataSource(response);
                this.dataSource.sort = this.sort;
                this.dataSource.paginator = this.paginator;
              },
              (error) => console.log('Something went wrong while fetching tasks for sprint ' + sprintId)
            );
          }
        }
      },
      (error) => console.log('Error fetching all sprints' + error)
    );

    this.userService.getAllUsers().subscribe(
      (response) => {
        if (response) {
          this.allUsers = response;
        }
      },
      (error) => console.log('Something went wrong while fetching the users')
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
      (error) => console.log('Something went wrong while fetching tasks for sprint' + error)
    );
  }

  addNewTask() {
    let boardItemForm: FormGroup = this.formBuilder.group({
      'id': new FormControl(null),
      'title': new FormControl('', Validators.required),
      'description': new FormControl(''),
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

}
