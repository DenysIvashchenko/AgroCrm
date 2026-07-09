import { Component, computed, inject, input, OnInit, signal, DestroyRef } from '@angular/core';
import { Farmer } from '../../../../shared/models';

import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';

import { DatePipe } from '@angular/common';

import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FarmersService } from '../../application/farmers-service';

@Component({
  selector: 'app-farmers-details',
  imports: [MatIcon, MatButtonModule, MatTabsModule, MatTableModule, DatePipe, MatProgressBarModule],
  templateUrl: './farmers-details.html',
  styleUrl: './farmers-details.scss',
})
export class FarmersDetails implements OnInit {
  private farmerService = inject(FarmersService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  public farmer = signal<Farmer | null>(null);
  public crops = computed(() => this.farmer()?.fields.flatMap((f) => [...f.crops]) || []);

  public isLoading = signal<boolean>(false);

  public displayedColumnsField = ['id', 'name', 'areaHa', 'soilType', 'createdAt'];
  public displayedColumnsCrops = ['id', 'name', 'season', 'status', 'expectedYield', 'actualYield', 'createdAt'];

  ngOnInit() {
    this.getFarmerById();
  }

  public goBack(): void {
    this.router.navigate(['/farmers']);
  }

  private getFarmerById(): void {
    const farmerId = this.route.snapshot.params['id'];

    this.isLoading.set(true);
    this.farmerService.getFarmerById(farmerId)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.isLoading.set(false))
      )
      .subscribe((data) => {
        this.farmer.set(data);
      });
  }
}
