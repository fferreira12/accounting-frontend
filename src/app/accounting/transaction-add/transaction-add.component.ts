import { Component, OnInit, Input } from "@angular/core";
import { FormBuilder, FormArray, FormGroup } from "@angular/forms";

import { Account, Transaction } from "@fferreira/accounting";
import { AccountingService } from "@core/services/accounting.service";

@Component({
  selector: "app-transaction-add",
  templateUrl: "./transaction-add.component.html",
  styleUrls: ["./transaction-add.component.css"]
})
export class TransactionAddComponent implements OnInit {
  @Input() allAccounts: Account[];
  transactionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private accountingService: AccountingService
  ) {}

  ngOnInit() {
    this.transactionForm = this.fb.group({
      items: this.fb.array([
        this.fb.group({
          account: this.fb.control(""),
          value: this.fb.control(0)
        }),
        this.fb.group({
          account: this.fb.control(""),
          value: this.fb.control(0)
        })
      ])
    });
  }

  get items() {
    return this.transactionForm.get("items") as FormArray;
  }

  onAddItem() {
    this.items.push(
      this.fb.group({
        account: this.fb.control(""),
        value: this.fb.control(0)
      })
    );
  }

  onRemoveItem(index: number) {
    this.items.removeAt(index);
  }

  onAddTransaction() {
    let v: {account: string, value: number}[] = this.items.value;
    let t: Transaction = {
      date: new Date(),
      items: [],
      description: ''
    }
    v.forEach(item => {
      t.items.push({
        account: item.account, 
        value: item.value
      })
    })
    console.log(t);
    
    this.accountingService.addTransaction(t);
  }
}
