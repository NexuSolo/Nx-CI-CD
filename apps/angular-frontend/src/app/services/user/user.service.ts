import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
}

export interface GetUsersResponse {
  users: User[];
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/users';
  
  // Signaux pour la gestion d'état
  users = signal<User[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  getUsers(page = 1, limit = 10): Observable<GetUsersResponse> {
    this.loading.set(true);
    this.error.set(null);
    
    return this.http.get<GetUsersResponse>(`${this.apiUrl}?page=${page}&limit=${limit}`);
  }

  getUser(id: number): Observable<User> {
    this.loading.set(true);
    this.error.set(null);
    
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  createUser(user: CreateUserRequest): Observable<User> {
    this.loading.set(true);
    this.error.set(null);
    
    return this.http.post<User>(this.apiUrl, user);
  }

  // Méthodes pour mettre à jour les signaux
  setUsers(users: User[]) {
    this.users.set(users);
    this.loading.set(false);
  }

  setLoading(loading: boolean) {
    this.loading.set(loading);
  }

  setError(error: string | null) {
    this.error.set(error);
    this.loading.set(false);
  }
}
