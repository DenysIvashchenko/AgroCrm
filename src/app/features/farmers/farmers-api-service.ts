import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ENV } from '../../../environment/environment.token';
import { Observable } from 'rxjs';
import { Farmer } from '../../shared/models';


@Injectable({
  providedIn: 'root',
})
export class FarmersApiService {
  private http = inject(HttpClient);
  private URL = inject(ENV).apiEndpoint;

  private baseUrl = `${this.URL}/farmers`;

  public getFarmers(): Observable<Farmer[]> {
    return this.http.get<Farmer[]>(this.baseUrl);
  }

}
