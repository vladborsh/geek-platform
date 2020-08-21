import { TestBed } from '@angular/core/testing';

import { HttpBackendService } from './http-backend.service';
import { HttpClientModule } from '@angular/common/http';

describe('HttpBackendService', () => {
  let service: HttpBackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    }).compileComponents();
    service = TestBed.inject(HttpBackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
