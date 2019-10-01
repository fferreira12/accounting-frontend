import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountTypePipe } from './pipes/account-type.pipe';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { FilterPipe } from './pipes/filter.pipe';
import { SortPipe } from './pipes/sort.pipe';
import { PaginationPipe } from './pipes/pagination.pipe';
import { PaginationComponent } from './components/pagination/pagination.component';
import { AutoCompleteComponent } from './components/auto-complete/auto-complete.component';
import { MapPropertyPipe } from './pipes/map-property.pipe';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    AccountTypePipe,
    ClickOutsideDirective,
    FilterPipe,
    SortPipe,
    PaginationPipe,
    PaginationComponent,
    AutoCompleteComponent,
    MapPropertyPipe
  ],
  imports: [
    CommonModule,
    FormsModule
  ], 
  exports: [
    AccountTypePipe, 
    ClickOutsideDirective,
    FilterPipe,
    SortPipe,
    PaginationPipe,
    PaginationComponent,
    AutoCompleteComponent,
    MapPropertyPipe
  ]
})
export class SharedModule { }
