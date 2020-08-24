import { ElementRef, Renderer2 } from '@angular/core';
import { MobileOnlyDirective } from './mobile-only.directive';

const elementRef: ElementRef;
const renderer: Renderer2;

describe('MobileOnlyDirective', () => {
  it('should create an instance', () => {
    const directive = new MobileOnlyDirective(elementRef, renderer);
    expect(directive).toBeTruthy();
  });
});
