import {
  Directive,
  OnDestroy,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { Subscription } from 'rxjs';

import { Orientation } from '../types/orientation.enum';
import { OrientationService } from '../services/orientation.service';

@Directive({
  selector: '[appIfPortrait]'
})
export class IfPortraitDirective implements OnDestroy {
  private hasView = false;
  private subscription: Subscription;

  constructor(
    private templateRef: TemplateRef<any>,
    private orientationService: OrientationService,
    private viewContainer: ViewContainerRef,
  ) {
    this.subscription = this.orientationService.orientation$.subscribe(
      (orientation: Orientation) => this.updateView(orientation)
    );
  }

  private updateView(orientation: Orientation): void {
    if (orientation === Orientation.Portrait && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (orientation !== Orientation.Portrait && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
