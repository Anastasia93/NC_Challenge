import { Directive, ElementRef, HostListener, Input, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appAutoFitText]'
})
export class AutoFitTextDirective implements AfterViewInit {
  @Input() minFontSize = 8;
  @Input() maxFontSize = 80;
  @Input() set appAutoFitTextTrigger(value: any) {
    this.fit();
  }

  private element: HTMLElement;

  constructor(el: ElementRef) {
    this.element = el.nativeElement;
  }

  ngAfterViewInit() {
    this.fit();
  }

  @HostListener('window:resize')
  onResize() {
    this.fit();
  }

  private fit() {
    const el = this.element;
    if (!el.textContent) return;

    const parent = el.parentElement;
    if (!parent) return;

    let fontSize = this.maxFontSize;
    el.style.whiteSpace = 'nowrap';
    el.style.display = 'inline-block';
    el.style.fontSize = fontSize + 'px';

    const parentWidth = parent.clientWidth;

    while (el.scrollWidth > parentWidth && fontSize > this.minFontSize) {
      fontSize -= 1;
      el.style.fontSize = fontSize + 'px';
    }

    el.style.textAlign = 'center';
    el.style.width = '100%';
  }
}
