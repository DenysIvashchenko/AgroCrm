import { Component, inject, signal, DestroyRef } from '@angular/core';
import { FieldService } from './field-service';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AgroMap } from '../../shared/components/agro-map/agro-map';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FieldList } from './field-list/field-list';
import { Field as FarmerField } from '../../shared/models';

enum SectionField {
  MAP,
  LIST
}
@Component({
  selector: 'app-field',
  imports: [MatButtonModule, MatIconModule, MatSidenavModule, MatProgressBarModule, AgroMap, FieldList],
  templateUrl: './field.html',
  styleUrl: './field.scss',
})
export class Field {
  private service = inject(FieldService);
  private destroyRef = inject(DestroyRef);

  public polygons = signal<any[]>([]);
  public fields = signal<FarmerField[]>([]);
  public isLoading = signal<boolean>(false);

  public currentSectionSignal = signal<SectionField>(SectionField.MAP);

  public currentSection = SectionField;

  ngOnInit(): void {
    this.getFields();
  }

  private getFields(): void {
    this.isLoading.set(true);

    this.service.getFields()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(fields => {
        this.polygons.set(fields.map((f) => ({ color: f.colorField, polygon: JSON.parse(f.boundaryCoordinates) })) as []);
        this.fields.set(fields);
        this.isLoading.set(false);
      });
  }
}
