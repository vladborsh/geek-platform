import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { QuizDto } from '@geek-platform/api-interfaces';

import { HttpBackendService } from '../http-backend/http-backend.service';

type QuizRecord = Record<'id', QuizDto>;

const initialState: QuizRecord = {
  id: {
    _id: '1',
    name: '',
    questions: [],
  },
};

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private _state: BehaviorSubject<QuizRecord> = new BehaviorSubject(initialState);
  private state: Observable<QuizRecord> = this._state.asObservable();
  private url = 'api/quiz';

  constructor(private httBackendService: HttpBackendService<QuizDto>) {}

  get(): void {}
}
