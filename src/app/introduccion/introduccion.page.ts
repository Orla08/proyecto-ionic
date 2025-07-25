import { StorageService } from './../services/storage.service';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-introduccion',
  templateUrl: './introduccion.page.html',
  styleUrls: ['./introduccion.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IntroduccionPage implements OnInit {


  theme: string = "claro";
  colorTheme: string = 'var(--bg-claro-2)';

  constructor(
    private router: Router,
    private storageService: StorageService
  ) {

  }

  ngOnInit() {
  }

  async goLogin() {
    await this.storageService.set('IWasAtIntroduction', 'true')
    this.router.navigateByUrl("/login")
  }

  slides = [
    {
      icon: 'musical-notes-outline',
      title: 'Explora tu música',
      subtitle: 'Escucha y descubre canciones de todos los géneros.',
    },
    {
      icon: 'headset-outline',
      title: 'Crea playlists',
      subtitle: 'Agrupa tus canciones favoritas en listas personalizadas.',
    },
    {
      icon: 'radio-outline',
      title: 'Estaciones en vivo',
      subtitle: 'Accede a estaciones de radio en tiempo real.',
    },
    {
      icon: 'rocket-outline',
      title: '¡Comencemos!',
      subtitle: 'Prepárate para disfrutar de la mejor experiencia musical.',
      final: true
    }
  ];


}
