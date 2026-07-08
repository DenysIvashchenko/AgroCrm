import { DatePipe } from '@angular/common';
import { Component, effect, input, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { COLUMN_FIELD } from '../../../shared/constants/column-field';
import { Field } from '../../../shared/models';
import { HasRole } from '../../../shared/directives/has-role';
import { CROP_STATUS_COLORS, SOIL_TYPE_COLORS } from '../../../shared/constants/status-color.constant';


@Component({
  selector: 'app-field-list',
  imports: [MatTableModule, MatIconModule, MatSortModule, HasRole, DatePipe],
  templateUrl: './field-list.html',
  styleUrl: './field-list.scss',
})
export class FieldList {
  public fields = input<Field[]>([]);

  public displayedColumnsField = COLUMN_FIELD;

  public dataSource = new MatTableDataSource<Field>([]);

  @ViewChild(MatSort) set matSort(sort: MatSort) {
    if (sort) {
      this.dataSource.sort = sort;

      this.dataSource.sortingDataAccessor = (item: Field, property: string) => {
        switch (property) {
          case 'name': return item?.name?.toLowerCase() || '';
          case 'crops': return item.crops?.length || 0;
          case 'createdAt': return item.createdAt ? new Date(item.createdAt).getTime() : 0;
          default: return (item as any)[property];
        }
      };
    }
  }

  constructor() {
    effect(() => {
      const mapped = this.fields()
        .map((field) => ({
          ...field,
          latLng: `${field.latitude} / ${field.longitude}`,
          status: field.crops.length ? field.crops.map(c => c.status).join(' / ') : 'N/A',
          color: field.crops.length ? field.crops.map(c => CROP_STATUS_COLORS[c.status])[0] : '',
          soilColor: SOIL_TYPE_COLORS[field.soilType] || '#A0AEC0'
        }))
      this.dataSource.data = mapped;
    });
  }

}
