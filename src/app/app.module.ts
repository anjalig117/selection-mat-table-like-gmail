import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { AppComponent } from './app.component';
import { TablesComponent } from './tables/tables.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    MatPaginatorModule,
    MatTableModule,
    MatCheckboxModule,
  ],
  declarations: [AppComponent, TablesComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
