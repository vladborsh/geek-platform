import { TestBed, async } from '@angular/core/testing';
import { NavigationComponent } from './navigation.component';
import { NavigationModule } from './navigation.module';

describe('NavigationComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NavigationModule],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(NavigationComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
