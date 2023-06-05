import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class transactionService {

  data:any

  getTransactions(key:string){
    for (const item of this.data){
      if(item.id == key){
        return item.transaction
      }
    }
    return []
  }
}
