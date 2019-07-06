import {Injectable} from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AppConstants} from '../util/app-constants';
import {Observable} from 'rxjs';
import {User} from '../model/user';

@Injectable()
export class UserService {

  constructor(private httpClient: HttpClient) {
  }

  login(user: User): Observable<User> {
    let authHeader = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.post<User>(AppConstants.LOGIN_URL, user, {headers: authHeader});
  }

  create(user: User): Observable<User> {
    let authHeader = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.post<User>(AppConstants.USER_URL, user, {headers: authHeader});
  }

  getAllUsers(): Observable<User[]> {
    let authHeader = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.get<User[]>(AppConstants.USER_URL + '/all', {headers: authHeader});
  }

  update(user: User): Observable<User> {
    let authHeader = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.put<User>(AppConstants.USER_URL, user, {headers: authHeader});
  }

  // updatePassword(user: User): Observable<User> {
  //   let authHeader = new HttpHeaders({'Content-Type': 'application/json'});
  //   return this.httpClient.patch<User>(AppConstants.USER_URL_UPDATE_PASSWORD, user, {headers: authHeader});
  // }

  delete(userId: number) {
    let authHeader = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.delete<User>(AppConstants.USER_URL + '/' + userId, {headers: authHeader});
  }

  checkIfUsernameExists(username: string): Observable<boolean> {
    let authHeader = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.get<boolean>(AppConstants.USER_URL + '/' + username + '/exists', {headers: authHeader});
  }
}
