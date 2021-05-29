import { Injectable } from '@angular/core';
import {SnackBarService} from "./snack-bar.service";
import {HttpErrorResponse, HttpEvent} from "@angular/common/http";
import {Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HandleErrorService {

  constructor(private snackBar:SnackBarService) { }

  public handleError(err: HttpErrorResponse) : Observable<HttpEvent<any>> {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      errorMessage = err.error.errors == undefined ? err.message : err.error.errors[0].description;
    }
    this.snackBar.showMessage(errorMessage);
    return throwError(err);
  }
}
