import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, viewChild, ViewContainerRef } from '@angular/core';
import { DashboardService } from './dashboard-service';
import { WidgetFactoryService } from './widgets/widget-factory';
import { WidgetRenderer } from './widgets/widget-renderer';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Dashboard implements OnInit {
  private readonly viewContainerRef = viewChild.required('widgetAnchor', { read: ViewContainerRef });
  private readonly chartViewContainerRef = viewChild.required('widgetChartAnchor', { read: ViewContainerRef });

  private factory = inject(WidgetFactoryService);
  private renderer = inject(WidgetRenderer);
  private destroyRef = inject(DestroyRef);

  private service = inject(DashboardService);

  ngOnInit(): void {
    this.service.getDashboard().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(
      (response) => {
        const cardInstructions = this.factory.createWidgetInstructions(response);
        cardInstructions.forEach(instruction => {
          this.renderer.renderWithData(
            this.viewContainerRef(),
            instruction.componentClass,
            instruction.payload
          );
        });
      }
    );

    this.service.getDashboardLogs().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(
      (logs) => {
        // Handle logs data
      }
    );

    this.service.getDashboardCharts().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (response) => {
        const chartInstructions = this.factory.mapResponseToWidgets(response);

        chartInstructions.forEach(instruction => {
          this.renderer.renderWithData(
            this.chartViewContainerRef(),
            instruction.componentClass,
            instruction.payload
          );
        });
      }
    });
  }
}
