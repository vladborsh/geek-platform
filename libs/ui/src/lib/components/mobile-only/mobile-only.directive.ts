import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[uiMobileOnly]',
})
export class MobileOnlyDirective {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.renderer.addClass(this.elementRef.nativeElement, 'mobile-only');
  }
}
