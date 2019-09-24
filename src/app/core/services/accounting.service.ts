import { Injectable } from "@angular/core";
import { Accounting, AccountType, Account, Transaction } from "@fferreira/accounting";
import { Subject, throwError, BehaviorSubject } from "rxjs";
import { TransactionAddComponent } from 'src/app/accounting/transaction-add/transaction-add.component';

@Injectable({
  providedIn: "root"
})
export class AccountingService {
  app: Accounting;
  accounts: Account[];
  accountsSubject: BehaviorSubject<Account[]>;
  transactions: Transaction[];
  transactionsSubject: Subject<Transaction[]>;

  constructor() {
    this.app = new Accounting();
    this.accountsSubject = new BehaviorSubject<Account[]>([]);
    this.transactionsSubject = new BehaviorSubject<Transaction[]>([]);

    // TEST DATA
    
      this.app.createAccount('non alocated', AccountType.ASSET);
      this.app.createAccount('credit card reserve', AccountType.ASSET);
      this.app.createAccount('salary income', AccountType.REVENUE);
      this.app.createAccount('credit card to pay', AccountType.LIABILITY);
      this.app.createAccount('food expense', AccountType.EXPENSE);
      this.app.createAccount('market expense', AccountType.EXPENSE);

      this.addTransaction({
        date: new Date(2019, 1, 1),
        items: [
          {account: 'non alocated', value: -5000},
          {account: 'salary income', value: 5000}
        ]
      });

      this.addTransaction({
        date: new Date(2019, 1, 2),
        items: [
          {account: 'food expense', value: -50},
          {account: 'non alocated', value: 50}
        ]
      });
    
    // END TEST DATA

    this.updateAccounts();
    this.updateTransactions();
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
    console.log({oldAccName, newAccount});
    
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
    this.app.addTransaction(transaction)
  }

  getTransactions() {
    return this.app.getTransactions();
  }

  deleteTransaction(transaction: Transaction) {
    this.app.deleteTransaction(transaction);
    this.updateTransactions();
  }

  subscribeToTransactions(subscriber: (trans: Transaction[]) => void) {
    this.transactionsSubject.subscribe(subscriber);
  }

  updateTransactions() {
    this.transactions = this.app.getTransactions();
    this.transactionsSubject.next(this.transactions);
  }
}
