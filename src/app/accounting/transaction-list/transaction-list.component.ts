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
  transactions: Transaction[] = [];
  editingTransaction: Transaction;
  accounts: Account[];

  //filters
  filteredTransactions: Transaction[] = [];
  filters = new FormGroup({
    startDate: new FormControl(null),
    endDate: new FormControl(null),
    accountSelected: new FormControl(null)
  });

  //pagination
  itemsPerPage: number = 20;
  currentPage = 1;
  _totalPages: number = Math.round(this.filteredTransactions.length / this.itemsPerPage);

  constructor(private accountingService: AccountingService) {}

  ngOnInit() {
    this.transactions = this.accountingService.getTransactions();
    this.filteredTransactions = this.transactions;
    this.accountingService.subscribeToTransactions(trans => {
      this.transactions = trans;
      this.filteredTransactions = [];
      this.updateFilteredTransactions();
    });
    this.accounts = this.accountingService.getAccounts();
    this.accountingService.subscribeToAccount(accs => {
      this.accounts = accs;
    });

    //filter form
    this.filters.valueChanges.subscribe(val => {
      this.updateFilteredTransactions(val);
    });
  }

  updateFilteredTransactions(filter = this.filters.value) {
    let start = filter.startDate ? this.parseDate(filter.startDate) : null;
    let end = filter.endDate ? this.parseDate(filter.endDate) : null;

    this.accountingService.addFilters(start, end, filter.accountSelected);

    this.filteredTransactions = this.accountingService.getFilteredTransactions();
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
    this.filteredTransactions = this.accountingService.getFilteredTransactions();
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
    this.filteredTransactions = this.accountingService.getFilteredTransactions();
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }

  onSelectAccount(accountName: string) {
    this.filters.patchValue({accountSelected: accountName});
  }

  get totalPages() {
    return Math.round(this.filteredTransactions.length / this.itemsPerPage);
  }

  set totalPages(value: number) {
    this._totalPages = value;
  }
}
