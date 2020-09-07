import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { APP_BASE_HREF } from '@angular/common';

import { HomePageComponent } from './home-page.component';
import { HomePageModule } from './home-page.module';
import { WelcomePageModule } from '../welcome-page/welcome-page.module';
import { QuizPageModule } from '../quiz-page/quiz-page.module';
import { QuizRunModule } from '../quiz-run/quiz-run.module';
import { EditorPageModule } from '../editor-page/editor-page.module';
import { QuizAssignmentPageModule } from '../quiz-assignment-page/quiz-assignment-page.module';
import { QuizAssignmentCreatePageModule } from '../quiz-assignment-create-page/quiz-assignment-create-page.module';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HomePageModule,
        WelcomePageModule,
        RouterTestingModule,
        QuizPageModule,
        QuizRunModule,
        EditorPageModule,
        QuizAssignmentPageModule,
        QuizAssignmentCreatePageModule,
      ],
      providers: [{ provide: APP_BASE_HREF, useValue: '/home' }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
