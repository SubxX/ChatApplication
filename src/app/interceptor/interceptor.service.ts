import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { ApiServiceService } from '../Api Methods/api-service.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private api: ApiServiceService) { }
  intercept(req, next) {
    const token = this.api.getToken();
    const headersConfig = {};
    if (token) {
      headersConfig['authorization'] = token;
    }
    const clone = req.clone({ setHeaders: headersConfig });
    return next.handle(clone);
  }
}
