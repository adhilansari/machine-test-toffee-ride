import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor() { }
  isLoading = new Subject<boolean>();
  // show interceptor
  show() {
      this.isLoading.next(true);
  }
  // hide interceptor
  hide() {
      this.isLoading.next(false);
  }
}
