import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { NavigationInterface } from '../../interfaces/ui-navigation.interface';

@Component({
  selector: 'ui-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {
  @Input() navList: NavigationInterface[];
}
