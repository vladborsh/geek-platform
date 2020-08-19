import { TestBed, async } from '@angular/core/testing';
import { CardComponent } from './card.component';
import { CardModule } from './card.module';

describe('CardComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CardModule],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(CardComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
