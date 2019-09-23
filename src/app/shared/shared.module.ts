import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountTypePipe } from './pipes/account-type.pipe';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { FilterPipe } from './pipes/filter.pipe';
import { SortPipe } from './pipes/sort.pipe';




@NgModule({
  declarations: [
    AccountTypePipe,
    ClickOutsideDirective,
    FilterPipe,
    SortPipe
  ],
  imports: [
    CommonModule
  ], 
  exports: [
    AccountTypePipe, 
    ClickOutsideDirective,
    FilterPipe,
    SortPipe
  ]
})
export class SharedModule { }
