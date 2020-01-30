import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "./service/auth-service";
import {SideNavService} from "./service/side-nav-service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  @ViewChild('drawer', {static: false}) drawer;
  sideNav;

  constructor(public authService: AuthService,
              private sideNavService: SideNavService) {
    this.sideNav = sideNavService.sideNavOn.subscribe(() => this.drawer.open());
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.sideNav.unsubscribe();
  }
}
