import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS, MatNativeDateModule, NativeDateAdapter } from '@angular/material/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Profile } from '../../models/profile.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-profile-dialog',
  imports: [CommonModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule, MatDialogModule, FormsModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './edit-profile-dialog.component.html',
  styleUrl: './edit-profile-dialog.component.css',
  providers: [ {provide: DateAdapter, useClass: NativeDateAdapter}, {provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS}, ]
})
export class EditProfileDialogComponent {
  profileForm: FormGroup;

  constructor(
      private fb: FormBuilder,
      private dialogRef: MatDialogRef<EditProfileDialogComponent>,
      private router: Router,
      private authService: AuthService
    ) {
      this.profileForm = this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        postalCode: ['', Validators.required],
        country: ['', Validators.required],
        phoneNumber: ['', Validators.required],
        bio: [''],
        dateOfBirth: ['', Validators.required]
      });
    }

    

    submitProfile() {
      const formValue = this.profileForm.value;

      const profile: Profile = {
        address: {
          street: formValue.street,
          city: formValue.city,
          postalCode: formValue.postalCode,
          country: formValue.country
        },
        phoneNumber: formValue.phoneNumber,
        dateOfBirth: formValue.dateOfBirth.toISOString(),
        bio: formValue.bio
      }

      this.authService.editProfile(profile).subscribe(
        (success) => {
          if (success) {
            alert('Updated profile successfully.');
            this.dialogRef.close();
            this.router.navigate(['/profile'])
          }
          else {
            alert('Unable to save changes.')
          }
        }
      )
    }
}
