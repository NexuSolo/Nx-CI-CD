import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService, User } from '../../services/user/user.service';
import { UserForm } from '../user-form/user-form';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule, UserForm],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class UserList implements OnInit {
  private userService = inject(UserService);
  
  users = signal<User[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);
  showForm = signal<boolean>(false);

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.loading.set(true);
    this.error.set(null);
    
    this.userService.getUsers().subscribe({
      next: (response) => {
        this.users.set(response.users);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Erreur lors du chargement des utilisateurs');
        this.loading.set(false);
        console.error('Error loading users:', err);
      }
    });
  }

  toggleForm() {
    this.showForm.update(show => !show);
  }

  onUserCreated(user: User) {
    this.users.update(users => [...users, user]);
    this.showForm.set(false);
  }
}
