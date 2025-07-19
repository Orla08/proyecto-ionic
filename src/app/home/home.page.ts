import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { arrowBack, arrowBackCircleOutline, moonOutline, sunnyOutline } from 'ionicons/icons';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

export interface slides {
  title: string,
  img: string,
  description: string
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonicModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage implements OnInit {

  theme: string = "claro";
  colorTheme: string = 'var(--bg-claro-2)';


  constructor(
    private router: Router,
    private storageService: StorageService
  ) {
    addIcons({ moonOutline, sunnyOutline, arrowBack });
  }

  ngOnInit(): void {
    this.loadTheme();
  }

  async loadTheme() {
    const saveTheme = await this.storageService.get('theme');
    if (saveTheme) {
      this.colorTheme = saveTheme
    }
  }

  changeTeme() {
    this.theme = this.theme === "claro" ? "oscuro" : "claro";
    this.colorTheme = this.theme === "claro" ? "var(--bg-claro-2)" : "var(--bg-oscuro)";
  }


  goToIntroduction() {
    this.router.navigateByUrl("/introduccion")
  }

  listSlides: slides[] = [
    {
      title: 'Bienvenido al Ritmo de tu Vida',
      img: '../../assets/images/musica-1.jpg',
      description: 'Explora millones de canciones, playlists curadas y artistas emergentes que se adaptan a tu estilo.'
    },
    {
      title: 'Música que se siente',
      img: '../../assets/images/musica-2.jpg',
      description: 'Desde el pop más pegajoso hasta lo más indie, encuentra las vibras perfectas para cada momento del día.'
    },
    {
      title: 'Streaming sin límites',
      img: '../../assets/images/musica-3.jpg',
      description: 'Conéctate o descarga tus canciones favoritas para disfrutarlas sin conexión. Calidad de sonido superior, donde sea que estés.'
    },
    {
      title: 'Crea tu mundo sonoro',
      img: '../../assets/images/musica-4.jpg',
      description: 'Arma tus playlists, sigue a tus artistas favoritos y comparte lo que estás escuchando con tus amigos.'
    },
  ];
}
