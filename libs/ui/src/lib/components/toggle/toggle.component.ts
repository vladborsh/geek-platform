import { Component, ChangeDetectionStrategy, forwardRef, Input, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ui-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ToggleComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleComponent implements ControlValueAccessor {
  @Input() label = '';

  public _value: boolean;
  public disabled: boolean;
  public onChange: Function = (value: boolean) => {};
  public onTouched: Function = () => {};

  @HostListener('click')
  public click(): void {
    this.writeValue(!this._value);
  }

  public registerOnChange(fn: Function): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: Function): void {
    this.onTouched = fn;
  }

  public writeValue(value: boolean): void {
    this._value = value;
    this.onChange(this._value);
  }

  public setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }
}
