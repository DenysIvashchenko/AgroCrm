import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ENV } from '../../../../environment/environment.token';
import { DashboardResponse } from '../domain/dashboard.type';
import { DashboardChartsResponse } from '../domain/dashboard-chart.type';
import { DashboardRepository } from '../domain/dashboard.repository';


@Injectable({
  providedIn: 'root',
})
export class DashboardApiService implements DashboardRepository {
  private URL = inject(ENV).apiEndpoint;
  private http = inject(HttpClient);

  private baseUrl = `${this.URL}/dashboard`;

  public getDashboard(): Observable<DashboardResponse> {
    return this.http.get<DashboardResponse>(this.baseUrl);
  }

  public getDashboardLogs(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/logs`);
  }

  public getDashboardCharts(): Observable<DashboardChartsResponse> {
    return this.http.get<DashboardChartsResponse>(`${this.baseUrl}/charts`);
  }
}
