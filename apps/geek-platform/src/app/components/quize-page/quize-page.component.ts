import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-quize-page',
  templateUrl: './quize-page.component.html',
  styleUrls: ['./quize-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuizePageComponent implements OnInit {
  constructor(private location: Location) {}
  ngOnInit(): void {}

  public goBack(): void {
    this.location.back();
  }
}
