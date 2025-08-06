import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { User, CreateUserRequest, GetUsersResponse } from '../types/user.types';

// Types pour gRPC (normalement générés automatiquement)
interface GrpcUserClient {
  getUser(request: { id: number }): Promise<User>;
  createUser(request: CreateUserRequest): Promise<User>;
  getUsers(request: { page: number; limit: number }): Promise<GetUsersResponse>;
}

@Injectable({
  providedIn: 'root'
})
export class GrpcUserService {
  private grpcClient: GrpcUserClient | null = null;

  // Pour la démo, nous utiliserons le service HTTP comme fallback
  // Dans un vrai projet, vous configureriez un client gRPC web
  constructor() {
    // Ici vous initialiseriez votre client gRPC
    // Par exemple avec grpc-web ou connectrpc
    console.log('gRPC User Service initialized');
  }

  getUsers(page = 1, limit = 10): Observable<GetUsersResponse> {
    // Pour la démo, nous simulons un appel gRPC
    return from(
      fetch(`http://localhost:3000/api/users?page=${page}&limit=${limit}`)
        .then(response => response.json())
    );
  }

  getUser(id: number): Observable<User> {
    return from(
      fetch(`http://localhost:3000/api/users/${id}`)
        .then(response => response.json())
    );
  }

  createUser(user: CreateUserRequest): Observable<User> {
    return from(
      fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      }).then(response => response.json())
    );
  }

  // Méthode pour configurer le client gRPC réel
  private initializeGrpcClient() {
    // Configuration du client gRPC
    // Exemple avec grpc-web :
    /*
    const client = new GrpcWebClientBase({});
    this.grpcClient = new UserServiceClient('http://localhost:5000', {}, {});
    */
  }
}
