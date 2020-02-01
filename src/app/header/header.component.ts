import {Component, OnInit} from '@angular/core';
import {SideNavService} from "../service/side-nav-service";
import {AuthService} from "../service/auth-service";
import {Router} from "@angular/router";
import {LocalStorageService} from "../service/localstorage-service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isSideNavOn = false;

  constructor(private sideNavService: SideNavService,
              private authService: AuthService,
              private localStorage: LocalStorageService,
              private router: Router) {
  }

  ngOnInit() {
  }

  openSideNav() {
    this.sideNavService.announceSideNavOn();
  }

  logout() {
    this.authService.logOut();
  }

  onProfileClick() {
    this.router.navigateByUrl("/user")
  }

  onSprintAdminClick() {
    this.router.navigateByUrl("/sprint/admin")
  }

  onUserAdminClick() {
    this.router.navigateByUrl("/admin/users")
  }

  onLogoClick() {
    this.router.navigateByUrl("");
  }

  isAdmin(): boolean {
    return this.authService.isAuthenticated() && (<string>this.localStorage.get('roles')).includes('admin');
  }
}
