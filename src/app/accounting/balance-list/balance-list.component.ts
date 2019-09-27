import { Component, OnInit } from "@angular/core";
import { AccountingService } from "@core/services/accounting.service";

@Component({
  selector: "app-balance-list",
  templateUrl: "./balance-list.component.html",
  styleUrls: ["./balance-list.component.css"]
})
export class BalanceListComponent implements OnInit {
  balances: { account: string; balance: number }[] = [];

  constructor(private accountingService: AccountingService) {}

  ngOnInit() {
    this.updateBalances(this.accountingService.getBalances());
    this.accountingService.subscribeToTransactions(ts => {
      this.updateBalances(this.accountingService.getBalances());
    });
    this.accountingService.subscribeToAccount(accs => {
      this.updateBalances(this.accountingService.getBalances());
    });

  }

  updateBalances(balances: { [s: string]: number }) {
    
    this.balances = [];
    for (var key in balances) {
      this.balances.push({ account: key, balance: balances[key] });
    }
  }
}
