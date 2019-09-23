import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AccountListComponent } from "./account-list/account-list.component";
import { AccountAddComponent } from "./account-add/account-add.component";
import { AccountItemComponent } from "./account-list/account-item/account-item.component";
import { SharedModule } from "@shared/shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TransactionAddComponent } from "./transaction-add/transaction-add.component";
import { TransactionListComponent } from './transaction-list/transaction-list.component';

@NgModule({
  declarations: [
    AccountListComponent,
    AccountAddComponent,
    AccountItemComponent,
    TransactionAddComponent,
    TransactionListComponent
  ],
  imports: [CommonModule, FormsModule, SharedModule, ReactiveFormsModule],
  exports: [
    AccountListComponent,
    AccountAddComponent,
    AccountItemComponent,
    TransactionAddComponent,
    TransactionListComponent
  ]
})
export class AccountingModule {}
