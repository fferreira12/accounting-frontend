import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

import { ExcelImporterComponent } from "../accounting/excel-importer/excel-importer.component";
import { AccountListComponent } from '../accounting/account-list/account-list.component';
import { AccountAddComponent } from '../accounting/account-add/account-add.component';
import { TransactionListComponent } from '../accounting/transaction-list/transaction-list.component';
import { TransactionAddComponent } from '../accounting/transaction-add/transaction-add.component';
import { BalanceListComponent } from '../accounting/balance-list/balance-list.component';

const appRoutes: Routes = [
  { path: "", component: ExcelImporterComponent },
  { path: "accounts", component: AccountListComponent },
  { path: "accounts/add", component: AccountAddComponent },
  { path: "transactions", component: TransactionListComponent },
  { path: "transactions/add", component: TransactionAddComponent },
  { path: "balances", component: BalanceListComponent }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class RoutingModule {}
