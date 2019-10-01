import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountingModule } from '../accounting/accounting.module';
import { AccGeneratorService } from './services/acc-generator.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule, 
    RouterModule,
    AccountingModule
  ],
  providers: [
    AccGeneratorService
  ],
  exports: [
    AccountingModule,
    NavbarComponent
  ]
})
export class CoreModule { }
