import { BehaviorSubject, Observable } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';

import { Orientation } from '../types/orientation.enum';

@Injectable({
  providedIn: 'root'
})
export class OrientationService {
  private orientationSubject = new BehaviorSubject<Orientation>(this.getCurrentOrientation());
  readonly orientation$: Observable<Orientation> = this.orientationSubject.asObservable();

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver
      .observe(['(orientation: portrait)', '(orientation: landscape)'])
      .subscribe(result => {
        if (result.breakpoints['(orientation: portrait)']) {
          this.orientationSubject.next(Orientation.Portrait);
        } else if (result.breakpoints['(orientation: landscape)']) {
          this.orientationSubject.next(Orientation.Landscape);
        }
      });
  }

  private getCurrentOrientation(): Orientation {
    return window.innerHeight > window.innerWidth
      ? Orientation.Portrait
      : Orientation.Landscape;
  }
}
