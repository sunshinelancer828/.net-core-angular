import { HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, debounceTime } from 'rxjs/operators';
import { User } from '../_models/user';
import { LoaderService } from '../_services/loader.service';

@Injectable({
  providedIn: 'root'
})
export class LoaderInterceptorService implements HttpInterceptor {
  requestCount = 0;

  constructor(private loaderService: LoaderService) { }

  intercept(req, next) {

    this.requestCount++;
    //Loader will be shown for requests that takes more than 1 second
    setTimeout(() => {
      if (this.requestCount > 0) {
        this.loaderService.isLoading.next(true);
      }
    }, 1000);
    return next.handle(req).pipe(
      finalize(
        () => {
          this.requestCount--;
          if (this.requestCount === 0) {
            this.loaderService.isLoading.next(false);
          }
        }
      )
    );
  }
}
