import {Injectable} from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AppConstants} from '../util/app-constants';
import {Observable} from 'rxjs';
import {Backlog} from '../model/backlog';

@Injectable()
export class BacklogService {

  constructor(private httpClient: HttpClient) {
  }

  getBacklog(): Observable<Backlog> {
    let authHeader = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.get<Backlog>(AppConstants.BACKLOG_URL, {headers: authHeader});
  }
}
