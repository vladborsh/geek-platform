import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RadioComponent } from './radio.component';
import { RadioModule } from './radio.module';

describe('RadioComponent', () => {
  let component: RadioComponent<string>;
  let fixture: ComponentFixture<RadioComponent<string>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RadioModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent<RadioComponent<string>>(RadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
