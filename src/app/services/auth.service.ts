import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  loginUser(payload: any) {
    return new Promise((accept, reject) => {
      if (payload.email == 'orladelahoz2704@gmail.com' && payload.password == '12345') {
        accept('Login realizado con exito')
      } else {
        reject('Error en el logueo')
      }
    })
  }
}
