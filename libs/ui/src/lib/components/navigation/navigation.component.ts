import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NavigationInterface } from '../../interfaces/ui-navigation.interface';

@Component({
  selector: 'ui-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {
  @Input() navList: NavigationInterface[];

  public mobileNavDisplay$ = new BehaviorSubject<string>('none');

  public toggleMobileNav(): void {
    this.mobileNavDisplay$.next(this.mobileNavDisplay$.value === 'none' ? 'block' : 'none');
  }

  public mobileNavSelected(): void {
    this.mobileNavDisplay$.next('none');
  }
}
