import { TestBed, async } from '@angular/core/testing';
import { ToggleComponent } from './toggle.component';
import { ToggleModule } from './toggle.module';

describe('ToggleComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ToggleModule],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(ToggleComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
