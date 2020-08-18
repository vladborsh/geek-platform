import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'ui-expand',
  templateUrl: './expand.component.html',
  styleUrls: ['./expand.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpandComponent implements OnInit {
  @Input() isHidden: boolean;

  ngOnInit(): void {}
}
