import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountingModule } from '../accounting/accounting.module';
import { AccGeneratorService } from './services/acc-generator.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule, 
    AccountingModule
  ],
  providers: [
    AccGeneratorService
  ],
  exports: [
    AccountingModule
  ]
})
export class CoreModule { }
