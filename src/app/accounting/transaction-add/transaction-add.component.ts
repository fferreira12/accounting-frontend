import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
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

  //transaction being edited
  @Input() transaction: Transaction;
  @Output() save: EventEmitter<{transactionId: string, newTransaction: Transaction}>;

  constructor(
    private fb: FormBuilder,
    private accountingService: AccountingService
  ) {
    this.save = new EventEmitter<{transactionId: string, newTransaction: Transaction}>();
  }

  ngOnInit() {
    this.transactionForm = this.fb.group({
      date: this.fb.control(new Date()),
      items: this.fb.array([])
    });

    if(!this.transaction) {
      this.items.push(this.fb.group({
        account: this.fb.control(""),
        value: this.fb.control(0)
      })),
      this.items.push(this.fb.group({
        account: this.fb.control(""),
        value: this.fb.control(0)
      }))
    } else {
      this.transaction.items.forEach(item => {
        this.items.push(this.fb.group({
          account: this.fb.control(item.account),
          value: this.fb.control(item.value)
        }))
      })
    }
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
      date: this.transactionForm.controls.date.value,
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
    
    if(this.transaction) {
      //this.accountingService.updateTransaction(this.transaction.id, t);
      this.save.emit({
        transactionId: this.transaction.id,
        newTransaction: t
      })
    } else {
      this.accountingService.addTransaction(t);
    }
  }
}
