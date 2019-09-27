import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-pagination",
  templateUrl: "./pagination.component.html",
  styleUrls: ["./pagination.component.css"]
})
export class PaginationComponent implements OnInit {
  _totalItems: number;
  _itemsPerPage: number;
  _totalPages: number;
  pages: number[] = [];
  currentPage: number = 1;
  @Output() pageChange: EventEmitter<number>;
  
  constructor() {
    this.pageChange = new EventEmitter<number>();
    this.updatePages();
  }

  updatePages() {
    if(!this._itemsPerPage || !this._totalItems) {
      return;
    }
    this._totalPages = Math.ceil(this._totalItems / this._itemsPerPage);
    this.pages = this.getPagesToShow();
    //this.currentPage = 1;

  }

  getPagesToShow() {
    let size = 11;
    let start = Math.max(this.currentPage - 5, 1);
    let end = Math.min(this.currentPage + 5, this._totalPages);
    let pages: number[] = [];
    for(let i = start; i <= end; i++) {
      pages.push(i);
    }
    let nearStart = this.currentPage - 0 < this._totalPages - this.currentPage;
    let nearEnd = this.currentPage - 0 > this._totalPages - this.currentPage;
    while(pages.length < size && pages.length < this._totalPages) {
      if(nearStart) {
        pages.push(++end)
      } else if(nearEnd) {
        pages.unshift(--start)
      }

    }
    
    return pages;
  }

  @Input()
  set totalItems(value: number) {
    this._totalItems = value;
    this.updatePages();
  }

  get totalItems() {
    return this._totalItems;
  }

  @Input()
  set itemsPerPage(value: number) {
    this._itemsPerPage = value;
    this.updatePages();
  }

  get itemsPerPage() {
    return this._totalItems;
  }

  ngOnInit() {}

  onChangePage(page: number) {
    if(page < 1 || page > this._totalPages) {
      return;
    }
    this.currentPage = page;
    this.pageChange.emit(page);
    this.updatePages();
  }
}
