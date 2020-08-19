import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NavigationInterface } from '@geek-platform/ui';
import { Routes } from '../../enums/route.enum';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  public navList: NavigationInterface[] = [
    {
      label: 'Welcome',
      route: `/${Routes.HOME}`,
    },
    {
      label: 'Quize',
      route: `/${Routes.HOME}/${Routes.QUIZE}`,
    },
    {
      label: 'Editor',
      route: `/${Routes.HOME}/${Routes.EDITOR}`,
    },
  ];
}
