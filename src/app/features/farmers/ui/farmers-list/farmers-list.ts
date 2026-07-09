
import { Component, effect, input, output, ViewChild } from '@angular/core';
import { Farmer } from '../../../../shared/models';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { COLUMN_FARMER, FARMER_STATUSES } from '../../../../shared/constants';
import { HasRole } from "../../../../shared/directives/has-role";

@Component({
  selector: 'app-farmers-list',
  imports: [MatTableModule, MatIconModule, MatSortModule, DatePipe, HasRole],
  templateUrl: './farmers-list.html',
  styleUrl: './farmers-list.scss',
})
export class FarmersList {
  public farmers = input<Farmer[]>([]);
  public eventFarmer = output<Farmer>();
  public eventDeleteFarmer = output<number | string>();
  public status = FARMER_STATUSES;
  public displayedColumnsField = COLUMN_FARMER;

  public dataSource = new MatTableDataSource<Farmer>([]);

  @ViewChild(MatSort) set matSort(sort: MatSort) {
    if (sort) {
      this.dataSource.sort = sort;

      this.dataSource.sortingDataAccessor = (item: Farmer, property: string) => {
        switch (property) {
          case 'manager': return item.manager?.fullName?.toLowerCase() || '';
          case 'fields': return item.fields?.length || 0;
          case 'createdAt': return item.createdAt ? new Date(item.createdAt).getTime() : 0;
          default: return (item as any)[property];
        }
      };
    }
  }

  constructor() {
    effect(() => {
      const formattedFarmers = this.farmers().map(farmer => ({
        ...farmer,
        statusColor: this.status[farmer.status]
      }));

      this.dataSource.data = formattedFarmers;
    });
  }

}
