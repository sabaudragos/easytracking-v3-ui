import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {SideNavService} from "../service/side-nav-service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isSideNavOn = false;

  constructor(private sideNavService: SideNavService) {
    sideNavService.sideNavOn.subscribe(isSideNavOn => this.isSideNavOn = isSideNavOn);
  }

  ngOnInit() {
  }

  openSideNav() {
    this.isSideNavOn = !this.isSideNavOn;
    this.sideNavService.announceSideNavOn(this.isSideNavOn);
  }

}
