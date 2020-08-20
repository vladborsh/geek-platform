import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { QuizDto } from '@geek-platform/api-interfaces';
import { reduce } from '../../helpers';

import { HttpBackendService } from '../http-backend/http-backend.service';

type QuizRecord = Record<'id', QuizDto>;

const initialState: QuizRecord = {
  id: {
    _id: '',
    name: '',
    questions: [],
  },
};

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private _state: BehaviorSubject<QuizRecord> = new BehaviorSubject(initialState);
  // public readonly state: Observable<QuizRecord> = this._state.asObservable();
  private url = 'api/quiz';

  constructor(private httBackendService: HttpBackendService<QuizDto>) {}

  fetch$(): Observable<QuizDto[]> {
    return this.httBackendService.get$(this.url).pipe(
      tap(res => {
        const newState: QuizRecord = reduce((acc, item) => ({ ...acc, [item._id]: item }), {}, res);
        this._state.next(newState);
      }),
    );
  }

  create$(quiz: QuizDto): Observable<QuizDto> {
    return this.httBackendService.post$(this.url, quiz).pipe(
      tap(res => {
        this._state.next({ ...this._state.getValue(), [res._id]: res });
      }),
    );
  }

  update$(quiz: QuizDto): Observable<QuizDto> {
    return this.httBackendService.put$(`${this.url}/${quiz._id}`, quiz).pipe(
      tap(res => {
        this._state.next({ ...this._state.getValue(), [res._id]: res });
      }),
    );
  }

  delete$(id: string): Observable<QuizDto> {
    return this.httBackendService.delete$(this.url, id).pipe(
      tap(res => {
        const newState = this._state.getValue();
        delete newState[res._id];
        this._state.next(newState);
      }),
    );
  }

}
