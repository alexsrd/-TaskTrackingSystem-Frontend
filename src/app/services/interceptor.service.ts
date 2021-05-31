import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {SnackBarService} from "./snack-bar.service";
@Injectable()
export class InterceptorService implements HttpInterceptor {

  constructor(private snackBar:SnackBarService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let message:string;
        if(error.error.errors !=undefined)
        {
          message = error.error.errors[0].description;
        }else{
          message = error.error;
        }
        this.snackBar.showMessage(message);
        return throwError(error);
      })
    ) as Observable<HttpEvent<any>>;
  }
}
