import { Component } from '@angular/core';
import { Accounting } from '@fferreira/accounting'
import { AccountingService } from '@core/services/accounting.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private accountingService: AccountingService) {}

  getAccounts() {
    return this.accountingService.getAccounts();
  }

}
