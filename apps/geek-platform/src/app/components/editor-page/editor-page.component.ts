import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-editor-page',
  templateUrl: './editor-page.component.html',
  styleUrls: ['./editor-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorPageComponent implements OnInit {
  constructor(private location: Location) {}
  ngOnInit(): void {}

  public goBack(): void {
    this.location.back();
  }
}
