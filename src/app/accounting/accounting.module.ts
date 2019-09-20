import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AccountListComponent } from "./account-list/account-list.component";
import { AccountAddComponent } from "./account-add/account-add.component";
import { AccountItemComponent } from "./account-list/account-item/account-item.component";
import { SharedModule } from '@shared/shared.module';
import { FormsModule }   from '@angular/forms';

@NgModule({
  declarations: [
    AccountListComponent,
    AccountAddComponent,
    AccountItemComponent
  ],
  imports: [CommonModule, FormsModule, SharedModule],
  exports: [AccountListComponent, AccountAddComponent, AccountItemComponent]
})
export class AccountingModule {}
