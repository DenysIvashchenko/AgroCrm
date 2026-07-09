import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { SoilType } from '../../../../shared/models/enums/soil-type.enum';
import { SOIL_TYPES } from '../../../../shared/constants';
import { AgroMap } from '../../../../shared/components/agro-map/agro-map';
import { PolygonCoords } from '../../../../shared/models/types/poligons.type';

@Component({
  selector: 'app-create-farmer',
  imports: [MatInputModule, MatDialogModule, MatButtonModule, ReactiveFormsModule, MatFormFieldModule, MatIconModule, MatSelectModule, AgroMap],
  templateUrl: './create-farmer.html',
  styleUrl: './create-farmer.scss',
})
export class CreateFarmer {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<CreateFarmer>);

  public soilType = SOIL_TYPES;

  public formFarmer = this.fb.nonNullable.group({
    fullName: ['', [Validators.required, Validators.minLength(2)]],
    phone: ['', [Validators.required, Validators.pattern(/^\+?[1-9]\d{1,14}$/)]],
    email: ['', [Validators.required, Validators.email]],
    region: ['', Validators.required],
    totalLandHa: ['', [Validators.required, Validators.min(0.1)]],
    fields: this.fb.array([]),
  });

  public isValid = toSignal(this.formFarmer.statusChanges.pipe(
    map(() => !this.formFarmer.valid)
  ));

  get fieldsArray(): FormArray {
    return this.formFarmer.get('fields') as FormArray;
  }

  private buildFieldGroup(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      areaHa: ['', [Validators.required, Validators.min(0.1)]],
      soilType: ['BLACK_SOIL' as SoilType, Validators.required],
      latitude: [null as number | null],
      longitude: [null as number | null],
      boundaryCoordinates: [null as string | null],
    });
  }

  public addField(): void {
    this.fieldsArray.push(this.buildFieldGroup());
  }

  public removeField(index: number): void {
    this.fieldsArray.removeAt(index);
  }

  public createFarmer(): void {
    if (this.formFarmer.valid) {
      const newFarmer = this.formFarmer.value;
      this.dialogRef.close(newFarmer);
    }
  }

  public cancel(): void {
    this.dialogRef.close(false);
  }

  public onPolygonChange(e: PolygonCoords | null, i: number): void {
    this.fieldsArray.at(i).patchValue({
      latitude: e?.center.lat ?? null,
      longitude: e?.center.lng ?? null,
      boundaryCoordinates: e?.geoJson ?? null,
    });
  }
}
