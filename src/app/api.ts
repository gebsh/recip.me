import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export const API_URL = new InjectionToken('API URL');

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  public intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    return next.handle(req);

    // I had to comment this out because preflight CORS requests to the API were
    // failing when the extra `X-API-KEY` was present.
    // if (req.method !== 'OPTIONS') {
    //   const apiReq = req.clone({
    //     setHeaders: {
    //       'X-API-KEY': 'HoA',
    //     },
    //   });

    //   return next.handle(apiReq);
    // } else {
    //   return next.handle(req);
    // }
  }
}
