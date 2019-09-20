import { Component, OnInit } from '@angular/core';
import { Account } from '@fferreira/accounting';
import { AccountingService } from '@core/services/accounting.service';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {

  accounts: Account[];

  constructor(private accountService: AccountingService) { }

  ngOnInit() {
    this.accounts = this.accountService.getAccounts();
    this.accountService.subscribeToAccount(accs => {
      this.accounts = accs;
    })
  }

}
