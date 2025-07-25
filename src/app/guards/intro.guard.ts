import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class IntroGuard implements CanActivate {
  constructor(
    private router: Router,
    private storageService: StorageService
  ) {

  }
  async canActivate(): Promise<boolean> {
    const hasSeenIntro = await this.storageService.get('IWasAtIntroduction');

    if (hasSeenIntro === 'true') {
      return true;
    } else {
      this.router.navigateByUrl('/introduccion', { replaceUrl: true });
      return false;
    }
  }
};
