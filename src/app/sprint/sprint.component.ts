import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Task} from '../model/task';
import {SprintService} from '../service/sprint-service';
import {Sprint} from '../model/sprint';
import {TaskService} from '../service/task-service';
import {ActivatedRoute} from '@angular/router';
import {Util} from '../util/util';
import {FormBuilder} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {User} from '../model/user';
import {UserService} from '../service/user-service';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.css']
})
export class SprintComponent implements OnInit {
  tasks: Task[];
  sprintList: Sprint[] = [];
  currentSprint: Sprint = Sprint.getBlankSprint();
  allUsers: User[];

  constructor(private sprintService: SprintService,
              private taskService: TaskService,
              private userService: UserService,
              private route: ActivatedRoute,
              private toastr: ToastrService,
              public dialog: MatDialog,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.loadInitialData();
  }

  private loadInitialData() {
    this.sprintService.getAllSprints().subscribe(
      (response: Sprint[]) => {
        if (response && response.length > 0) {
          this.sprintList = response;
          let sprintId = this.route.snapshot.params['id'];
          if (!Util.isNullOrUndefined(sprintId)) {
            this.currentSprint = this.sprintList[0];
            if (sprintId === 'current') {
              sprintId = this.currentSprint.id;
            }
            this.taskService.getTasksBySprintId(sprintId).subscribe(
              (response) => {
                this.tasks = response;
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
          this.tasks = response;
          this.currentSprint = this.sprintList.find(sprint => sprint.id === sprintId);
        }
      },
      (error) => console.log('Something went wrong while fetching tasks for sprint' + error)
    );
  }

}
