import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-change-status-dialog',
  imports: [MatDialogModule, MatFormFieldModule, MatSelectModule, CommonModule, FormsModule, MatButtonModule],
  templateUrl: './change-status-dialog.component.html',
  styleUrl: './change-status-dialog.component.css'
})
export class ChangeStatusDialogComponent {
  selectedStatus: string;

  constructor(
    public dialogRef: MatDialogRef<ChangeStatusDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { currentStatus: string }
  ) {
    this.selectedStatus = data.currentStatus;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.selectedStatus);
  }
}
