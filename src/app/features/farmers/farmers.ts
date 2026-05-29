import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { FarmersService } from './farmers-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Farmer } from '../../shared/models';

import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-farmers',
  imports: [MatIcon, MatButtonModule, MatTabsModule, DatePipe],
  templateUrl: './farmers.html',
  styleUrl: './farmers.scss',
})
export class Farmers implements OnInit {
  private farmerService = inject(FarmersService);
  private destroyRef = inject(DestroyRef);

  public farmers = signal<Farmer[]>([]);
  public farmer = signal<Farmer | null>(null);

  ngOnInit() {
    this.farmerService.getFarmers()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        this.farmers.set(data);
        this.farmer.set(data[0] || null);
      });
  }

  public selectFarmer(farmer: Farmer) {
    this.farmer.set(farmer);
  }
}
