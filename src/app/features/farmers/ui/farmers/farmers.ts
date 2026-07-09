import { Component, DestroyRef, inject, signal } from '@angular/core';

import { takeUntilDestroyed, toObservable, toSignal } from '@angular/core/rxjs-interop';

import { debounceTime, distinctUntilChanged, finalize, startWith, Subject, switchMap, tap } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FarmersList } from '../farmers-list/farmers-list';
import { FarmersService } from '../../application/farmers-service';
import { CreateFarmer } from '../create-farmer/create-farmer';
import { CreateFarmerDto, Farmer } from '../../../../shared/models';
import { DeleteDialog } from '../../../../shared/components/delete-dialog/delete-dialog';

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
  private snackBar = inject(MatSnackBar);

  public isLoading = signal<boolean>(false);
  public searchTerm = signal<string>('');

  private refresh$ = new Subject<void>();
  private search$ = toObservable(this.searchTerm);

  public farmers = toSignal(
    this.refresh$.pipe(
      startWith(null),
      tap(() => this.isLoading.set(true)),
      switchMap(() => this.search$.pipe(
        debounceTime(400),
        distinctUntilChanged(),
      )),
      tap(() => this.isLoading.set(true)),
      switchMap((search) => this.farmerService.getFarmers(search)
        .pipe(finalize(() => this.isLoading.set(false)))),
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

  public openDeleteDialog(id: number | string): void {
    const dialogRef = this.dialog.open(DeleteDialog, {
      data: { message: 'Are you sure you want to delete this farmer ?' },
    });

    dialogRef.afterClosed().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(result => {
      if (result) {
        this.deleteFarmer(id);
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
      .subscribe(() => {
        this.refresh$.next();
        this.snackBar.open('Farmer created successfully!', 'Close', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success']
        });
      });
  }
}
