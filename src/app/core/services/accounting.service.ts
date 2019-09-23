import { Injectable } from "@angular/core";
import { Accounting, AccountType, Account, Transaction } from "@fferreira/accounting";
import { Subject, throwError } from "rxjs";
import { TransactionAddComponent } from 'src/app/accounting/transaction-add/transaction-add.component';

@Injectable({
  providedIn: "root"
})
export class AccountingService {
  app: Accounting;
  accounts: Account[];
  accountsSubject: Subject<Account[]>;
  transactions: Transaction[];
  transactionsSubject: Subject<Transaction[]>;

  constructor() {
    this.app = new Accounting();
    this.accountsSubject = new Subject<Account[]>();
    this.transactionsSubject = new Subject<Transaction[]>();

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

  deleteTransaction(transaction: Transaction) {
    throw new Error('deleteTransaction not implemented yet');
  }

  subscribeToTransactions(subscriber: (accs: Transaction[]) => void) {
    this.transactionsSubject.subscribe(subscriber);
  }

  updateTransactions() {
    this.transactions = this.app.getTransactions();
    this.transactionsSubject.next(this.transactions);
  }
}
