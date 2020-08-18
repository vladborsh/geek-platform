import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorPageComponent } from './editor-page.component';
import { EditorPageModule } from './editor-page.module';

describe('EditorPageComponent', () => {
  let component: EditorPageComponent;
  let fixture: ComponentFixture<EditorPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [EditorPageModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
