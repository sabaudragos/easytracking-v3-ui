import {Component, OnInit} from '@angular/core';
import {UserService} from "../service/user-service";
import {User} from "../model/user";
import {LocalStorageService} from "../service/localstorage-service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: User = User.getBlankUser();

  constructor(private userService: UserService,
              private localStorage: LocalStorageService,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this.userService.getUser(this.localStorage.get('user_id')).subscribe(
      (response) => this.user = response,
      (error) => this.toastr.error('Something went wrong while fetching user data')
    );
  }

  onSave() {
    this.userService.update(this.user).subscribe(
      () => this.toastr.success('User was saved'),
      () => this.toastr.error('User data was not saved'));
  }
}
