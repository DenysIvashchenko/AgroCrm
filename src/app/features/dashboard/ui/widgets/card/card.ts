import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { WIDGET_DATA } from '../constants/widget.constant';

@Component({
  selector: 'app-card',
  imports: [MatIconModule],
  template: `
  <div class="stat-card">
    <div class="stat-card__icon">
        <mat-icon>{{ widgetData?.data?.icon }}</mat-icon>
    </div>
    <div class="stat-card__body">
        <div class="stat-card__label">{{ widgetData?.data?.name }}</div>
        <div class="stat-card__value">{{ widgetData?.data?.value }}</div>
        <!-- <div class="stat-card__change">{{ widgetData?.data?.change }}</div> -->
    </div>
</div>`,
  styleUrl: './card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Card {
  protected readonly widgetData = inject(WIDGET_DATA, { optional: true });
}
