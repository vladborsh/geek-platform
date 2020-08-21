import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { QuizDto, Create } from '@geek-platform/api-interfaces';
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
  private url = 'api/quiz';

  constructor(private httBackendService: HttpBackendService<QuizDto>) {}

  public fetch$(): Observable<QuizDto[]> {
    return this.httBackendService.get$(this.url).pipe(
      tap(res => {
        const newState: QuizRecord = reduce((acc, item) => ({ ...acc, [item._id]: item }), {}, res);
        this._state.next(newState);
      }),
    );
  }

  public create$(quiz: Create<QuizDto>): Observable<QuizDto> {
    return this.httBackendService.post$(this.url, quiz).pipe(
      tap(res => {
        this._state.next({ ...this._state.getValue(), [res._id]: res });
      }),
    );
  }

  public update$(quiz: QuizDto): Observable<QuizDto> {
    return this.httBackendService.put$(this.url, quiz._id, quiz).pipe(
      tap(res => {
        this._state.next({ ...this._state.getValue(), [res._id]: res });
      }),
    );
  }

  public delete$(id: string): Observable<QuizDto> {
    return this.httBackendService.delete$(this.url, id).pipe(
      tap(res => {
        const newState = this._state.getValue();
        delete newState[res._id];
        this._state.next(newState);
      }),
    );
  }

  public get$(): Observable<QuizDto[]> {
    return this._state.asObservable().pipe(map(data => Object.values(data)));
  }

  public getById$(id: string): Observable<QuizDto> {
    return this._state.asObservable().pipe(map(data => data[id]));
  }
}
