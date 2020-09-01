import { Injectable } from '@angular/core';
import { Create, QuizAssignmentDto, Update } from '@geek-platform/api-interfaces';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { reduce } from '../../helpers';
import { HttpBackendService } from '../http-backend/http-backend.service';

@Injectable({
  providedIn: 'root',
})
export class QuizAssignmentService {
  private _state: BehaviorSubject<Record<string, QuizAssignmentDto>> = new BehaviorSubject({});
  private url = 'api/quiz_assignment';

  constructor(private httpBackendService: HttpBackendService) {}

  public fetch$(): Observable<QuizAssignmentDto[]> {
    return this.httpBackendService.get$<QuizAssignmentDto[]>(this.url).pipe(
      tap((res: QuizAssignmentDto[]) => {
        this._state.next(reduce((acc, item) => ({ ...acc, [item._id]: item }), {}, res));
      }),
    );
  }

  public create$(quizAssignment: Create<QuizAssignmentDto>): Observable<QuizAssignmentDto> {
    return this.httpBackendService.post$<Create<QuizAssignmentDto>>(this.url, quizAssignment).pipe(
      tap((res: QuizAssignmentDto) => {
        this._state.next({ ...this._state.getValue(), [res._id]: res });
      }),
    );
  }

  public update$(quizAssignment: Update<QuizAssignmentDto>): Observable<QuizAssignmentDto> {
    return this.httpBackendService.put$<Update<QuizAssignmentDto>>(this.url, quizAssignment._id, quizAssignment).pipe(
      tap((res: QuizAssignmentDto) => {
        this._state.next({ ...this._state.getValue(), [res._id]: res });
      }),
    );
  }

  public start$(id: string): Observable<QuizAssignmentDto> {
    return this.httpBackendService.post$<{}>(`${this.url}/${id}/start`, {}).pipe(
      tap((res: QuizAssignmentDto) => {
        this._state.next({ ...this._state.getValue(), [res._id]: res });
      }),
    );
  }

  public finish$(id: string, answers: number[]): Observable<QuizAssignmentDto> {
    return this.httpBackendService.post$<{}>(`${this.url}/${id}/finish`, { answers }).pipe(
      tap((res: QuizAssignmentDto) => {
        this._state.next({ ...this._state.getValue(), [res._id]: res });
      }),
    );
  }

  public delete$(id: string): Observable<QuizAssignmentDto> {
    return this.httpBackendService.delete$<QuizAssignmentDto>(this.url, id).pipe(
      tap(() =>
        this._state.next(
          reduce(
            (acc, item) => item._id === id ? acc : ({ ...acc, [item._id]: item }),
            {},
            Object.values(this._state.getValue()),
          ),
        ),
      ),
    );
  }

  public get$(): Observable<QuizAssignmentDto[]> {
    return this._state.asObservable().pipe(map(data => Object.values(data)));
  }

  public getById$(id: string): Observable<QuizAssignmentDto> {
    return this._state.asObservable().pipe(map(data => data[id]));
  }
}
