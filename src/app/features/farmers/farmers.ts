import { Component, DestroyRef, inject, signal } from '@angular/core';
import { FarmersService } from './farmers-service';
import { takeUntilDestroyed, toObservable, toSignal } from '@angular/core/rxjs-interop';

import { CreateFarmerDto, Farmer } from '../../shared/models';
import { FarmersList } from './farmers-list/farmers-list';
import { debounceTime, distinctUntilChanged, finalize, merge, Subject, switchMap, tap } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CreateFarmer } from './create-farmer/create-farmer';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-farmers',
  imports: [MatButtonModule, MatTabsModule, FarmersList, MatProgressBarModule, MatIcon, MatDialogModule, MatFormFieldModule, MatInputModule],
  templateUrl: './farmers.html',
  styleUrl: './farmers.scss',
})
export class Farmers {
  private farmerService = inject(FarmersService);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);
  readonly dialog = inject(MatDialog);

  public isLoading = signal<boolean>(false);
  public searchTerm = signal<string>('');

  private refresh$ = new Subject<void>();
  private search$ = toObservable(this.searchTerm);

  public farmers = toSignal(
    merge(this.refresh$, this.search$)
      .pipe(
        tap(() => this.isLoading.set(true)),
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(() =>
          this.farmerService.getFarmers(this.searchTerm()).pipe(
            finalize(() => this.isLoading.set(false))
          )
        )
      ),
    {
      initialValue: []
    }
  )

  public selectFarmer(farmer: Farmer): void {
    this.router.navigate([`/farmers/${farmer.id}`]);
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(CreateFarmer, {
      minWidth: '800px',
    });

    dialogRef.afterClosed().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(result => {
      if (result) {
        this.createFarmer(result);
      }
    });
  }

  public deleteFarmer(id: number | string): void {
    this.isLoading.set(true);
    this.farmerService.deleteFarmer(id)
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => this.refresh$.next());
  }

  private createFarmer(farmer: CreateFarmerDto): void {
    this.isLoading.set(true);
    this.farmerService.createFarmer(farmer)
      .pipe(
        takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.refresh$.next());
  }
}
