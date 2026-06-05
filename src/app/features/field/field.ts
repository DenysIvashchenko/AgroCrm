import { Component, inject, signal } from '@angular/core';
import { FieldService } from './field-service';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AgroMap } from '../../shared/components/agro-map/agro-map';

@Component({
  selector: 'app-field',
  imports: [MatButtonModule, MatIconModule, MatSidenavModule, AgroMap],
  templateUrl: './field.html',
  styleUrl: './field.scss',
})
export class Field {
  private service = inject(FieldService);

  public polygons = signal<any[]>([]);

  ngOnInit(): void {
    this.getFields();
  }

  private getFields(): void {
    this.service.getFields().subscribe(fields => {
      this.polygons.set(fields.map((f) => ({ color: f.colorField, polygon: JSON.parse(f.boundaryCoordinates) })) as []);
    });
  }
}
