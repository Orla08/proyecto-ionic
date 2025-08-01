import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';
import { AuthService, UserLogin } from '../services/auth.service';
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
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      password: new FormControl('', Validators.compose([Validators.required]))
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
      const user: UserLogin = this.loginForm.value
      this.authService.login(user).subscribe({
        next: async (res) => {
          if (res.status === 'OK') {
            this.toastService.showMessageOk(res.msg);
            await this.storageService.set('login', "true");
            await this.storageService.set('UsuarioActivo', res.user);

            this.router.navigateByUrl('menu/home', { replaceUrl: true });
          } else {
            this.toastService.showMessageError(res.msg);
          }
        },
        error: (err) => {
          this.toastService.showMessageError(`Error: ${err}`);
        }
      })
    }
  }


  goToRegister() {
    this.router.navigateByUrl('/register');
  }

}
