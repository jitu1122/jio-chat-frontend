import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {LoaderService} from './loader.service';
import {startWith} from 'rxjs/internal/operators/startWith';
import {delay} from 'rxjs/operators';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit, OnDestroy {
  public showLoader: Promise<boolean>;
  private loaderSubscription: Subscription;

  constructor(private loaderService: LoaderService) {
    this.showLoader = Promise.resolve(false);
  }

  ngOnInit(): void {
    this.loaderSubscription = this.loaderService._showLoader
      .pipe(
        startWith(null),
        delay(0))
      .subscribe((value: boolean) => {
        this.showLoader = Promise.resolve(value);
      });
  }

  ngOnDestroy(): void {
    if (this.loaderSubscription) {
      this.loaderSubscription.unsubscribe();
    }
  }
}
