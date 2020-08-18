import { DOCUMENT } from '@angular/common';
import { Component, ChangeDetectionStrategy, Renderer2, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
  ) {}

    ngOnInit(): void {
      this.renderer.addClass(this.document.body, 'light');
    }
}
