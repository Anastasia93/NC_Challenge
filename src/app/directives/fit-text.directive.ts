import { AfterViewInit, Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appAutoFitText]',
})
export class AutoFitTextDirective implements AfterViewInit {
  @Input() minFontSize = 8;
  @Input() maxFontSize = 80;
  @Input() set appAutoFitTextTrigger(value: any) {
    this.fit();
  }

  private elementHTML: HTMLElement;

  constructor(element: ElementRef) {
    this.elementHTML = element.nativeElement;
    Object.assign(this.elementHTML.style, {
      whiteSpace: 'nowrap',
      display: 'inline-block',
      textAlign: 'center',
      width: '100%',
    });
  }

  ngAfterViewInit() {
    this.fit();
  }

  @HostListener('window:resize')
  onResize() {
    this.fit();
  }

  private fit() {
    const element = this.elementHTML;
    if (!element.textContent) return;

    const parent = element.parentElement;
    if (!parent) return;

    let fontSize = this.maxFontSize;
    element.style.fontSize = fontSize + 'px';

    const parentWidth = parent.clientWidth;

    while (element.scrollWidth > parentWidth && fontSize > this.minFontSize) {
      fontSize -= 1;
      element.style.fontSize = fontSize + 'px';
    }
  }
}
