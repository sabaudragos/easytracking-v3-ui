import {EventEmitter, Inject, Injectable, Output} from '@angular/core';
import {Router} from "@angular/router";
import {LOCAL_STORAGE_SERVICE, LocalStorageService} from "./localstorage-service";
import {UserService} from "./user-service";
import {User} from "../model/user";
import {Util} from "../util/util";

@Injectable()
export class AuthService {
  @Output() changeIsAuthenticated: EventEmitter<boolean> = new EventEmitter();
  @Output() invalidCredentials: EventEmitter<boolean> = new EventEmitter();

  constructor(private router: Router,
              @Inject(LOCAL_STORAGE_SERVICE) public localStorage: LocalStorageService,
              public userService: UserService) {
  }

  logIn(email: string, password: string) {

    let user: User = new User();
    user.email = email;
    user.password = password;
    this.userService.login(user).subscribe((result: User) => {
        if (!Util.isNullOrUndefined(result)) {
          console.log("checking credentials");
          this.changeIsAuthenticated.emit(true);
          this.invalidCredentials.emit(false);
          this.localStorage.set('Authorization', "Basic " + btoa(email + ":" + password));
          this.localStorage.set('user_email', result.email);
          this.localStorage.set('user_id', result.id);
          this.localStorage.set('roles', JSON.stringify(result.roleList));
          this.router.navigate(['']);
        }
      },
      error => {
        console.log(error);
        this.invalidCredentials.emit(true);

      });
  }

  public isAuthenticated(): boolean {
    const basicAuthorization = this.localStorage.get('Authorization');
    return !((basicAuthorization === undefined) || (basicAuthorization === null))
  }

  getToken(): string {
    return this.localStorage.get('Authorization');
  }

  logOut() {
    this.changeIsAuthenticated.emit(false);
    this.localStorage.remove('Authorization');
    this.localStorage.remove('user_email');
    this.localStorage.remove('user_id');
    this.localStorage.remove('roles');
    this.router.navigate(['/login']);
  }
}
