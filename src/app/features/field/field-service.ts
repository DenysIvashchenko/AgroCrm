import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { FieldApiService } from './field-api-service';
import { Field } from '../../shared/models';

@Injectable({
  providedIn: 'root',
})
export class FieldService {
  private readonly api = inject(FieldApiService);

  public getFields(): Observable<Field[]> {
    return this.api.getFields();
  }
}
