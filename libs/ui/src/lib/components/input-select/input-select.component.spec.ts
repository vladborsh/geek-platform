import { TestBed, async } from '@angular/core/testing';
import { InputSelectComponent } from './input-select.component';
import { InputSelectModule } from './input-select.module';

describe('InputSelectComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [InputSelectModule],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(InputSelectComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
