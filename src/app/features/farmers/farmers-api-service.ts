import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ENV } from '../../../environment/environment.token';
import { Observable } from 'rxjs';
import { CreateFarmerDto, Farmer } from '../../shared/models';


@Injectable({
  providedIn: 'root',
})
export class FarmersApiService {
  private http = inject(HttpClient);
  private URL = inject(ENV).apiEndpoint;

  private baseUrl = `${this.URL}/farmers`;

  public getFarmers(searchTerm?: string): Observable<Farmer[]> {
    const url = searchTerm ? `${this.baseUrl}?search=${searchTerm}` : this.baseUrl;
    return this.http.get<Farmer[]>(url);
  }

  public getFarmerById(id: string | number): Observable<Farmer> {
    return this.http.get<Farmer>(`${this.baseUrl}/${id}`);
  }

  public createFarmer(farmer: CreateFarmerDto): Observable<Farmer> {
    return this.http.post<Farmer>(this.baseUrl, farmer);
  }

  public updateFarmer(id: string | number, farmer: Farmer): Observable<Farmer> {
    return this.http.put<Farmer>(`${this.baseUrl}/${id}`, farmer);
  }

  public deleteFarmer(id: string | number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
