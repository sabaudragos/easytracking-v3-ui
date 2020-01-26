import {Injectable} from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Sprint} from '../model/sprint';
import {AppConstants} from "../util/app-constants";

@Injectable()
export class SprintService {

  constructor(private httpClient: HttpClient) {
  }

  create(sprint: Sprint): Observable<Sprint> {
    let authHeader = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.post<Sprint>(AppConstants.SPRINT_URL, sprint, {headers: authHeader});
  }

  update(sprint: Sprint): Observable<Sprint> {
    let authHeader = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.put<Sprint>(AppConstants.SPRINT_URL, sprint, {headers: authHeader});
  }

  getAllSprints(): Observable<Sprint[]> {
    console.log("url:: " + AppConstants.SPRINT_URL + "/all");
    let authHeader = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.get<Sprint[]>(AppConstants.SPRINT_URL + "/all", {headers: authHeader});
  }

  delete(sprintId: number) {
    let authHeader = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.delete(AppConstants.SPRINT_URL + '/' + sprintId, {headers: authHeader});
  }

}
