import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Observable } from 'rxjs';

export interface UserCreateRequest {
  name: string;
  username: string;
  email: string;
  password: string;
}

export interface UserLogin {
  email: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  base_url: string = "https://music.fly.dev"

  private readonly STORAGE_KEY = 'users';

  constructor(private storage: Storage,
    public http: HttpClient
  ) {
    this.initStorage();
  }

  private async initStorage() {
    await this.storage.create();
  }

  async registerUser(payload: any): Promise<string> {
    const users: any[] = (await this.storage.get(this.STORAGE_KEY)) || [];

    // Validar si ya existe un usuario con el mismo email
    const exists = users.some(user => user.email === payload.email);
    if (exists) {
      return Promise.reject('El usuario ya está registrado');
    }

    users.push(payload);
    await this.storage.set(this.STORAGE_KEY, users);
    return Promise.resolve('Registro exitoso');
  }

  async loginUser(payload: { email: string; password: string }): Promise<string> {
    const users: any[] = (await this.storage.get(this.STORAGE_KEY)) || [];

    const user = users.find(
      u => u.email === payload.email && u.password === payload.password
    );

    if (user) {
      return Promise.resolve('Login realizado con éxito');
    } else {
      return Promise.reject('Correo o contraseña incorrectos');
    }
  }


  register(user: UserCreateRequest): Observable<any> {
    const payload = {
      user: {
        email: user.email,
        password: user.password,
        name: user.name,
        username: user.username
      }
    };
    return this.http.post(`${this.base_url}/signup`, payload);
  }

  login(body: UserLogin): Observable<any> {
    const payload = {
      user: {
        email: body.email,
        password: body.password
      }
    };
    return this.http.post(`${this.base_url}/login`, payload);
  }

  logout(): Observable<any> {
    return this.http.delete(`${this.base_url}/logout`);
  }
}
