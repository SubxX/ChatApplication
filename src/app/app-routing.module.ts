import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotfoundpageComponent } from './components/notfoundpage/notfoundpage.component';
import { VerificationSentComponent } from './components/register/verification-sent/verification-sent.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ChatapplicationComponent } from './components/chatapplication/chatapplication.component';
import { AuthGuard } from './authguard/auth.guard';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'chatapplication', component: ChatapplicationComponent, canActivate: [AuthGuard] },
  { path: '**', component: NotfoundpageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const Allroutes = [LoginComponent, RegisterComponent, NotfoundpageComponent, VerificationSentComponent, HomePageComponent];
