import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule, Allroutes } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { ApiServiceService } from './Api Methods/api-service.service';
import { AuthGuard } from './authguard/auth.guard';
import { InterceptorService } from './interceptor/interceptor.service';
import { NgxAutoScrollModule } from 'ngx-auto-scroll';
import { VerificationSentComponent } from './components/home-pages/verification-sent/verification-sent.component';
import { RouterModule } from '@angular/router';
import { ProfileconfigService } from './Observables/profileconfigobservable/profileconfig.service';
import { CurrentuserService } from './Observables/currentUserObservable/currentuser.service';
@NgModule({
  declarations: [
    AppComponent,
    Allroutes,
    VerificationSentComponent
  ],
  imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    NgxAutoScrollModule
  ],
  providers: [ApiServiceService, ProfileconfigService, CurrentuserService, AuthGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
