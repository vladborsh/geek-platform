import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { QuizDto, Create } from '@geek-platform/api-interfaces';
import { reduce } from '../../helpers';
import { HttpBackendService } from '../http-backend/http-backend.service';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private _state: BehaviorSubject<Record<string, QuizDto>> = new BehaviorSubject({});
  private url = 'api/quiz';

  constructor(private httpBackendService: HttpBackendService) {}

  public fetch$(): Observable<QuizDto[]> {
    return this.httpBackendService.get$<QuizDto[]>(this.url).pipe(
      tap((res: QuizDto[]) => {
        const newState: Record<string, QuizDto> = reduce((acc, item) => ({ ...acc, [item._id]: item }), {}, res);
        this._state.next(newState);
      }),
    );
  }

  public fetchById$(id: string): Observable<QuizDto> {
    return this.httpBackendService.get$<QuizDto>(`${this.url}/${id}`).pipe(
      tap((res: QuizDto) => {
        this._state.next({ ...this._state.getValue(), [res._id]: res });
      }),
    );
  }

  public create$(quiz: Create<QuizDto>): Observable<QuizDto> {
    return this.httpBackendService.post$<Create<QuizDto>>(this.url, quiz).pipe(
      tap((res: QuizDto) => {
        this._state.next({ ...this._state.getValue(), [res._id]: res });
      }),
    );
  }

  public update$(quiz: QuizDto): Observable<QuizDto> {
    return this.httpBackendService.put$<QuizDto>(this.url, quiz._id, quiz).pipe(
      tap(res => {
        this._state.next({ ...this._state.getValue(), [res._id]: res });
      }),
    );
  }

  public delete$(id: string): Observable<QuizDto> {
    return this.httpBackendService.delete$<QuizDto>(this.url, id).pipe(
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

  public get$(): Observable<QuizDto[]> {
    return this._state.asObservable().pipe(map(data => Object.values(data)));
  }

  public getRecord$(): Observable<Record<string, QuizDto>> {
    return this._state.asObservable();
  }

  public getById$(id: string): Observable<QuizDto> {
    return this._state.asObservable().pipe(map(data => data[id]));
  }
}
