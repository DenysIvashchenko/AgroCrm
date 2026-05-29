import { inject, Injectable } from '@angular/core';
import { FarmersApiService } from './farmers-api-service';
import { Observable } from 'rxjs';
import { Farmer } from '../../shared/models';


@Injectable({
  providedIn: 'root',
})
export class FarmersService {

  private readonly api = inject(FarmersApiService);

  public getFarmers(): Observable<Farmer[]> {
    return this.api.getFarmers();
  }
}
