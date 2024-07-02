import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AccountDetails} from "../model/account.module";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AccountServiceService {
  constructor(private http : HttpClient) { }

  public getAccount(accountId : string, page : number, size : number):Observable<AccountDetails>{
    return this.http.get<AccountDetails>( "http://localhost:8589"+"/accounts/"+accountId+"/pageOperations?page="+page+"&size="+size);
  }
  public debit(accountId : string, amount : number, description:string){
    let data={accountId : accountId, amount : amount, description : description}
    return this.http.post("http://localhost:8589"+"/accounts/debit",data);
  }
  public credit(accountId : string, amount : number, description:string){
    let data={accountId : accountId, amount : amount, description : description}
    return this.http.post("http://localhost:8589"+"/accounts/credit",data);
  }
  public transfer(accountSource: string,accountDestination: string, amount : number, description:string){
    let data={accountSource, accountDestination, amount, description }
    return this.http.post("http://localhost:8589"+"/accounts/transfer",data);
  }
}
