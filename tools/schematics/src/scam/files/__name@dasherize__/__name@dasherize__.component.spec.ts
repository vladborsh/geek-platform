import { TestBed, async } from '@angular/core/testing';
import { <%= classify(name) %>Component } from './<%= dasherize(name) %>.component';
import { <%= classify(name) %>Module } from './<%= dasherize(name) %>.module';

describe('<%= classify(name) %>Component', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [<%= classify(name) %>Module],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(<%= classify(name) %>Component);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
