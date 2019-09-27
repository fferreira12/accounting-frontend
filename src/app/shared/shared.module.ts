import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountTypePipe } from './pipes/account-type.pipe';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { FilterPipe } from './pipes/filter.pipe';
import { SortPipe } from './pipes/sort.pipe';
import { PaginationPipe } from './pipes/pagination.pipe';
import { PaginationComponent } from './components/pagination/pagination.component';




@NgModule({
  declarations: [
    AccountTypePipe,
    ClickOutsideDirective,
    FilterPipe,
    SortPipe,
    PaginationPipe,
    PaginationComponent
  ],
  imports: [
    CommonModule
  ], 
  exports: [
    AccountTypePipe, 
    ClickOutsideDirective,
    FilterPipe,
    SortPipe,
    PaginationPipe,
    PaginationComponent
  ]
})
export class SharedModule { }
