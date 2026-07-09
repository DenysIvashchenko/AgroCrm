import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { FarmerRepository } from '../domain/farmer.repository';
import { CreateFarmerDto, Farmer } from '../../../shared/models';
import { FarmersApiService } from '../infrastructure/farmers-api-service';


@Injectable({
  providedIn: 'root',
})
export class FarmersService implements FarmerRepository {

  private readonly api = inject(FarmersApiService);

  public getFarmers(searchTerm?: string): Observable<Farmer[]> {
    const search = searchTerm ? searchTerm.replace('+', '').trim() : undefined;
    return this.api.getFarmers(search);
  }

  public getFarmerById(id: number | string): Observable<Farmer> {
    return this.api.getFarmerById(id);
  }

  public createFarmer(farmer: CreateFarmerDto): Observable<Farmer> {
    return this.api.createFarmer(farmer);
  }

  public updateFarmer(id: number | string, farmer: Farmer): Observable<Farmer> {
    return this.api.updateFarmer(id, farmer);
  }

  public deleteFarmer(id: number | string): Observable<void> {
    return this.api.deleteFarmer(id);
  }
}
