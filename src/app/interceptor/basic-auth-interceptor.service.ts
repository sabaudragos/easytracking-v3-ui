import {Injectable} from '@angular/core';
import {AuthService} from '../service/auth-service';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {

  constructor(public authService: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = this.addToken(request);

    return next.handle(request).pipe(catchError((err) => {
      if (err.status === 401) {
        this.authService.logOut();
      }
      return throwError(err);
    }));
  }

  addToken(req: HttpRequest<any>): HttpRequest<any> {
    const headers: any = {};
    const token = this.authService.getToken(); // get the token from a service
    if (token) {
      headers['Authorization'] = token; // add it to the header
      req = req.clone({
        setHeaders: headers
      });
    }
    return req;
  }
}
