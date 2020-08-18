import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  constructor(private router: Router, private location: Location) {}

  public goToPage(path: string): void {
    this.router.navigate([path]);
  }

  public goBack(): void {
    this.location.back();
  }
}
