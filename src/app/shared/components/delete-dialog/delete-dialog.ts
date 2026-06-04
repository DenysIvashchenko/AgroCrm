import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MatDialogActions, MatDialogContent, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog',
  imports: [MatDialogActions, MatDialogContent, MatButtonModule],
  templateUrl: './delete-dialog.html',
  styleUrl: './delete-dialog.scss',
})
export class DeleteDialog {
  public dialogRef = inject(MatDialogRef<DeleteDialog>);
  public readonly data = inject<{ message: string }>(MAT_DIALOG_DATA);
}
