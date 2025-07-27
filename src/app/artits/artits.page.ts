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
  song?: Track;
  isPlaying: boolean = false;
  audio: HTMLAudioElement | null = null;
  progress: number = 0;
  currentTime: string = '0:00';
  durationTime: string = '0:00';
  isFavoriteSong: boolean = false;
  userLogueado: any


  constructor(
    private router: Router,
    private storageService: StorageService,
    private musicService: MusicService,
    private modalController: ModalController
  ) {
  }

  async ngOnInit() {
    await this.loadUserLogueado();
    this.loadTheme();
    this.loadArtists();
    this.audio?.pause();
    this.audio = null;
  }

  async loadUserLogueado() {
    const user = await this.storageService.get('UsuarioActivo');
    this.userLogueado = user;
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

  async showSongsByArtists(artist: any) {
    const tracks = await this.musicService.getTracksByArtitsId(artist.id).toPromise();

    const modal = await this.modalController.create({
      component: SongsModalPage,
      componentProps: {
        tracks: tracks,
        artist: artist
      }
    });

    modal.onDidDismiss().then((result: any) => {
      if (result.data) {
        if (this.audio) {
          this.audio.pause();
          this.audio.currentTime = 0;
          this.audio = null;
        }
        this.isPlaying = false;
        this.progress = 0;
        this.currentTime = '0:00';
        this.durationTime = '0:00';
        this.song = result.data;
        this.FavoriteSong();
        this.audio = new Audio(this.song!.preview_url);
        this.audio.addEventListener('timeupdate', () => this.updateProgress());
        this.audio.addEventListener('ended', () => this.resetPlayer());
        this.audio.play();
        this.isPlaying = true;
      }
    });

    await modal.present();
  }


  playSong() {
    if (!this.song) return;

    if (!this.audio) {
      this.audio = new Audio(this.song.preview_url);
      this.audio.addEventListener('timeupdate', () => this.updateProgress());
      this.audio.addEventListener('ended', () => this.resetPlayer());
    }

    this.audio.play();
    this.isPlaying = true;
  }

  pauseSong() {
    this.audio?.pause();
    this.isPlaying = false;
  }

  togglePlay() {
    this.isPlaying ? this.pauseSong() : this.playSong();
  }

  updateProgress() {
    if (!this.audio) return;
    const current = this.audio.currentTime;
    const duration = this.audio.duration;

    this.progress = (current / duration) * 100;
    this.currentTime = this.formatTime(current);
    this.durationTime = this.formatTime(duration);
  }

  formatTime(time: number): string {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  }

  resetPlayer() {
    this.isPlaying = false;
    this.progress = 0;
    this.currentTime = '0:00';
  }

  FavoriteSong() {
    if (this.song) {
      this.musicService.getAllTracksFavorites().subscribe({
        next: (res) => {
          if (res.length > 0) {
            this.isFavoriteSong = res.some((citas) => citas.track_id === this.song!.id);
          } else {
            this.isFavoriteSong = false;
          }
        },
        error: (err) => {
          console.error('Error al obtener favoritos', err);
          this.isFavoriteSong = false;
        }
      });
    }
  }


  markSongAsFavorite() {
    if (!this.song) return;

    const body = {
      favorite_track: {
        user_id: this.userLogueado.id,
        track_id: this.song.id
      }
    };
    this.musicService.postTrackFavorite(body).subscribe({
      next: () => {
        this.isFavoriteSong = true;
      },
      error: (err) => {
        console.error('Error al marcar como favorita:', err);
      }
    });
  }

  removeSongFromFavorites() {
    if (!this.song) return;

    this.musicService.deleteTrackFavorite(this.song.id).subscribe({
      next: () => {
        this.isFavoriteSong = false;
      },
      error: (err) => {
        console.error('Error al eliminar de favoritos:', err);
      }
    });
  }

  toggleFavorite() {
    if (this.isFavoriteSong) {
      this.removeSongFromFavorites();
    } else {
      this.markSongAsFavorite();
    }
  }


}