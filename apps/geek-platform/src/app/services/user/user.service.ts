import { Injectable } from '@angular/core';
import { Create, Update, UserDto } from '@geek-platform/api-interfaces';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { reduce } from '../../helpers';
import { HttpBackendService } from '../http-backend/http-backend.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _state: BehaviorSubject<Record<string, UserDto>> = new BehaviorSubject({});
  private url = 'api/user';

  constructor(private httpBackendService: HttpBackendService) {}

  public fetch$(): Observable<UserDto[]> {
    return this.httpBackendService.get$<UserDto[]>(this.url).pipe(
      tap((res: UserDto[]) => {
        this._state.next(reduce((acc, item) => ({ ...acc, [item._id]: item }), {}, res));
      }),
    );
  }

  public create$(quiz: Create<UserDto>): Observable<UserDto> {
    return this.httpBackendService.post$<Create<UserDto>>(this.url, quiz).pipe(
      tap((res: UserDto) => {
        this._state.next({ ...this._state.getValue(), [res._id]: res });
      }),
    );
  }

  public update$(quiz: Update<UserDto>): Observable<UserDto> {
    return this.httpBackendService.put$<Update<UserDto>>(this.url, quiz._id, quiz).pipe(
      tap((res: UserDto) => {
        this._state.next({ ...this._state.getValue(), [res._id]: res });
      }),
    );
  }

  public delete$(id: string): Observable<UserDto> {
    return this.httpBackendService.delete$<UserDto>(this.url, id).pipe(
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

  public get$(): Observable<UserDto[]> {
    return this._state.asObservable().pipe(map(data => Object.values(data)));
  }

  public getRecord$(): Observable<Record<string, UserDto>> {
    return this._state.asObservable();
  }

  public getById$(id: string): Observable<UserDto> {
    return this._state.asObservable().pipe(map(data => data[id]));
  }
}
