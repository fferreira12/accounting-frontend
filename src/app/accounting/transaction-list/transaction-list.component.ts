import { Component, OnInit } from '@angular/core';
import { AccountingService } from '@core/services/accounting.service';
import { Transaction } from '@fferreira/accounting';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {

  transactions: Transaction[];

  constructor(
    private accountingService: AccountingService
  ) { }

  ngOnInit() {
    this.transactions = this.accountingService.getTransactions()
    this.accountingService.subscribeToTransactions((trans) => {
      this.transactions = trans;
    })

  }

}
