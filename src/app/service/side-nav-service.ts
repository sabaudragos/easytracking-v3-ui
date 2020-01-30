import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export class SideNavService {

  constructor() {
  }

  // Observable string sources
  private sideNavOnSource = new Subject<boolean>();

  // Observable string streams
  sideNavOn = this.sideNavOnSource.asObservable();

  // Service message commands
  announceSideNavOn() {
    this.sideNavOnSource.next();
  }
}
