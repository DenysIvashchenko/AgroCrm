import { inject, Injectable } from '@angular/core';
import { ENV } from '../../../environment/environment.token';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Field } from '../../shared/models';

@Injectable({
  providedIn: 'root',
})
export class FieldApiService {
  private http = inject(HttpClient);
  private URL = inject(ENV).apiEndpoint;

  private baseUrl = `${this.URL}/fields`;

  public getFields(): Observable<Field[]> {
    return this.http.get<Field[]>(this.baseUrl);
  }
}
