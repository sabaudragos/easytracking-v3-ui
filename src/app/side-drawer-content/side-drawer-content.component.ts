import {Component, OnInit} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../service/auth-service";

@Component({
  selector: 'app-side-drawer-content',
  templateUrl: './side-drawer-content.component.html',
  styleUrls: ['./side-drawer-content.component.css']
})
export class SideDrawerContentComponent implements OnInit {

  constructor(private authService: AuthService,
              private toastr: ToastrService) {
  }

  ngOnInit() {
  }

  onLogoutClick() {
    this.authService.logOut()
  }

  onLoginClick() {
  }

  onRegisterClick() {
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

}
