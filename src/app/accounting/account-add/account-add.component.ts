import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { AccountType, Account } from '@fferreira/accounting';
import { AccountingService } from '@core/services/accounting.service';

@Component({
  selector: 'app-account-add',
  templateUrl: './account-add.component.html',
  styleUrls: ['./account-add.component.css']
})
export class AccountAddComponent implements OnInit {

  accountTypeKeys = Object.keys(AccountType).filter(k => typeof AccountType[k as any] === "number");
  accountTypeValues = this.accountTypeKeys.map(k => AccountType[k as any]);

  accountName: string = "";
  accountType: AccountType;

  @Input() account: Account;
  @Output() save: EventEmitter<{oldName: string, newAccount: Account}> = new EventEmitter();
  @Output() create: EventEmitter<Account> = new EventEmitter();

  constructor(
    private accountingService: AccountingService
  ) { }

  ngOnInit() {
    if(this.account) {
      this.accountName = this.account.Name;
      this.accountType = this.account.AccountType;
    }
  }

  onCreateOrEdit() {
    if(!this.account) {
      let acc = new Account(this.accountName, this.accountType);
      this.create.emit(acc);
      this.accountingService.addAccount(acc.Name, acc.AccountType);
      this.accountName = "";
      this.accountType = null;
    } else {
      let d = {
        oldName: this.account.Name, 
        newAccount: new Account(this.accountName, this.accountType)
      }
      this.save.emit({
        oldName: this.account.Name, 
        newAccount: new Account(this.accountName, this.accountType)
      });
    }
  }

}
