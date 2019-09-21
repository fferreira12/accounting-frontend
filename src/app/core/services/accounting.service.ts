import { Injectable } from "@angular/core";
import { Accounting, AccountType, Account } from "@fferreira/accounting";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AccountingService {
  app: Accounting;
  accounts: Account[];
  accountsSubject: Subject<Account[]>;

  constructor() {
    this.app = new Accounting();
    this.accountsSubject = new Subject<Account[]>();

    // TEST DATA
    
      this.app.createAccount('non alocated', AccountType.ASSET);
      this.app.createAccount('credit card reserve', AccountType.ASSET);
      this.app.createAccount('salary income', AccountType.REVENUE);
      this.app.createAccount('credit card to pay', AccountType.LIABILITY);
      this.app.createAccount('food expense', AccountType.EXPENSE);
      this.app.createAccount('market expense', AccountType.EXPENSE);
    
    // END TEST DATA

    this.updateAccounts();
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
}
