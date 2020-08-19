import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NavigationInterface } from '@geek-platform/ui';
import { HOME_NAVIGATION } from '../../config/navigation.config';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  public navList: NavigationInterface[] = HOME_NAVIGATION;
}
