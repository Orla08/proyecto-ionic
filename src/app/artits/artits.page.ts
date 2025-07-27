import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { MusicService, Track } from '../services/music.service';
import { SongsModalPage } from '../songs-modal/songs-modal.page';
// import { SongsModalPage } from '../songs-modal/songs-modal.page';

@Component({
  selector: 'app-artits',
  templateUrl: './artits.page.html',
  styleUrls: ['./artits.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ArtitsPage implements OnInit {

  theme: string = 'claro';
  colorTheme: string = 'var(--bg-claro-2)';
  artists: any[] = [];
  showAll = false;

  constructor(
    private router: Router,
    private storageService: StorageService,
    private musicService: MusicService,
    private modalController: ModalController
  ) { }

  ngOnInit(): void {
    this.loadTheme();
    this.loadArtists();
  }

  async loadTheme() {
    const savedTheme = await this.storageService.get('theme');
    if (savedTheme) {
      this.colorTheme = savedTheme;
      this.theme = savedTheme === 'var(--bg-claro-2)' ? 'claro' : 'oscuro';
    }
  }

  async changeTheme() {
    this.theme = this.theme === 'claro' ? 'oscuro' : 'claro';
    this.colorTheme = this.theme === 'claro' ? 'var(--bg-claro-2)' : 'var(--bg-oscuro)';
    await this.storageService.set('theme', this.colorTheme);
  }

  goToIntroduction() {
    this.storageService.remove("IWasAtIntroduction");
    this.router.navigateByUrl("/introduccion");
  }

  loadArtists() {
    this.musicService.getAllArtits().subscribe({
      next: (res) => {
        this.artists = res;
      },
      error: (err) => {
        console.error("Error cargando artistas", err);
      }
    });
  }

  toggleView() {
    this.showAll = !this.showAll;
  }

  async showSongsByArtist(artist: any) {
    const tracks = await this.musicService.getTracksByArtitsId(artist.id).toPromise();
    const modal = await this.modalController.create({
      component: SongsModalPage,
      componentProps: {
        tracks: tracks,
        artist: artist
      }
    });
    await modal.present();
  }
}