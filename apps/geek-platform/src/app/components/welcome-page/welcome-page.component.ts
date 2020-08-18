import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomePageComponent implements OnInit {
  constructor(private location: Location) {}
  ngOnInit(): void {}

  public goBack(): void {
    this.location.back();
  }
}
