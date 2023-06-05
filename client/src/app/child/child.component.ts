import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { restService } from '../services/rest.service';
import {transactionService} from "../services/transaction.service";

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent {

  parentId: any;
  data:any
  constructor(private route: ActivatedRoute,private transactionService:transactionService) {
  }

  ngOnInit(): void {
    this.parentId = this.route.snapshot.paramMap.get('parentId');
    if(!this.transactionService.data){
      location.pathname = "parent"
    }else {
      this.data = this.transactionService.getTransactions(this.parentId)
    }
  }
}


