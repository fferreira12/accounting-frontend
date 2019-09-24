import { Component, OnInit } from "@angular/core";
import { AccountingService } from "@core/services/accounting.service";
import * as moment from "moment";

import { Transaction, Account } from "@fferreira/accounting";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: "app-transaction-list",
  templateUrl: "./transaction-list.component.html",
  styleUrls: ["./transaction-list.component.css"]
})
export class TransactionListComponent implements OnInit {
  transactions: Transaction[];
  editingTransaction: Transaction;
  accounts: Account[];

  //filters
  filteredTrasactions: Transaction[];
  filters = new FormGroup({
    startDate: new FormControl(null),
    endDate: new FormControl(null),
    accountSelected: new FormControl(null)
  });

  constructor(private accountingService: AccountingService) {}

  ngOnInit() {
    this.transactions = this.accountingService.getTransactions();
    this.filteredTrasactions = this.transactions;
    this.accountingService.subscribeToTransactions(trans => {
      this.transactions = trans;
      //this.filteredTrasactions = trans;
    });
    this.accounts = this.accountingService.getAccounts();
    this.accountingService.subscribeToAccount(accs => {
      this.accounts = accs;
    });

    //filter form
    this.filters.valueChanges.subscribe(val => {

      let start = val.startDate ? this.parseDate(val.startDate) : null;
      let end = val.endDate ? this.parseDate(val.endDate) : null;

      this.accountingService.addFilters(start, end, val.accountSelected);

      this.filteredTrasactions = this.accountingService.getFilteredTransactions();

    });
  }



  private parseDate(dateStr: string) {
    let year = parseInt(dateStr.split("-")[0]);
    let month = parseInt(dateStr.split("-")[1]);
    let day = parseInt(dateStr.split("-")[2]);
    return new Date(year, month - 1, day);
  }

  getAllAccounts() {
    return this.accountingService.getAccounts();
  }

  onStartEditTransaction(t: Transaction) {
    if (this.editingTransaction == t) {
      this.editingTransaction = undefined;
    } else {
      this.editingTransaction = t;
    }
  }

  onDeleteTransaction(transaction: Transaction) {
    this.accountingService.deleteTransaction(transaction);
  }

  onUpdateTransaction(update: {
    transactionId: string;
    newTransaction: Transaction;
  }) {
    this.accountingService.updateTransaction(
      update.transactionId,
      update.newTransaction
    );
    this.editingTransaction = undefined;
  }
}
