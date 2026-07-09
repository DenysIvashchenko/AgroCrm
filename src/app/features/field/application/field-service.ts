import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { FieldApiService } from '../infrastructure/field-api-service';
import { Field } from '../../../shared/models';
import { FieldRepository } from '../domain/field.repository';

@Injectable({
  providedIn: 'root',
})
export class FieldService implements FieldRepository {
  private readonly api = inject(FieldApiService);

  public getFields(): Observable<Field[]> {
    return this.api.getFields();
  }
}
