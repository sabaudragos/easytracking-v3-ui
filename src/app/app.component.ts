import {Component, ElementRef, ViewChild} from '@angular/core';
import {AuthService} from "./service/auth-service";
import {SideNavService} from "./service/side-nav-service";
import {MatSidenav} from "@angular/material";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'easytracking-v3-ui';
  @ViewChild('drawer', {static: true}) drawer: MatSidenav;

  constructor(public authService: AuthService,
              private sideNavService: SideNavService) {

  }

  ngAfterViewInit() {
    this.sideNavService.sideNavOn.subscribe(isOn => {
      console.log("Inside subscribe: " + isOn);
      this.drawer.toggle();
    })
  }
}
