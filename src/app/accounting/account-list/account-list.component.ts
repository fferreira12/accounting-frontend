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
  itemsPerPage = 15;
  currentPage = 1;

  constructor(private accountService: AccountingService) { }

  ngOnInit() {
    this.accounts = this.accountService.getAccounts();
    this.accountService.subscribeToAccount(accs => {
      this.accounts = accs;
    })
  }

  get totalPages() {
    return Math.round(this.accounts.length / this.itemsPerPage);
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }

  onSaveAccount(acc: {oldName: string, newAccount:Account}) {
    this.accountService.editAccount(acc.oldName, acc.newAccount);
  }

  onDeleteAccount(account: Account) {
    this.accountService.deleteAccount(account);
  }

}
