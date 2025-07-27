import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService, UserCreateRequest } from '../services/auth.service';
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
      name: new FormControl('Orlando De La Hoz', [
        Validators.required,
        Validators.minLength(15)
      ]),
      username: new FormControl('Orlando2704200', [
        Validators.required,
        Validators.minLength(10)
      ]),
      email: new FormControl('orladelahoz2704@gmail.com', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('123456789', [
        Validators.required,
        Validators.minLength(8)
      ])
    });

  }

  submit() {
    if (this.registerForm.valid) {
      const newUser: UserCreateRequest = this.registerForm.value;
      try {
        this.authService.register(newUser).subscribe({
          next: (res) => {
            if (res.status == "OK") {
              this.toastService.showMessageOk("Registro exitoso. Ahora puedes iniciar sesión.");
              this.router.navigateByUrl('/login');
            } else {
              this.toastService.showMessageError(`Error: al registrar`);
            }
          }
        })
      } catch (err: any) {
        this.toastService.showMessageError(`Error: ${err}`);
      }
    } else {
      this.toastService.showMessageInfo(`Faltan campos validos`);
    }
  }

  get name() {
    return this.registerForm.get('name')!;
  }

  get username() {
    return this.registerForm.get('username')!;
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
