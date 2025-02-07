import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DateAdapter, MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS, MatNativeDateModule, MatOptionModule, NativeDateAdapter } from '@angular/material/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AdminOrder } from '../../../models/admin-order.model';
import { OrderManagementService } from '../../../services/order-management.service';
import { AdminOrderSearchQuery } from '../../../models/admin-order-search-query.model';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { ChangeStatusDialogComponent } from '../change-status-dialog/change-status-dialog.component';

@Component({
  selector: 'app-admin-order-management',
  templateUrl: './admin-order-management.component.html',
  styleUrls: ['./admin-order-management.component.css'],
  imports: [CommonModule, MatOptionModule, MatToolbarModule, MatFormFieldModule, MatCardModule, MatDatepickerModule, MatNativeDateModule, MatDialogModule, FormsModule, ReactiveFormsModule, MatInputModule, MatButtonModule, MatTableModule, MatIconModule, MatSelectModule, MatSortModule],
  providers: [ {provide: DateAdapter, useClass: NativeDateAdapter}, {provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS} ]
})
export class AdminOrderManagementComponent implements OnInit {
  private ordersSubject = new BehaviorSubject<AdminOrder[]>([]);
  orders$ = this.ordersSubject.asObservable();

  searchForm: FormGroup;

  constructor(
    private service: OrderManagementService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    this.searchForm = this.fb.group({
      userId: [null],
      startDate: [null],
      endDate: [null],
      status: [null],
      paymentMethod: [null],
      minTotalPrice: [null],
      maxTotalPrice: [null],
    });
  }

  ngOnInit(): void {
    this.searchOrders();
  }

  searchOrders(): void {
    const query: AdminOrderSearchQuery = this.searchForm.value;
    this.service.searchOrders(query).subscribe({
      next: (orders) => this.ordersSubject.next(orders),
      error: (err) => console.error('Failed to load orders', err),
    });
  }

  openStatusDialog(order: AdminOrder): void {
    const dialogRef = this.dialog.open(ChangeStatusDialogComponent, {
      data: { currentStatus: order.order.status },
    });

    dialogRef.afterClosed().subscribe((newStatus: string) => {
      if (newStatus) {
        this.updateOrderStatus(order.order.id, newStatus);
      }
    });
  }

  updateOrderStatus(orderId: number, newStatus: string): void {
    this.service.updateOrderStatus(orderId, newStatus).subscribe({
      next: (updatedOrder) => {
        this.searchOrders();
      },
      error: (err) => console.error('Failed to update order status', err),
    });
  }
}