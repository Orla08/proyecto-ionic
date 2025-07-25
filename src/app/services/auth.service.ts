import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

export interface User {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly STORAGE_KEY = 'users';

  constructor(private storage: Storage) {
    this.initStorage();
  }

  private async initStorage() {
    await this.storage.create();
  }

  async registerUser(payload: User): Promise<string> {
    const users: User[] = (await this.storage.get(this.STORAGE_KEY)) || [];

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
    const users: User[] = (await this.storage.get(this.STORAGE_KEY)) || [];

    const user = users.find(
      u => u.email === payload.email && u.password === payload.password
    );

    if (user) {
      return Promise.resolve('Login realizado con éxito');
    } else {
      return Promise.reject('Correo o contraseña incorrectos');
    }
  }
}
