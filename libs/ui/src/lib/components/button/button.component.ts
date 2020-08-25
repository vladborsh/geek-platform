import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import { UiSizes } from '../../enums/ui-sizes.enum';

@Component({
  selector: 'ui-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() label: string;
  @Input() size: UiSizes = UiSizes.MEDIUM;

  @Output() clicked = new EventEmitter<void>();

  public uiSizes = UiSizes;
}
