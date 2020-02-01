import {Component, OnInit} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../service/auth-service";
import {Router} from "@angular/router";
import {SideNavService} from "../service/side-nav-service";

@Component({
  selector: 'app-side-drawer-content',
  templateUrl: './side-drawer-content.component.html',
  styleUrls: ['./side-drawer-content.component.css']
})
export class SideDrawerContentComponent implements OnInit {

  constructor(private authService: AuthService,
              private sideNavService: SideNavService,
              private router: Router,
              private toastr: ToastrService) {
  }

  ngOnInit() {
  }

  onLogoutClick() {
    this.authService.logOut()
  }

  onLoginClick() {
  }

  onProfileClick() {
    this.sideNavService.announceSideNavOn();
    this.router.navigateByUrl("/user")
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
}
