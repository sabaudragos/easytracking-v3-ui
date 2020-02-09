import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSortModule} from '@angular/material/sort';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import {LoginComponent} from './login/login.component';
import {SprintComponent} from './sprint/sprint.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ToastContainerModule, ToastrModule} from 'ngx-toastr';
import {LOCAL_STORAGE_SERVICE, LocalStorageService} from './service/localstorage-service';
import {LOCAL_STORAGE} from 'ngx-webstorage-service';
import {AuthGuard} from './guard/auth-guard';
import {UserService} from './service/user-service';
import {AuthService} from './service/auth-service';
import {BasicAuthInterceptor} from './interceptor/basic-auth-interceptor.service';
import {HeaderComponent} from './header/header.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SprintService} from './service/sprint-service';
import {TaskService} from './service/task-service';
import {SprintDialogComponent} from './dialog/sprint-dialog/sprint-dialog.component';
import {TaskDialogComponent} from './dialog/task-dialog/task-dialog.component';
import {RemoveDialogComponent} from './dialog/remove-dialog/remove-dialog.component';
import {SideNavService} from './service/side-nav-service';
import {SprintAdminComponent} from './sprint/sprint-admin/sprint-admin.component';
import {UserAdminComponent} from './user/user-admin/user-admin.component';
import {UserComponent} from './user/user.component';
import {UserDialogComponent} from './dialog/user-dialog/user-dialog.component';
import {SideDrawerContentComponent} from './side-drawer-content/side-drawer-content.component';
import {BacklogComponent} from './backlog/backlog.component';
import {AppRoutingModule} from './app-routing.module';
import {MatExpansionModule} from '@angular/material/expansion';
import {TasksTableComponent} from './tasks-table/tasks-table.component';
import {BacklogService} from './service/backlog-service';

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
    SideDrawerContentComponent,
    BacklogComponent,
    TasksTableComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatMenuModule,
    MatCardModule,
    MatExpansionModule,
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
    BacklogService,
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
