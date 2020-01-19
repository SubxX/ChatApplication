import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotfoundpageComponent } from './components/home-pages/notfoundpage/notfoundpage.component';
import { ChatapplicationComponent } from './components/chatapplication/chatapplication.component';
import { ChatwindowComponent } from './components/chatapplication/chatwindow/chatwindow.component';
import { InitViewComponent } from './components/chatapplication/init-view/init-view.component';
import { ProfileComponent } from './components/chatapplication/profile/profile.component';
import { AuthGuard } from './authguard/auth.guard';
import { LoginComponent } from './components/home-pages/login/login.component';
import { RegisterComponent } from './components/home-pages/register/register.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./components/home-pages/home-page/home-page.module').then(m => m.HomePageModule) },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'chatapplication', component: ChatapplicationComponent, canActivate: [AuthGuard],
    children: [
      { path: 'welcome', component: InitViewComponent, canActivate: [AuthGuard] },
      { path: ':sender/:receiver', component: ChatwindowComponent, canActivate: [AuthGuard] },
      { path: 'myprofile', component: ProfileComponent, canActivate: [AuthGuard] }
    ]
  },
  { path: '**', component: NotfoundpageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const Allroutes = [
  NotfoundpageComponent,
  ChatapplicationComponent,
  ChatwindowComponent,
  InitViewComponent,
  ProfileComponent,
  LoginComponent,
  RegisterComponent,
  NotfoundpageComponent
];
