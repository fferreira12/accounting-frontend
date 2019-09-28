import { Component, OnInit } from "@angular/core";

import * as XLSX from "xlsx";
import { Accounting, AccountType } from "@fferreira/accounting";
import { AccountingService } from '@core/services/accounting.service';

@Component({
  selector: "app-excel-importer",
  templateUrl: "./excel-importer.component.html",
  styleUrls: ["./excel-importer.component.css"]
})
export class ExcelImporterComponent implements OnInit {
  config = {
    accountsSheetName: "Accounts",
    accountsColumn: "C",
    accountsTypeColumn: "E",
    transactionsSheetName: "Currents",
    transactionStartRow: 2,
    debitAccountColumn: "E",
    creditAccountColumn: "F",
    dateColumn: "B",
    valueColumn: "G",
    descriptionColumn: "L",
    multilineColumn: "M"
  };
  //excelFile: File = null;
  fileEvent = null;
  workbook: XLSX.WorkBook = null;

  constructor(
    private accountingService: AccountingService
  ) {}

  ngOnInit() {}

  onFileSelect(fileEvent) {
    //this.excelFile = fileEvent.files[0];
    this.fileEvent = fileEvent;
  }

  onImportFile() {
    var files = this.fileEvent.target.files,
      f = files[0];
    var reader = new FileReader();
    reader.onload = (e: any) => {
      var data = new Uint8Array(e.target.result);
      this.workbook = XLSX.read(data, { type: "array" });

      /* DO SOMETHING WITH workbook HERE */
      let app = this.getApp();
      //console.log(app);

      this.accountingService.setApp(app);
    };
    reader.readAsArrayBuffer(f);
  }

  getApp() {
    let app = new Accounting();
    let accounts = this.getAcccounts(this.config);
    let transactions = this.getTransactions(this.config);


    accounts.forEach(acc => {
      try {
        app.createAccount(acc.account, AccountType[acc.type.toUpperCase()]);
      } catch (e) {
        console.log('Error adding account', acc);
      }
    });

    transactions.forEach(trans => {
      try {
        app.addTransaction({
          ...trans,
          date: this.excelDateToJSDate(trans.date)
        });
      } catch (e) {
        console.error('Error adding transaction', e);
      }

    });

    //console.log(app);
    

    return app;
  }

  private excelDateToJSDate(serial) {
    var utc_days = Math.floor(serial - 25569);
    var utc_value = utc_days * 86400;
    var date_info = new Date(utc_value * 1000);

    var fractional_day = serial - Math.floor(serial) + 0.0000001;

    var total_seconds = Math.floor(86400 * fractional_day);

    var seconds = total_seconds % 60;

    total_seconds -= seconds;

    var hours = Math.floor(total_seconds / (60 * 60));
    var minutes = Math.floor(total_seconds / 60) % 60;

    return new Date(
      date_info.getFullYear(),
      date_info.getMonth(),
      date_info.getDate(),
      hours,
      minutes,
      seconds
    );
  }

  readCell(sheet, address) {
    if (sheet[address]) {
      return sheet[address].v;
    }
  }

  getAcccounts(config) {
    //let workbook = XLSX.read(config.workbookPath);

    let accountsSheetName = config.accountsSheetName;
    let accountsColumn = config.accountsColumn;
    let accountsTypeColumn = config.accountsTypeColumn;

    let accountsSheet = this.workbook.Sheets[accountsSheetName];

    let accounts: { account: string; type: string }[] = [];

    let startRow: number = 2;
    let account: string = "";

    let i = startRow;

    do {
      account = this.readCell(accountsSheet, accountsColumn + i);
      let type = this.readCell(accountsSheet, accountsTypeColumn + i);

      if (account && account !== "") {
        accounts.push({
          account,
          type
        });
      }

      i++;
    } while (account && account !== "");

    return accounts;
  }

  getTransactions(config) {
    let transactions: {
      date: string;
      items: {
        account: string;
        value: number;
      }[];
      description?: string;
    }[] = [];

    let transactionSheet = this.workbook.Sheets[config.transactionsSheetName];

    let debitedAcc = "";
    let creditedAcc = "";
    let value = 0;
    let date = "";
    let description = "";
    let multiline = "";
    let row = config.transactionStartRow;

    let multilineTransaction: {
      date: string;
      items: {
        account: string;
        value: number;
      }[];
      description?: string;
    } = null;

    do {
      debitedAcc = this.readCell(
        transactionSheet,
        config.debitAccountColumn + row
      );
      creditedAcc = this.readCell(
        transactionSheet,
        config.creditAccountColumn + row
      );
      value = this.readCell(transactionSheet, config.valueColumn + row);
      
      date = this.readCell(transactionSheet, config.dateColumn + row);
      description = this.readCell(
        transactionSheet,
        config.descriptionColumn + row
      );
      multiline = this.readCell(transactionSheet, config.multilineColumn + row);

      if(!value) {
        row++;
        continue;
      }

      if (description && description !== "") {
        let t = {
          date: date,
          description: description,
          items: []
        };
        //console.log({debitedAcc, creditedAcc});
        
        if(multiline == "m" && multilineTransaction == null) {
          multilineTransaction = t;
          if(debitedAcc) {
            multilineTransaction.items.push({ account: debitedAcc, value: -1 * value });
          }
          if(creditedAcc) {
            multilineTransaction.items.push({ account: creditedAcc, value: value })
          }
        } else if(multiline == "m" && multilineTransaction != null) {
          if(debitedAcc) {
            multilineTransaction.items.push({ account: debitedAcc, value: -1 * value });
          }
          if(creditedAcc) {
            multilineTransaction.items.push({ account: creditedAcc, value: value })
          }
        } else {
          if(multilineTransaction !== null) {
            transactions.push(multilineTransaction);
            multilineTransaction = null;
          }
          t.items.push({ account: debitedAcc, value: -1 * value });
          t.items.push({ account: creditedAcc, value: value });
          transactions.push(t);
        }

      }

      row++;
    } while (description && description !== "");

    return transactions;
  }
}
