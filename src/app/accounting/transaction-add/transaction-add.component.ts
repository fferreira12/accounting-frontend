import { Component, OnInit, Input } from '@angular/core';

import { Account } from '@fferreira/accounting';

@Component({
  selector: 'app-transaction-add',
  templateUrl: './transaction-add.component.html',
  styleUrls: ['./transaction-add.component.css']
})
export class TransactionAddComponent implements OnInit {

  searchTerm: string = "";

  @Input() allAccounts: Account[];
  showAutocomplete = false;

  constructor() { }

  ngOnInit() {
  }

  toggleAutocomplete() {
    this.showAutocomplete = !this.showAutocomplete;
  }

  getSearchValue() {
    return this.searchTerm;
  }

  selectAccount(acc: Account) {
    this.searchTerm = acc.Name;
    this.toggleAutocomplete();
  }

}
