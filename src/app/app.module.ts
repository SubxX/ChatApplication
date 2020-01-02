import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule, Allroutes } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { ApiServiceService } from './Api Methods/api-service.service';
import { ChatapplicationComponent } from './components/chatapplication/chatapplication.component';
import { AuthGuard } from './authguard/auth.guard';
import { InterceptorService } from './interceptor/interceptor.service';
import { NgxAutoScrollModule } from 'ngx-auto-scroll';

@NgModule({
  declarations: [
    AppComponent,
    Allroutes
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    NgxAutoScrollModule
  ],
  providers: [ApiServiceService, AuthGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
