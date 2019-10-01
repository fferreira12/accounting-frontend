import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.css']
})
export class AutoCompleteComponent implements OnInit {

  @Input() items: string[];
  @Output() selected: EventEmitter<string>;
  _itemFilter: string;
  showList = false;

  get itemFilter() {
    return this._itemFilter;
  }

  set itemFilter(value: string) {
    this._itemFilter = value;
    this.showList = true;
  }

  constructor() {
    this.selected = new EventEmitter<string>();

  }

  ngOnInit() {
  }

  onSelecItem(item: string) {
    this._itemFilter = item;
    this.selected.emit(item);
    this.showList = false;
  }

}
