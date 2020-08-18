import {
  Component,
  ChangeDetectionStrategy,
  forwardRef,
  Input,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ui-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent implements ControlValueAccessor {
  @Input() type = 'text';
  public _value: any;
  public onChange: Function = () => {};
  public onTouched: Function = () => {};

  public get value(): any {
    return this._value;
  }

  public set value(value: any) {
    const previousValue = this._value;

    this._value = value;
    this.onChange(value, previousValue);
    this.onTouched();
  }

  public registerOnChange(fn: Function): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: Function): void {
    this.onTouched = fn;
  }

  public writeValue(value: any): void {
    if (value) {
      this.value = value;
    }
  }
}
