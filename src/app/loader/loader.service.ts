import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {RouteConfigLoadEnd, RouteConfigLoadStart, Router, RouterEvent} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  public showLoader: Subject<boolean>;
  private requestQueue: Array<string>;
  private isLoaderVisible: boolean;

  constructor(
    private router: Router
  ) {
    this.requestQueue = [];
    this.isLoaderVisible = false;
    this.showLoader = new Subject<boolean>();
    router.events.subscribe(
      (event: RouterEvent): void => {
        if (event instanceof RouteConfigLoadStart) {
          if (this.requestQueue.indexOf(event.route.path) < 0) {
            this.requestSent(event.route.path);
          }
          console.log('loading chunk: ', event.route.path);
        } else if (event instanceof RouteConfigLoadEnd) {
          console.log('loaded chunk :', event.route.path);
          this.responseReceived(event.route.path);
        }
      }
    );
  }

  public get _showLoader(): Observable<boolean> {
    return this.showLoader.asObservable();
  }

  public requestSent(url: string): void {
    if (url.indexOf('ignoreLoader=true') === -1) {
      if (url !== 'estimates') {
        this.requestQueue.push(url);
      }
      if (!this.isLoaderVisible && this.requestQueue.length > 0) {
        this.isLoaderVisible = true;
        this.showLoader.next(this.isLoaderVisible);
      }
    }
  }

  public responseReceived(url: string): void {
    if (this.requestQueue.indexOf(url) > -1) {
      this.requestQueue.splice(this.requestQueue.indexOf(url), 1);
      if (this.requestQueue.length === 0) {
        this.isLoaderVisible = false;
        this.showLoader.next(this.isLoaderVisible);
      }
    }
  }
}
