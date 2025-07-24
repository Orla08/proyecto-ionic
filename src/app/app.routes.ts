import { Routes } from '@angular/router';
import { IntroGuard } from './guards/intro.guard';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'menu/home',
    pathMatch: 'full',
  },
  {
    path: 'introduccion',
    loadComponent: () => import('./introduccion/introduccion.page').then(m => m.IntroduccionPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'menu',
    loadComponent: () => import('./menu/menu.page').then(m => m.MenuPage),
    children: [
      {
        path: 'home',
        loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
        canActivate: [IntroGuard]
      },
    ]
  },

];
