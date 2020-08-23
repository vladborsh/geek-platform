import { Component, ChangeDetectionStrategy, Input, TemplateRef, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { filterItems } from '../../helpers/filter-items.helper';

@Component({
  selector: 'ui-list-filter',
  templateUrl: './list-filter.component.html',
  styleUrls: ['./list-filter.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListFilterComponent<T> implements OnInit {
  @Input() filterFiledFunc: (item: T) => string;
  @Input() itemTemplate: TemplateRef<any>;
  @Input('items') set _items(value: T[]) {
    this.itemsInput$.next(value);
  }

  public items$: Observable<T[]>;
  public filter$ = new BehaviorSubject<string>('');

  private itemsInput$ = new BehaviorSubject<T[]>([]);

  ngOnInit(): void {
    this.items$ = combineLatest([this.itemsInput$, this.filter$])
      .pipe(
        map(([items, filter]) => filterItems(items, filter, this.filterFiledFunc)),
      );
  }

  public onFilterInput(filter: string): void {
    this.filter$.next(filter);
  }
}
