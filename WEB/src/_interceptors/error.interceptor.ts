import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private toastr: ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((errorResponse: HttpErrorResponse) => {
        if (errorResponse) {
          switch (errorResponse.status) {
            case 400:
              const errors = errorResponse.error.errors;
              if (errors) {
                const modalStateErrors = [];
                for (const key in errors) {
                  if (errors[key]) {
                    modalStateErrors.push(errors[key]);
                  }
                }
                throw modalStateErrors.flat();
              } else {
                this.toastr.error('Bad Request', errorResponse.status.toString()); // errorResponse.statusText
              }
              break;
              case 401:
                this.toastr.error('Unauthorized', errorResponse.status.toString()); // errorResponse.statusText
                break;
              case 404:
                this.router.navigateByUrl('/not-found');
                break;
              case 500:
                const navigationExtras: NavigationExtras = { state: { error: errorResponse.error } };
                this.router.navigateByUrl('/server-error', navigationExtras);
                break;
            default:
              this.toastr.error('Something unexpected went wrong');
              console.log(errorResponse);
              break;
          }
        }
        return throwError(errorResponse);
      })
    );
  }
}
