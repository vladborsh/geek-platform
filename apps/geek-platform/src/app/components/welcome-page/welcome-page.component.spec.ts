import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { WelcomePageComponent } from './welcome-page.component';
import { WelcomePageModule } from './welcome-page.module';

describe('WelcomePageComponent', () => {
  let component: WelcomePageComponent;
  let fixture: ComponentFixture<WelcomePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [WelcomePageModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
