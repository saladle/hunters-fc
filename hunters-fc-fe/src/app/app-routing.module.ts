import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/auth.guard';
import { LoginScreenComponent } from './routes/auth/login-screen/login-screen.component';
import { HomeComponent } from './routes/home/home.component';
import { DashboardScreenComponent } from './routes/home/dashboard-screen/dashboard-screen.component';
import { Role } from './constants/enums';
import { AdminComponent } from './routes/admin/admin.component';
import { MatchManagementComponent } from './routes/admin/match-management/match-management.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home/dashboard' },
  { path: 'login', component: LoginScreenComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [{ path: 'dashboard', component: DashboardScreenComponent }],
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { role: [Role.Admin] },
    children: [
      { path: 'match-management', component: MatchManagementComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
