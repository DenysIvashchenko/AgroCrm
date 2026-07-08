import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardApiService } from './dashboard-api-service';
import { DashboardChartsResponse } from './models/dashboard-chart.type';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly api = inject(DashboardApiService);

  public getDashboard(): Observable<any> {
    return this.api.getDashboard();
  }

  public getDashboardLogs(): Observable<any> {
    return this.api.getDashboardLogs();
  }

  public getDashboardCharts(): Observable<DashboardChartsResponse> {
    return this.api.getDashboardCharts();
  }
}
