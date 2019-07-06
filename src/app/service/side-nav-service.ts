import {Injectable} from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AppConstants} from '../util/app-constants';
import {Observable, Subject} from 'rxjs';
import {User} from '../model/user';

@Injectable()
export class SideNavService {

  constructor() {
  }

  // Observable string sources
  private sideNavOnAnnouncedSource = new Subject<boolean>();

  // Observable string streams
  sideNavOn = this.sideNavOnAnnouncedSource.asObservable();

  // Service message commands
  announceSideNavOn(sideNavOn: boolean) {
    this.sideNavOnAnnouncedSource.next(sideNavOn);
  }
}
