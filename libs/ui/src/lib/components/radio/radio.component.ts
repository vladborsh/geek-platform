import { Component, ChangeDetectionStrategy, Input, forwardRef, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ui-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioComponent<T> implements ControlValueAccessor {
  @Input() label = '';
  @Input() name: string;
  @Input() item: T;

  public _value: T;
  public checked: boolean;

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  public onChange: Function = () => {};
  public onTouched: Function = () => {};

  public get value(): T {
    return this._value;
  }

  public set value(value: T) {
    const previousValue = this._value;

    this._value = this.item;
    this.onChange(this.item, previousValue);
    this.onTouched();
  }

  public registerOnChange(fn: Function): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: Function): void {
    this.onTouched = fn;
  }

  public writeValue(value: T): void {
    this.checked = value === this.item;

    if (value === this.item) {
      this.value = value;
    }

    this.changeDetectorRef.markForCheck();
  }
}
