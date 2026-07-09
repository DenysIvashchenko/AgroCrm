import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal, viewChild, ViewContainerRef } from '@angular/core';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EquipmentLoadDto } from '../../domain/dashboard-chart.type';
import { DashboardService, WidgetFactoryService, WidgetRenderer } from '../../application';


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

  public equipmentLoads = signal<EquipmentLoadDto[]>([]);

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
    ).subscribe((response) => {
      this.equipmentLoads.set(response.equipmentLoads);

      const chartInstructions = this.factory.mapResponseToWidgets(response);
      chartInstructions.forEach(instruction => {
        this.renderer.renderWithData(
          this.chartViewContainerRef(),
          instruction.componentClass,
          instruction.payload
        );
      });
    }
    );
  }
}
