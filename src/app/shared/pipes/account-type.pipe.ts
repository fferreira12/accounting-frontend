import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "accountType"
})
export class AccountTypePipe implements PipeTransform {
  transform(value: number, ...args: any[]): any {
    switch (value) {
      case 0: {
        return "Asset";
        break;
      }
      case 1: {
        return "Liability";
        break;
      }
      case 2: {
        return "Revenue";
        break;
      }
      case 3: {
        return "Expense";
        break;
      }
      default: {
        //statements;
        return "Invalid Account Type";
        break;
      }
    }
  }
}
