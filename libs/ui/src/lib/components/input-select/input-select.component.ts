import {
  Component,
  ChangeDetectionStrategy,
  Input,
  TemplateRef,
  OnInit,
  forwardRef,
  OnDestroy,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { map, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { filterItems } from '../../helpers/filter-items.helper';
import { Keys } from '../../enums/keys.enum';

@Component({
  selector: 'ui-input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputSelectComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputSelectComponent<T, K extends keyof T>
  implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() filterFiledFunc: (item: T) => string;
  @Input() itemTemplate: TemplateRef<any>;
  @Input() valueMapper: (item: T) => T[K];
  @Input() labelMapper: (item: T) => string;
  @Input('items') set _items(value: T[]) {
    this.itemsInput$.next(value);
  }

  public filteredItems$: Observable<T[]>;
  public filter$ = new BehaviorSubject<string>('');
  public activeIndex$ = new BehaviorSubject<number>(-1);
  public keydown$ = new Subject<KeyboardEvent>();
  public isSuggestionsShown$ = new BehaviorSubject<boolean>(false);

  private blockSuggestion$ = new BehaviorSubject<boolean>(false);
  private itemsInput$ = new BehaviorSubject<T[]>([]);
  private onDestroy$ = new Subject<void>();
  private _value: T[K];

  public onChange: Function = () => {};
  public onTouched: Function = () => {};

  ngOnInit(): void {
    this.filteredItems$ = combineLatest([this.itemsInput$, this.filter$])
      .pipe(
        withLatestFrom(this.blockSuggestion$),
        tap(([[items, filter], blockSuggestion]) => {
          if (!blockSuggestion) {
            this.isSuggestionsShown$.next(!!items.length && !!filter);
          }
        }),
        map(([[items, filter]]) => filterItems(items, filter, this.filterFiledFunc)),
        tap(() => this.activeIndex$.next(-1)),
      );

    this.keydown$
      .pipe(
        withLatestFrom(this.filteredItems$, this.activeIndex$),
        takeUntil(this.onDestroy$),
      )
      .subscribe(([event, filteredItems, activeIndex]: [KeyboardEvent, T[], number]) => {
        if (event.key === Keys.ARROW_DOWN &&  activeIndex < filteredItems.length - 1) {
          this.activeIndex$.next(activeIndex + 1);
        }
        if (event.key === Keys.ARROW_UP && activeIndex > -1) {
          this.activeIndex$.next(activeIndex - 1);
        }
        if (event.key === Keys.ENTER && activeIndex !== -1) {
          this.selectItem(filteredItems[activeIndex]);
          event.preventDefault();
        }
      });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  public get value(): T[K] {
    return this._value;
  }

  public set value(value: T[K]) {
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

  public writeValue(value: T[K]): void {
    this.value = value;
  }

  public onFilterInput(filter: string): void {
    this.filter$.next(filter);
  }

  public onFilterKeydown(event: KeyboardEvent): void {
    this.keydown$.next(event);
  }

  public onFilterUnfocused(): void {
    setTimeout(() => this.isSuggestionsShown$.next(false), 100);
  }

  public selectItem(item: T): void {
    this.blockSuggestion$.next(true);
    this.writeValue(this.valueMapper(item));
    this.filter$.next(this.labelMapper(item));
    this.isSuggestionsShown$.next(false);
    setTimeout(() => this.blockSuggestion$.next(false));
  }
}
