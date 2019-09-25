import { Injectable } from "@angular/core";
import { Transaction, Accounting, AccountType } from "@fferreira/accounting";

@Injectable({
  providedIn: "root"
})
export class AccGeneratorService {
  constructor() {}

  getApp(accounts: number, transactions: number): Accounting {
    let accs: string[] = [];
    let trans: Transaction[] = [];

    let app = new Accounting()

    for (let i = 0; i < accounts; i++) {
      accs.push("acc " + i);
      app.createAccount(accs[i], this.randomEnum(AccountType));
    }

    for (let i = 0; i < transactions; i++) {
      //let quantityOfItems = Math.random() < 0.9 ? 2 : 3;

      let t = {
        date: this.randomDate(new Date(2015, 5, 1), new Date(2019, 11, 1)),
        items: [],
        description: "Transaction number " + (i+1) + " of " + transactions
      };

      let val = Math.random() * 5000;

      t.items.push({
        account: accs[Math.floor(Math.random() * accs.length)],
        value: val
      });

      t.items.push({
        account: accs[Math.floor(Math.random() * accs.length)],
        value: -val
      });

      trans.push(t);

      app.addTransaction(t);
    }

    return app;
  }

  private randomDate(start, end) {
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
  }

  private randomEnum<T>(anEnum: T): T[keyof T] {
    const enumValues = Object.keys(anEnum)
      .map(n => Number.parseInt(n))
      .filter(n => !Number.isNaN(n)) as unknown as T[keyof T][]
    const randomIndex = Math.floor(Math.random() * enumValues.length)
    const randomEnumValue = enumValues[randomIndex]
    return randomEnumValue;
  }

  getAppFromJson(rawAccounts: string, rawTransactions: string) {

    let app = new Accounting();

    let accounts = JSON.parse(rawAccounts);
    let transactions = JSON.parse(rawTransactions);

    accounts.foreach(acc => {
      app.createAccount(acc.account, AccountType[acc.type as string])
    });

    transactions.foreach(trans => {
      app.addTransaction({
        ...trans,
        date: this.excelDateToJSDate(trans.date)
      })
    })

    return app;
  }

  private excelDateToJSDate(serial) {
    var utc_days  = Math.floor(serial - 25569);
    var utc_value = utc_days * 86400;                                        
    var date_info = new Date(utc_value * 1000);
 
    var fractional_day = serial - Math.floor(serial) + 0.0000001;
 
    var total_seconds = Math.floor(86400 * fractional_day);
 
    var seconds = total_seconds % 60;
 
    total_seconds -= seconds;
 
    var hours = Math.floor(total_seconds / (60 * 60));
    var minutes = Math.floor(total_seconds / 60) % 60;
 
    return new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate(), hours, minutes, seconds);
 }
}
