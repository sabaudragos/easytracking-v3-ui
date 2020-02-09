import {Component, OnInit} from '@angular/core';
import {User} from '../model/user';
import {SprintService} from '../service/sprint-service';
import {TaskService} from '../service/task-service';
import {UserService} from '../service/user-service';
import {ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {FormBuilder} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {BacklogService} from '../service/backlog-service';
import {Backlog} from '../model/backlog';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.css']
})
export class BacklogComponent implements OnInit {
  backlog: Backlog;
  allUsers: User[];

  constructor(private sprintService: SprintService,
              private taskService: TaskService,
              private userService: UserService,
              private backlogService: BacklogService,
              private route: ActivatedRoute,
              private toastr: ToastrService,
              public dialog: MatDialog,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    // get backlog is a collection of tasks that do not have the sprint set
    this.backlogService.getBacklog().subscribe((response: Backlog) => {
        if (response) {
          this.backlog = response;
        }
      },
      (error => this.toastr.error('Error fetching the backlog')));

    this.userService.getAllUsers().subscribe(
      (response) => {
        if (response) {
          this.allUsers = response;
        }
      },
      (error) => console.log('Something went wrong while fetching the users')
    );
  }

  // addNewTask(sprint: Sprint) {
  //   let boardItemForm: FormGroup = this.formBuilder.group({
  //     'id': new FormControl(null),
  //     'title': new FormControl('', Validators.required),
  //     'description': new FormControl(''),
  //     'status': new FormControl(BoardItemStatusEnum.NEW),
  //     'priority': new FormControl(2),
  //     'estimation': new FormControl(2),
  //     'user': new FormControl(null, Validators.required)
  //   });
  //
  //   const allUsers = this.allUsers;
  //   const statusList: string[] = [BoardItemStatusEnum.NEW, BoardItemStatusEnum.IN_PROGRSESS,
  //     BoardItemStatusEnum.IN_REVIEW, BoardItemStatusEnum.DONE];
  //   const dialogRef = this.dialog.open(TaskDialogComponent, {
  //     data: {
  //       boardItemForm,
  //       allUsers,
  //       statusList
  //     }
  //   });
  //
  //   dialogRef.afterClosed()
  //     .subscribe(result => {
  //       if (result != null) {
  //         let taskToSave: Task = Task.getBlankTask();
  //         taskToSave.title = result.boardItemForm.controls['title'].value;
  //         taskToSave.description = result.boardItemForm.controls['description'].value;
  //         taskToSave.status = result.boardItemForm.controls['status'].value;
  //         taskToSave.priority = result.boardItemForm.controls['priority'].value;
  //         taskToSave.estimation = result.boardItemForm.controls['estimation'].value;
  //
  //         taskToSave.user = result.boardItemForm.controls['user'].value;
  //         let sprintDto = Sprint.getBlankSprint();
  //         sprintDto.id = sprint.id;
  //         taskToSave.sprint = sprintDto;
  //
  //         this.taskService.create(taskToSave).subscribe(
  //           (response: Task) => {
  //             this.dataSource.data.push(response);
  //             this.dataSource._updateChangeSubscription();
  //           },
  //           (error) => console.log(error));
  //       }
  //     });
  // }
}
