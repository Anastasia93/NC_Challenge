import {
  Directive,
  TemplateRef,
  ViewContainerRef,
  OnDestroy
} from '@angular/core';
import { Subscription } from 'rxjs';
import { OrientationService } from '../services/orientation.service';
import { Orientation } from '../types/orientation.enum';

@Directive({
  selector: '[appIfPortrait]'
})
export class IfPortraitDirective implements OnDestroy {
  private subscription: Subscription;
  private hasView = false;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private orientationService: OrientationService
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
