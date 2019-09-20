import { Component, OnInit, Input } from '@angular/core';
import { Account } from '@fferreira/accounting';
import { AccountTypePipe } from '@shared/pipes/account-type.pipe';

@Component({
  selector: 'app-account-item',
  templateUrl: './account-item.component.html',
  styleUrls: ['./account-item.component.css']
})
export class AccountItemComponent implements OnInit {

  @Input() account: Account;

  constructor() { }

  ngOnInit() {
  }

}
