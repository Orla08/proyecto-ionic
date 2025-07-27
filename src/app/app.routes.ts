import { Routes } from '@angular/router';
import { IntroGuard } from './guards/intro.guard';
import { LoginGuard } from './guards/login.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'introduccion',
    pathMatch: 'full',
  },
  {
    path: 'introduccion',
    loadComponent: () =>
      import('./introduccion/introduccion.page').then((m) => m.IntroduccionPage),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.page').then((m) => m.LoginPage),
    canActivate: [IntroGuard]
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./register/register.page').then((m) => m.RegisterPage),
    canActivate: [IntroGuard]
  },
  {
    path: 'menu',
    loadComponent: () =>
      import('./menu/menu.page').then((m) => m.MenuPage),
    canActivate: [IntroGuard, LoginGuard],
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadComponent: () =>
          import('./home/home.page').then((m) => m.HomePage)
      },
      {
        path: 'artits',
        loadComponent: () => import('./artits/artits.page').then(m => m.ArtitsPage)
      }
    ]
  },  {
    path: 'songs-modal',
    loadComponent: () => import('./songs-modal/songs-modal.page').then( m => m.SongsModalPage)
  },



];
