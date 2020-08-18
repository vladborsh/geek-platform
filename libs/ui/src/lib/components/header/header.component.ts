import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { UiSizes } from '../../enums/ui-sizes.enum';

@Component({
    selector: 'ui-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
    @Input() size: UiSizes;

    public sizes = UiSizes;
}
