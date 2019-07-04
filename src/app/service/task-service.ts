import {Injectable} from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Task} from '../model/task';
import {AppConstants} from "../util/app-constants";

@Injectable()
export class TaskService {

  constructor(private httpClient: HttpClient) {
  }

  login(task: Task): Observable<Task> {
    let authHeader = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.post<Task>(AppConstants.LOGIN_URL, task, {headers: authHeader});
  }

  create(task: Task): Observable<Task> {
    let authHeader = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.post<Task>(AppConstants.TASK_URL, task, {headers: authHeader});
  }

  update(task: Task): Observable<Task> {
    let authHeader = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.put<Task>(AppConstants.TASK_URL, task, {headers: authHeader});
  }

  getTasksBySprintId(sprintId: number): Observable<Task[]> {
    let authHeader = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.get<Task[]>(AppConstants.TASK_URL + "/sprint/" + sprintId, {headers: authHeader});
  }

  // updatePassword(task: Task): Observable<Task> {
  //   let authHeader = new HttpHeaders({'Content-Type': 'application/json'});
  //   return this.httpClient.patch<Task>(AppConstants.TASK_URL_UPDATE_PASSWORD, task, {headers: authHeader});
  // }

  delete(taskId: number) {
    let authHeader = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.delete(AppConstants.TASK_URL + '/' + taskId, {headers: authHeader});
  }

}
