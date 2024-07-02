import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Customer} from "../module/customer.model";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http :HttpClient) { }
  public getCustomers() : Observable<Array<Customer>>{
    return this.http.get<Array<Customer>>("http://localhost:8589/customers")
  }
  public searchCustomers(kw :string ) : Observable<Array<Customer>>{
    return this.http.get<Array<Customer>>("http://localhost:8589/customers/search?kw")
  }

  public seveCustomers(customer :Customer ) : Observable<Customer>{
    return this.http.post<Customer>("http://localhost:8589/customers",customer)
  }

  public delateCustomers(id :Number ) {
    return this.http.delete<Customer>("http://localhost:8589/customers/"+id);
  }

}
