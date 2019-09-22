import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountTypePipe } from './pipes/account-type.pipe';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { FilterPipe } from './pipes/filter.pipe';




@NgModule({
  declarations: [
    AccountTypePipe,
    ClickOutsideDirective,
    FilterPipe
  ],
  imports: [
    CommonModule
  ], 
  exports: [
    AccountTypePipe, 
    ClickOutsideDirective,
    FilterPipe
  ]
})
export class SharedModule { }
