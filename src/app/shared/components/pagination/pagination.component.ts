import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-pagination",
  templateUrl: "./pagination.component.html",
  styleUrls: ["./pagination.component.css"]
})
export class PaginationComponent implements OnInit {
  _totalPages: number;
  @Output() pageChange: EventEmitter<number>;
  pages: number[] = [];
  currentPage: number;

  constructor() {
    this.pageChange = new EventEmitter<number>();
    this.updatePages();
  }

  updatePages() {
    for (let i = 1; i <= this.totalPages; i++) {
      this.pages.push(i);
    }
    this.currentPage = 1;

  }

  @Input()
  set totalPages(value: number) {
    this._totalPages = value;
    this.updatePages();
  }

  get totalPages() {
    return this._totalPages;
  }

  ngOnInit() {}

  onChangePage(page: number) {
    this.currentPage = page;
    this.pageChange.emit(page);
  }
}
