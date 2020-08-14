import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ui-expand',
  templateUrl: './expand.component.html',
  styleUrls: ['./expand.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExpandComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
