import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Task} from '../model/task';
import {User} from '../model/user';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {SprintService} from '../service/sprint-service';
import {TaskService} from '../service/task-service';
import {UserService} from '../service/user-service';
import {ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Util} from '../util/util';
import {BoardItemStatusEnum} from '../util/board-item-status-enum';
import {TaskDialogComponent} from '../dialog/task-dialog/task-dialog.component';
import {RemoveDialogComponent} from '../dialog/remove-dialog/remove-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-tasks-table',
  templateUrl: './tasks-table.component.html',
  styleUrls: ['./tasks-table.component.css']
})
export class TasksTableComponent implements OnInit {
  @Input() dataSource: MatTableDataSource<Task>;
  @Input() hasFilter: boolean;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  displayedColumns: string[] = ['id', 'title', 'status', 'estimation', 'priority', 'user', 'remove'];
  @Input() allUsers: User[];

  constructor(private sprintService: SprintService,
              private taskService: TaskService,
              private userService: UserService,
              private route: ActivatedRoute,
              private toastr: ToastrService,
              public dialog: MatDialog,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
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
    console.log('It works');
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

          this.taskService.update(task).subscribe(
            (response: Task) => {
              this.dataSource._updateChangeSubscription();
              this.toastr.success('Task was updated');
            },
            (error) => this.toastr.error('Task was not updated'))
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
            this.toastr.success('Task was removed');
          },
          () => this.toastr.error('Task was not removed')
        );
      }
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
