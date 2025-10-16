import { Directive, TemplateRef, ViewContainerRef, OnDestroy } from '@angular/core'

@Directive({
  selector: '[appIfPortrait]',
  standalone: true,
})
export class IfPortraitDirective implements OnDestroy {
  private mediaQuery = window.matchMedia('(orientation: portrait)')
  private listener = () => this.updateView()

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
  ) {
    this.mediaQuery.addEventListener('change', this.listener)
    this.updateView()
  }

  private updateView() {
    this.viewContainer.clear()
    if (this.mediaQuery.matches) {
      this.viewContainer.createEmbeddedView(this.templateRef)
    }
  }

  ngOnDestroy() {
    this.mediaQuery.removeEventListener('change', this.listener)
  }
}
