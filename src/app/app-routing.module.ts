import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './guard/auth-guard';
import {SprintAdminComponent} from './sprint/sprint-admin/sprint-admin.component';
import {SprintComponent} from './sprint/sprint.component';
import {UserAdminComponent} from './user/user-admin/user-admin.component';
import {UserComponent} from './user/user.component';
import {HeaderComponent} from './header/header.component';
import {LoginComponent} from './login/login.component';
import {BacklogComponent} from './backlog/backlog.component';

const appRoutes: Routes = [
  {path: '', redirectTo: 'tasks/sprint/current', pathMatch: 'full', canActivate: [AuthGuard]},
  {path: 'sprint/admin', component: SprintAdminComponent, canActivate: [AuthGuard]},
  {path: 'tasks/sprint/:id', component: SprintComponent, canActivate: [AuthGuard]},
  {path: 'backlog', component: BacklogComponent, canActivate: [AuthGuard]},
  {path: 'admin/users', component: UserAdminComponent, canActivate: [AuthGuard]},
  {path: 'user', component: UserComponent, canActivate: [AuthGuard]},
  {path: 'main-menu', component: HeaderComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
