import { Component, OnInit } from '@angular/core';
import { AccountingService } from '@core/services/accounting.service';
import * as moment from 'moment'

import { Transaction } from '@fferreira/accounting';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {

  transactions: Transaction[];
  editingTransaction: Transaction;

  constructor(
    private accountingService: AccountingService
  ) { }

  ngOnInit() {
    this.transactions = this.accountingService.getTransactions()
    this.accountingService.subscribeToTransactions((trans) => {
      this.transactions = trans;
    })

  }

  getAllAccounts() {
    return this.accountingService.getAccounts();
  }

  onStartEditTransaction(t: Transaction) {
    if(this.editingTransaction == t) {
      this.editingTransaction = undefined;
    } else {
      this.editingTransaction = t;
    }
  }

  onDeleteTransaction(transaction: Transaction) {
    this.accountingService.deleteTransaction(transaction);
  }

  onUpdateTransaction(update: {transactionId: string, newTransaction: Transaction}) {
    this.accountingService.updateTransaction(update.transactionId, update.newTransaction);
    this.editingTransaction = undefined;
  }

}
