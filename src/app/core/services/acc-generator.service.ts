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
        items: []
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
}
