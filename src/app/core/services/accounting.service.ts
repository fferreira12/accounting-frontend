import { Injectable } from "@angular/core";
import {
  Accounting,
  AccountType,
  Account,
  Transaction
} from "@fferreira/accounting";
import { BehaviorSubject } from "rxjs";
import { AccGeneratorService } from './acc-generator.service';

@Injectable({
  providedIn: "root"
})
export class AccountingService {
  app: Accounting;
  accounts: Account[];
  accountsSubject: BehaviorSubject<Account[]>;
  transactions: Transaction[];
  transactionsSubject: BehaviorSubject<Transaction[]>;

  //filters
  startDate: Date;
  endDate: Date;
  accountNameFilter: string;

  constructor(
    private accGenerator: AccGeneratorService
  ) {
    //this.app = this.accGenerator.getApp(15, 50);
    this.app = new Accounting();
    this.accountsSubject = new BehaviorSubject<Account[]>([]);
    this.transactionsSubject = new BehaviorSubject<Transaction[]>([]);

    // TEST DATA
    
    this.app.createAccount("non alocated", AccountType.ASSET);
    this.app.createAccount("credit card reserve", AccountType.ASSET);
    this.app.createAccount("salary income", AccountType.REVENUE);
    this.app.createAccount("credit card to pay", AccountType.LIABILITY);
    this.app.createAccount("food expense", AccountType.EXPENSE);
    this.app.createAccount("market expense", AccountType.EXPENSE);

    this.addTransaction({
      date: new Date(2019, 8, 22),
      items: [
        { account: "non alocated", value: -5000 },
        { account: "salary income", value: 5000 }
      ]
    });

    this.addTransaction({
      date: new Date(2019, 8, 24),
      items: [
        { account: "food expense", value: -50 },
        { account: "non alocated", value: 50 }
      ]
    });

    this.addTransaction({
      date: new Date(2019, 8, 26),
      items: [
        { account: "market expense", value: -50 },
        { account: "food expense", value: 50 }
      ]
    });
    
    // END TEST DATA

    this.updateAccounts();
    this.updateTransactions();
  }

  setApp(app: Accounting) {
    this.app = app;
    this.updateAccounts();
    this.updatetransactions();
    //console.log('account service app was updated');
    
  }

  updateAccounts() {
    this.accounts = this.app.getAccounts();
    this.accountsSubject.next(this.accounts);
  }

  updatetransactions() {
    this.transactions = this.app.getTransactions();
    this.transactionsSubject.next(this.transactions);
  }

  addAccount(name: string, accType: AccountType) {
    this.app.createAccount(name, accType);
    this.updateAccounts();
  }

  editAccount(oldAccName: string, newAccount: Account) {
    this.app.editAccount(oldAccName, newAccount);
    this.updateAccounts();
  }

  deleteAccount(acc: Account) {
    this.app.deleteAccount(acc.Name);
    this.updateAccounts();
  }

  getAccounts(): Account[] {
    return this.app.getAccounts();
  }

  subscribeToAccount(subscriber: (accs: Account[]) => void) {
    this.accountsSubject.subscribe(subscriber);
  }

  addTransaction(transaction: Transaction) {
    this.app.addTransaction(transaction);
    this.transactionsSubject.next(this.transactions);
  }

  getTransactions() {
    return this.app.getTransactions();
  }

  deleteTransaction(transaction: Transaction) {
    this.app.deleteTransaction(transaction);
    this.updateTransactions();
  }

  updateTransaction(transactionId: string, transaction: Transaction) {
    this.app.updateTransaction(transactionId, transaction);
    this.updateTransactions();
  }

  subscribeToTransactions(subscriber: (trans: Transaction[]) => void) {
    this.transactionsSubject.subscribe(subscriber);
  }

  updateTransactions() {
    this.transactions = this.app.getTransactions();
    this.transactionsSubject.next(this.transactions);
  }

  addFilters(start?: Date, end?: Date, accountName?: string) {
    this.startDate = start;
    this.endDate = end;
    this.accountNameFilter = accountName;
  }

  getFilteredTransactions() {
    if(!this.startDate && !this.endDate && !this.accountNameFilter) {
      return this.transactions;
    }
    
    
    return this.intersection(
      this.app.filterTransactionsByAccount(this.accountNameFilter),
      this.app.filterTransactionsByDate(this.startDate, this.endDate)
    );
  }

  getBalances() {
    return this.app.getAllBalances();
  }

  private intersection(
    arr1: Transaction[],
    arr2: Transaction[]
  ): Transaction[] {
    if (!arr1 || !arr2 || arr1.length == 0 || arr2.length == 0) {
      return [];
    }
    return arr1.filter(x => {
      return arr2.some(y => {
        return x.id === y.id;
      });
    });
  }
}
