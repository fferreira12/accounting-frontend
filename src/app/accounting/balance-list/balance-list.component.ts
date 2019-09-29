import { Component, OnInit } from "@angular/core";
import { AccountingService } from "@core/services/accounting.service";
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: "app-balance-list",
  templateUrl: "./balance-list.component.html",
  styleUrls: ["./balance-list.component.css"]
})
export class BalanceListComponent implements OnInit {
  balances: { account: string; balance: number }[] = [];
  filteredBalances: { account: string; balance: number }[] = [];

  filters = new FormGroup({
    hideZeros: new FormControl(true),
    accName: new FormControl(''),
  });

  constructor(private accountingService: AccountingService) {}

  ngOnInit() {
    this.updateBalances(this.accountingService.getBalances());
    this.accountingService.subscribeToTransactions(ts => {
      this.updateBalances(this.accountingService.getBalances());
    });
    this.accountingService.subscribeToAccount(accs => {
      this.updateBalances(this.accountingService.getBalances());
    });
    //filter form
    this.filters.valueChanges.subscribe(val => {
      this.updateFilteredBalances(val);
    });
  }

  updateBalances(balances: { [s: string]: number }) {
    
    this.balances = [];
    for (var key in balances) {
      this.balances.push({ account: key, balance: balances[key] });
    }
    this.updateFilteredBalances();
  }

  updateFilteredBalances(val: {hideZeros:boolean, accName: string} = this.filters.value) {
    if(!val) {
      this.filteredBalances = this.balances;
    }
    this.filteredBalances = this.balances.filter(balance => {
      if(val.accName && val.accName !== "" && val.hideZeros) {
        return balance.account.indexOf(val.accName) >= 0 && Math.abs(balance.balance) > 0.01;
      }
      if(val.accName && val.accName !== "") {
        return balance.account.indexOf(val.accName) >= 0;
      }
      if(val.hideZeros) {
        return Math.abs(balance.balance) > 0.01;
      }
      return true;
    })

  }
}
