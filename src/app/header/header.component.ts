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
    sideNavService.sideNavOn.subscribe(isSideNavOn => this.isSideNavOn = isSideNavOn);
  }

  ngOnInit() {
  }

  openSideNav() {
    this.isSideNavOn = !this.isSideNavOn;
    this.sideNavService.announceSideNavOn(this.isSideNavOn);
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
    this.router.navigateByUrl("/user/admin")
  }

  onLogoClick() {
    this.router.navigateByUrl("");
  }

  isAdmin(): boolean {
    return this.localStorage.get('user_id') === 1;
  }
}
