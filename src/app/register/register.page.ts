import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService, User } from '../services/auth.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-registro',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IonicModule]
})
export class RegisterPage {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastCtrl: ToastController,
    private router: Router,
    private toastService: ToastService
  ) {
    this.registerForm = this.fb.group({
      nombre: new FormControl('', [
        Validators.required,
        Validators.minLength(2)
      ]),
      apellido: new FormControl('', [
        Validators.required,
        Validators.minLength(2)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ])
    });

  }

  async submit() {
    if (this.registerForm.valid) {
      const newUser: User = this.registerForm.value;
      try {
        await this.authService.registerUser(newUser);
        this.toastService.showMessageOk("Registro exitoso. Ahora puedes iniciar sesión.");
        this.router.navigateByUrl('/login');
      } catch (err: any) {
        this.toastService.showMessageError(`Error: ${err}`);
      }
    } else {
      this.toastService.showMessageInfo(`Faltan campos validos`);
    }
  }

  get nombre() {
    return this.registerForm.get('nombre')!;
  }

  get apellido() {
    return this.registerForm.get('apellido')!;
  }

  get email() {
    return this.registerForm.get('email')!;
  }

  get password() {
    return this.registerForm.get('password')!;
  }

  goToLogin() {
    this.router.navigateByUrl('/login');
  }

}
