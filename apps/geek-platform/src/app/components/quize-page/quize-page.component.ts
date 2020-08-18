import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-quize-page',
  templateUrl: './quize-page.component.html',
  styleUrls: ['./quize-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuizePageComponent {
  constructor(private location: Location) {}

  public goBack(): void {
    this.location.back();
  }
}
