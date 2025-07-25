import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService, User } from '../services/auth.service';

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
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  async submit() {
    if (this.registerForm.valid) {
      const newUser: User = this.registerForm.value;
      try {
        await this.authService.registerUser(newUser);
        const toast = await this.toastCtrl.create({
          message: 'Registro exitoso. Ahora puedes iniciar sesión.',
          duration: 2000,
          color: 'success'
        });
        toast.present();
        this.router.navigateByUrl('/login');
      } catch (err) {
        const toast = await this.toastCtrl.create({
          message: String(err),
          duration: 2000,
          color: 'danger'
        });
        toast.present();
      }
    }
  }
}
