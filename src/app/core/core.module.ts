import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountingModule } from '../accounting/accounting.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule, 
    AccountingModule
  ], 
  exports: [
    AccountingModule
  ]
})
export class CoreModule { }
