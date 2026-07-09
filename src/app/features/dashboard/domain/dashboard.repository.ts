import { Observable } from "rxjs/internal/Observable";
import { DashboardResponse } from "./dashboard.type";
import { DashboardChartsResponse } from "./dashboard-chart.type";

export abstract class DashboardRepository {
    abstract getDashboard(): Observable<DashboardResponse>;
    abstract getDashboardLogs(): Observable<any>;
    abstract getDashboardCharts(): Observable<DashboardChartsResponse>;
}