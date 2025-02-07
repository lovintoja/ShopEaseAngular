import { ChangeDetectorRef, Component, NgModule, OnInit } from '@angular/core';
import { CreateProductDto } from '../../../models/productdto.model';
import { ProductManagementService } from '../../../services/product-management.service';
import { Product } from '../../../models/product.model';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-product-management',
  templateUrl: './admin-product-management.component.html',
  styleUrls: ['./admin-product-management.component.css'],
  imports: [CommonModule, CurrencyPipe, FormsModule, ReactiveFormsModule, MatInputModule, MatTableModule, MatIconModule, MatCardModule, MatToolbarModule, MatButtonModule]
})
export class ProductManagementComponent implements OnInit {
  private productsSubject = new BehaviorSubject<Product[]>([]); // Observable stream of products
  products$ = this.productsSubject.asObservable();  newProductForm: FormGroup;  // Define FormGroup for the form
  selectedProduct: Product | null = null;
  editProductForm: FormGroup;


  constructor(
    private service: ProductManagementService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    // Initialize the form
    this.newProductForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],  // Add validators
      price: ['', [Validators.required, Validators.min(1)]],  // Add price validators
      description: ['', [Validators.required, Validators.maxLength(500)]],  // Add description validators
      imageUrl: ['', [Validators.required, Validators.minLength(1)]],  // Image is required
    });

    this.editProductForm = this.fb.group({
      id: [{value: '', disabled: true}, [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(3)]],  // Add validators
      price: ['', [Validators.required, Validators.min(1)]],  // Add price validators
      description: ['', [Validators.required, Validators.maxLength(500)]],  // Add description validators
      imageUrl: ['', [Validators.required, Validators.minLength(1)]],  // Image is required
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.service.getProducts().subscribe({
      next: (data) => (this.productsSubject.next(data)),
      error: (err) => console.error('Failed to load products', err),
    });
  }

  addProduct(): void {
    if (this.newProductForm.invalid) {
      console.error('Form is invalid');
      return;
    }
    
    const newProduct: CreateProductDto = this.newProductForm.value;

    this.service.addProduct(newProduct).subscribe({
      next: (product) => {
        const productsAdded = this.productsSubject.value;
        productsAdded.push(product);
        this.productsSubject.next(productsAdded);
        this.newProductForm.reset();  // Reset form after successful submission
      },
      error: (err) => console.error('Failed to add product', err),
    });
  }

  updateProduct(): void {
    if (this.editProductForm.valid) {
      const updatedProduct = {
        ...this.editProductForm.value,  // This will exclude the disabled `id`
        id: this.selectedProduct?.id,    // Manually add `id` to the form value
      };
      this.service.updateProduct(updatedProduct).subscribe({
        next: (product) => {
          const index = this.productsSubject.value.findIndex((p) => p.id === product.id);
          if (index !== -1) {
            const productsEdited = this.productsSubject.value;
            productsEdited[index] = product;
            this.productsSubject.next(productsEdited)
          }
          this.selectedProduct = null; // Reset form
          this.cdr.detectChanges();
        },
        error: (err) => console.error('Failed to update product', err),
      });
    }
  }

  deleteProduct(id: number): void {
    this.service.deleteProduct(id).subscribe({
      next: () => {
        const productsDeleted = this.productsSubject.value.filter((p) => p.id !== id);
        this.productsSubject.next(productsDeleted);
      },
      error: (err) => console.error('Failed to delete product', err),
    });
  }

  selectProductForEdit(product: Product): void {
    this.selectedProduct = product;

    // Patch values to the form
    if (this.selectedProduct) {
      this.editProductForm.patchValue({
        id: this.selectedProduct.id,
        name: this.selectedProduct.name,
        price: this.selectedProduct.price,
        description: this.selectedProduct.description,
        imageUrl: this.selectedProduct.imageUrl,
      });
    }
  }
}