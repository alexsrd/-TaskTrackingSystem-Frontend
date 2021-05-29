import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {catchError} from "rxjs/operators";
import {HandleErrorService} from "./handle-error.service";
@Injectable()
export class InterceptorService implements HttpInterceptor {

  constructor(private errorHandler:HandleErrorService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>>{
    return next.handle(req)
      .pipe(
        catchError(this.errorHandler.handleError))
  };
}
