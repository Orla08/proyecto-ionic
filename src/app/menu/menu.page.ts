import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from "@ionic/angular";
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class MenuPage implements OnInit {

  constructor(
    private router: Router,
    private storageService: StorageService,
    private toastService: ToastService,
  ) { }

  ngOnInit() { }

  async logout() {
    await this.storageService.remove('login');
    await this.storageService.remove('UsuarioActivo');
    await this.toastService.showMessageInfo('Sesión cerrada correctamente');
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }

  goPageArtits() {
    this.router.navigateByUrl('menu/artits', { replaceUrl: true });
  }

  goHome() {
    this.router.navigateByUrl('menu/home', { replaceUrl: true });
  }
}
