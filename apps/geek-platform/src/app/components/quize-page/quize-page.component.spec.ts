import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizePageComponent } from './quize-page.component';
import { QuizePageModule } from './quize-page.module';
import { ButtonModule } from '@geek-platform/ui';

describe('QuizePageComponent', () => {
  let component: QuizePageComponent;
  let fixture: ComponentFixture<QuizePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [QuizePageModule, ButtonModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
