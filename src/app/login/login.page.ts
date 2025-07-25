import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule]
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

  constructor(
    private formBuolder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastCtrl: ToastController,
    private storageService: StorageService,
    private toastService: ToastService
  ) {
    this.loginForm = this.formBuolder.group({
      email: new FormControl('orladelahoz2704@gmail.com', Validators.compose([Validators.required, Validators.email])),
      password: new FormControl('12345', Validators.compose([Validators.required]))
    })
  }

  ngOnInit() {
  }

  get email() {
    return this.loginForm.get('email')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }

  submit() {
    if (this.loginForm.valid) {
      this.authService.loginUser(this.loginForm.value)
        .then(res => {
          this.toastService.showMessageOk("Ingreso éxitoso")
          this.storageService.set('login', "true");
          this.router.navigateByUrl("menu/home")
        })
        .catch(err => {
          console.error(err);
          this.toastService.showMessageError(`Error: ${err}`);
          // Mostrar mensaje de error al usuario si deseas
        });
    }
  }

  goToRegister() {
    this.router.navigateByUrl('/register');
  }

}
