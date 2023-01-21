import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css'],
})
export class TablesComponent implements OnInit {
  pageSize: any = 5;
  pageIndex: any = 0;
  selectedData: any;

  resultArray: any = [];
  constructor() {}

  ngOnInit(): void {
    this.dataSource.data = this.dataSource.data.map((x: any) => {
      x.checked = false;
      return x;
    });
    const result = this.dataSource.data.reduce(
      (resultArray: any, item, index) => {
        const chunkIndex = Math.floor(index / this.pageSize);

        if (!resultArray[chunkIndex]) {
          resultArray[chunkIndex] = []; // start a new chunk
        }

        resultArray[chunkIndex].push(item);

        return resultArray;
      },
      []
    );
    this.resultArray = result;
    console.log('result is ', this.resultArray);
  }

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  displayedColumns: string[] = [
    'select',
    'position',
    'name',
    'weight',
    'symbol',
  ];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  pageEvent!: PageEvent;
  handlePageEvent(e: PageEvent) {
    // console.log("event is ", e)
    this.pageEvent = e;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }

  allSelected() {
    var a = this.resultArray[this.pageIndex];
    var b = a.filter((x: any) => x.checked == true).length;
    return a.length === b;
  }

  toggleAllRows() {
    if (this.allSelected()) {
      this.resultArray[this.pageIndex].map((x: any) => {
        x.checked = false;
        return x;
      });
      return;
    } else {
      this.resultArray[this.pageIndex].map((x: any) => {
        x.checked = true;
        return x;
      });
    }
  }

  getSelection(event: any) {
    event.checked = !event.checked;
  }

  getRows() {
    this.selectedData = this.dataSource.data.filter(
      (x: any) => x.checked == true
    );
  }
}
