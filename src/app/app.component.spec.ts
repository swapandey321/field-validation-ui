import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AppComponent } from './app.component';
import { FormBuilder } from '@angular/forms';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { of } from 'rxjs';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        FormBuilder,
        HttpClient,
        HttpHandler
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'field-validation-ui'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('field-validation-ui');
  });

  it(`should call api`, () => {
    debugger;
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const apiSpy = spyOn(app, "callApi").and.returnValue(of('Employee Data Saved'));
    const obs = app.callApi();
    obs.subscribe(data => {
      expect(data).toEqual('Employee Data Saved');
    });
  });

  it(`should fail submit`, () => {
    debugger;
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const apiSpy = spyOn(app, "callApi").and.returnValue(of('Employee Data Saved'));
    expect(app.submit()).toEqual("Error in Form");
  });
  
  it(`should submit successfully`, () => {
    debugger;
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.employeeForm.setValue({employeeName: "A name", employeeEmail: "abc@cde.com", employeeZipCode: 12345});
    const apiSpy = spyOn(app, "callApi").and.returnValue(of('Employee Data Saved'));
    expect(app.submit()).toEqual("Submitted");
  });
});
