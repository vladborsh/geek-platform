import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CreatorPageComponent } from './creator-page.component';
import { CreatorPageModule } from './creator-page.module';

describe('CreatorPageComponent', () => {
  let component: CreatorPageComponent;
  let fixture: ComponentFixture<CreatorPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CreatorPageModule, HttpClientTestingModule, RouterTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
