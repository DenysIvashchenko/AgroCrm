import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardApiService } from '../infrastructure/dashboard-api-service';
import { DashboardChartsResponse } from '../domain/dashboard-chart.type';
import { DashboardRepository } from '../domain/dashboard.repository';


@Injectable({
  providedIn: 'root',
})
export class DashboardService implements DashboardRepository {
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
