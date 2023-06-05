import {Component, OnInit} from '@angular/core';
import { restService } from '../services/rest.service';
import {transactionService} from "../services/transaction.service";
import { transaction_model } from "/home/morgan-freeman/Workspace/assesment/client/src/app/models/transaction_model"

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit{
  data: any
  pagination:any = 1
  constructor(private apiServices: restService, private transactionService:transactionService) {
  }

  requestData() {
    this.apiServices.getTransactions(this.pagination).subscribe(
        (response) => {
          const responseData: transaction_model = response as transaction_model;
          this.data = responseData
          this.transactionService.data = this.data

        },
        (error) => {
        }
    );
  }

  ngOnInit(): void {
    this.requestData()
  }

  calculateTotalPaidAmount(transactions: any[]): number {
    return transactions.reduce((total, transaction) => total + transaction.paidAmount, 0);
  }

}
