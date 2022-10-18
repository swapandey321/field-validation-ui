import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  
  title = 'field-validation-ui';
  employeeForm: FormGroup;

  apiResponse = "";

  isSubmitted = false;

  apiUrl = {
    realPath: "/a_path_to_api",
    mockPath: "/assets/mockapi/employee.json"
  }

  constructor (
    private fb: FormBuilder,
    private httpClient: HttpClient
  ) {
    this.employeeForm = this.fb.group ({
      employeeName : ['', Validators.required],
      employeeEmail : ['', [Validators.required, Validators.email]],
      employeeZipCode : ['', [Validators.required, Validators.pattern('[0-9]{5}')]]
    });
  }
  
  ngOnInit() {
    
  }
  submit () : any {
    this.isSubmitted = true;
    if (this.employeeForm.get('employeeName')?.errors ||
    this.employeeForm.get('employeeEmail')?.errors||
    this.employeeForm.get('employeeZipCode')?.errors) {
      return "Error in Form";
    }
    console.log("Submitted");
    debugger;
    let apiResult = this.callApi ();
    apiResult.subscribe(data => {
      this.apiResponse = data.response;
    });
    return "Submitted";
  }
  callApi(): Observable<any> { 
    
    if (environment.mockApi) {
      return this.httpClient.get(this.apiUrl.mockPath)
      .pipe(
        map(response => {
          return response;
        }),
      );
    }
    else {
      return this.httpClient.post<any>(this.apiUrl.realPath, null)
        .pipe(
          map(response => {
            return response;
          }),
        );
    }
  }

  

}
