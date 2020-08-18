import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit {
  constructor(private router: Router, private location: Location) {}
  ngOnInit(): void {}

  public goToPage(path: string): void {
    this.router.navigate([path]);
  }

  public goBack(): void {
    this.location.back();
  }
}
