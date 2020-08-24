import { DesktopOnlyDirective } from './desktop-only.directive';
import { ElementRef, Renderer2 } from '@angular/core';

const elementRef: ElementRef;
const renderer: Renderer2;

describe('DesktopOnlyDirective', () => {
  it('should create an instance', () => {
    const directive = new DesktopOnlyDirective(elementRef, renderer);
    expect(directive).toBeTruthy();
  });
});
