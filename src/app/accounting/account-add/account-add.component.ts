import { Component, OnInit } from '@angular/core';

import { AccountType } from '@fferreira/accounting';
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

  constructor(
    private accountingService: AccountingService
  ) { }

  ngOnInit() {
  }

  onAddAccount() {
    this.accountingService.addAccount(this.accountName, this.accountType);
    this.accountName = "";
    this.accountType = null;
  }

}
