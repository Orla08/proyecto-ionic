import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    private storage: StorageService,
    private router: Router
  ) { }

  async canActivate(): Promise<boolean> {
    const isLoggedIn = await this.storage.get('login');

    if (isLoggedIn === 'true') {
      return true;
    } else {
      this.router.navigateByUrl('/login', { replaceUrl: true });
      return false;
    }
  }
}
