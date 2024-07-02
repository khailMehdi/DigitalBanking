import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {catchError, map, observable, Observable, tap, throwError} from "rxjs";
import {Customer} from "../module/customer.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {CustomerService} from "../services/customer.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit {
customers! : Observable<Array<Customer>>;
errorMessage! : string  ;
searchFormGroup! : FormGroup;
  constructor(private customerService : CustomerService ,private fb :FormBuilder, private router : Router) { }

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
  handleSearchCustomers() {
    let kw=this.searchFormGroup?.value.keyword;
    this.customers=this.customerService.searchCustomers(kw).pipe(
      catchError(err => {
        this.errorMessage=err.message;
        return throwError(err);
      })
    );
  }
  handleDeleteCustomer(c: Customer) {
    let conf = confirm("Are you sure?");
    if(!conf) return;
    this.customerService.delateCustomers(c.id).subscribe({
      next : (resp) => {
        this.customers=this.customers.pipe(
          map(data=>{
            let index=data.indexOf(c);
            data.slice(index,1)
            return data;
          })
        );
      },
      error : err => {
        console.log(err);
      }
    })
  }

  handleCustomerAccounts(customer: Customer) {
    this.router.navigateByUrl("/customer-accounts/"+customer.id,{state :customer});
  }



}
