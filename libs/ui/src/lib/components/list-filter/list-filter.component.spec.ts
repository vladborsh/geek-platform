import { TestBed, async } from '@angular/core/testing';
import { ListFilterComponent } from './list-filter.component';
import { ListFilterModule } from './list-filter.module';

describe('ListFilterComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ListFilterModule],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(ListFilterComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
