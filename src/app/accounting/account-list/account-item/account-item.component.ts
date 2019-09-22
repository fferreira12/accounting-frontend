import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Account } from '@fferreira/accounting';
import { AccountTypePipe } from '@shared/pipes/account-type.pipe';

@Component({
  selector: 'app-account-item',
  templateUrl: './account-item.component.html',
  styleUrls: ['./account-item.component.css']
})
export class AccountItemComponent implements OnInit {

  @Input() account: Account;
  editing: boolean = false;
  @Output() save = new EventEmitter<{oldName: string, newAccount: Account}>();
  @Output() delete = new EventEmitter<Account>();

  constructor() { }

  ngOnInit() {
  }

  onEditAccount() {
    this.editing = !this.editing;
  }

  onSaveAccount(item: {oldName: string, newAccount: Account}) {
    this.save.emit(item)
  }

  onDeleteAccount() {
    this.delete.emit(this.account);
  }

}
