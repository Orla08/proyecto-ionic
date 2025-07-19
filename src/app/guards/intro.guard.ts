import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { StorageService } from '../services/storage.service';

// export const introGuard: CanActivateFn = (route, state) => {
//   return true;
// };

@Injectable({
  providedIn: 'root'
})
export class IntroGuard implements CanActivate {
  constructor(
    private router: Router,
    private storageService: StorageService
  ) {

  }
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (await this.storageService.get('IWasAtIntroduction') == 'true') {
      return true
    } else {
      this.router.navigateByUrl('/introduccion')
      return true
    }
  }
};
