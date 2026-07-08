import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { Color, LegendPosition, NgxChartsModule } from '@swimlane/ngx-charts';
import { WIDGET_DATA } from '../constants/widget.constant';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chart',
  imports: [NgxChartsModule, CommonModule],
  template: `
    @if (widgetData?.data?.type === 'bar-chart') {
      <ngx-charts-bar-vertical
        [view]="[400, 300]"
        [scheme]="colorScheme"
        [results]="widgetData?.data?.chartData || []" 
        [gradient]="gradient"
        [legend]="showLegend"
        [legendTitle]="widgetData?.data?.title || ''" 
        [showXAxisLabel]="true"
        [showYAxisLabel]="true"
        [legendPosition]="legendPosition"
        [xAxis]="true"
        [yAxis]="true">
      </ngx-charts-bar-vertical>
  }
    @if(widgetData?.data?.type === 'pie-chart') {
      <ngx-charts-pie-chart
        [view]="[400, 250]"
        [scheme]="colorScheme"
        [results]="widgetData?.data?.chartData || []" 
        [gradient]="gradient"
        [legend]="showLegend"
        [legendPosition]="legendPosition"
        [labels]="showLabels"
        [legendTitle]="widgetData?.data?.title || ''" 
        [doughnut]="isDoughnut"
      >
      </ngx-charts-pie-chart>
  }`,
  styles: [
    ':host { display: flex; justify-content: center; align-items: center; }',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Chart {
  protected readonly widgetData = inject(WIDGET_DATA, { optional: true });

  // options
  gradient: boolean = false;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: LegendPosition = LegendPosition.Below;

  colorScheme = {
    domain: this.widgetData?.data?.color || ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  } as Color;

}
