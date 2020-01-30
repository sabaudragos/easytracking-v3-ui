import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatDialogModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatRadioModule,
  MatSelectModule,
  MatSidenavModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule, MatToolbarModule
} from "@angular/material";
import {LoginComponent} from './login/login.component';
import {SprintComponent} from './sprint/sprint.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {RouterModule, Routes} from "@angular/router";
import {ToastContainerModule, ToastrModule} from 'ngx-toastr';
import {LOCAL_STORAGE_SERVICE, LocalStorageService} from "./service/localstorage-service";
import {LOCAL_STORAGE} from "ngx-webstorage-service";
import {AuthGuard} from "./guard/auth-guard";
import {UserService} from "./service/user-service";
import {AuthService} from "./service/auth-service";
import {BasicAuthInterceptor} from "./interceptor/basic-auth-interceptor.service";
import {HeaderComponent} from './header/header.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SprintService} from "./service/sprint-service";
import {TaskService} from "./service/task-service";
import {SprintDialogComponent} from './dialog/sprint-dialog/sprint-dialog.component';
import {TaskDialogComponent} from './dialog/task-dialog/task-dialog.component';
import {RemoveDialogComponent} from './dialog/remove-dialog/remove-dialog.component';
import {SideNavService} from "./service/side-nav-service";
import {SprintAdminComponent} from './sprint/sprint-admin/sprint-admin.component';
import { UserAdminComponent } from './user/user-admin/user-admin.component';
import { UserComponent } from './user/user.component';
import { UserDialogComponent } from './dialog/user-dialog/user-dialog.component';
import { SideDrawerContentComponent } from './side-drawer-content/side-drawer-content.component';

const appRoutes: Routes = [
  {path: '', redirectTo: 'tasks/sprint/current', pathMatch: 'full', canActivate: [AuthGuard]},
  {path: 'sprint/admin', component: SprintAdminComponent, canActivate: [AuthGuard]},
  {path: 'tasks/sprint/:id', component: SprintComponent, canActivate: [AuthGuard]},
  {path: 'user/admin', component: UserAdminComponent, canActivate: [AuthGuard]},
  {path: 'user', component: UserComponent, canActivate: [AuthGuard]},
  {path: 'main-menu', component: HeaderComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SprintComponent,
    HeaderComponent,
    SprintDialogComponent,
    TaskDialogComponent,
    RemoveDialogComponent,
    SprintAdminComponent,
    UserAdminComponent,
    UserComponent,
    UserDialogComponent,
    SideDrawerContentComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatMenuModule,
    MatCardModule,
    MatToolbarModule,
    MatTableModule,
    MatStepperModule,
    MatPaginatorModule,
    MatSortModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    MatGridListModule,
    MatSelectModule,
    ToastrModule.forRoot(),
    ToastContainerModule,
    MatDialogModule,
    MatIconModule
  ],
  exports: [MatButtonModule, MatCheckboxModule],
  providers: [
    AuthGuard,
    AuthService,
    UserService,
    SprintService,
    TaskService,
    SideNavService,
    LocalStorageService,
    ToastrModule,
    {provide: LOCAL_STORAGE_SERVICE, useExisting: LOCAL_STORAGE},
    {provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
