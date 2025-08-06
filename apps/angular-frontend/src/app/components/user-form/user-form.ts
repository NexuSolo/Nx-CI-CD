import { ChangeDetectionStrategy, Component, inject, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { UserService, User, CreateUserRequest } from '../../services/user/user.service';

@Component({
  selector: 'app-user-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.html',
  styleUrl: './user-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class UserForm {
  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  
  userCreated = output<User>();
  
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  userForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]]
  });

  onSubmit() {
    if (this.userForm.valid) {
      this.loading.set(true);
      this.error.set(null);
      
      const userData: CreateUserRequest = {
        name: this.userForm.value.name || '',
        email: this.userForm.value.email || ''
      };

      this.userService.createUser(userData).subscribe({
        next: (user) => {
          this.loading.set(false);
          this.userCreated.emit(user);
          this.userForm.reset();
        },
        error: (err) => {
          this.loading.set(false);
          this.error.set('Erreur lors de la création de l\'utilisateur');
          console.error('Error creating user:', err);
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched() {
    Object.keys(this.userForm.controls).forEach(key => {
      const control = this.userForm.get(key);
      control?.markAsTouched();
    });
  }

  getFieldError(fieldName: string): string | null {
    const field = this.userForm.get(fieldName);
    if (field && field.errors && field.touched) {
      if (field.errors['required']) {
        return `${fieldName === 'name' ? 'Le nom' : 'L\'email'} est requis`;
      }
      if (field.errors['email']) {
        return 'Format d\'email invalide';
      }
      if (field.errors['minlength']) {
        return `${fieldName === 'name' ? 'Le nom' : 'L\'email'} doit contenir au moins ${field.errors['minlength'].requiredLength} caractères`;
      }
    }
    return null;
  }
}
