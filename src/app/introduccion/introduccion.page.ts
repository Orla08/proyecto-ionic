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

  async goHome() {
    await this.storageService.set('IWasAtIntroduction', 'true')
    this.router.navigateByUrl("menu/home")
  }

  slides = [
    {
      icon: 'musical-notes-outline',
      title: '¡Descubre tu nuevo universo musical!',
      subtitle: 'Explora millones de canciones, playlists curadas y artistas emergentes que se adaptan a tu estilo.',
    },
    {
      icon: 'headset-outline',
      title: 'Tu música, tus emociones',
      subtitle: 'Desde el pop más pegajoso hasta lo más indie, encuentra las vibras perfectas para cada momento.',
    },
    {
      icon: 'cloud-download-outline',
      title: 'Escucha sin interrupciones',
      subtitle: 'Conéctate o descarga tus canciones favoritas para disfrutarlas sin conexión.',
    },
    {
      icon: 'list-outline',
      title: 'Crea, organiza y comparte',
      subtitle: 'Arma tus playlists, sigue a tus artistas favoritos y comparte lo que estás escuchando.',
    },
    {
      icon: 'moon-outline',
      title: 'Modo nocturno activado',
      subtitle: 'Disfruta de una interfaz suave, en modo claro u oscuro, para que tu música no te canse la vista.',
    },
    {
      icon: 'rocket-outline',
      title: 'Todo listo para vibrar',
      subtitle: 'Comienza ahora a sentir la música como nunca antes.',
    }
  ];


}
