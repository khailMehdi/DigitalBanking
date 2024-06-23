import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {catchError, Observable, tap, throwError} from "rxjs";
import {Customer} from "../module/customer.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {CustomerService} from "../services/customer.service";



@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit {
customers! : Observable<Array<Customer>>;
errorMessage! : string  ;
searchFormGroup! : FormGroup;
  constructor(private customerService : CustomerService ,private fb :FormBuilder) { }

  ngOnInit(): void {
    this.searchFormGroup=this.fb.group(
      {
        keyword :this.fb.control(null)
      }
    );
    this.customers=this.customerService.getCustomers().pipe(
      catchError(err => {
        this.errorMessage=err.message;
        return throwError(err);
      })
    );
    // {next : (data)=>{
    //   this.customers=data;
    //   },
    //   error :(err)=>{
    //   //console.log(err);
    //   this.errorMessage=err ;
  }

  handleSearchCustomers(): void {
    let kw = this.searchFormGroup?.value.keyword;
    if (kw) {
      this.customers = this.customerService.searchCustomers(kw).pipe(
        tap(data => console.log('Search result:', data)), // Log the search result
        catchError(err => {
          this.errorMessage = err.message;
          return throwError(err);
        })
      );
    } else {
      this.errorMessage = 'Keyword is required';
    }
  }
}
