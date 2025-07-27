import { Component, Input, OnInit } from '@angular/core';
import { ModalController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-songs-modal',
  templateUrl: './songs-modal.page.html',
  styleUrls: ['./songs-modal.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class SongsModalPage implements OnInit {

  @Input() tracks: any[] = [];
  @Input() artist: any;

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    // console.log('Artista:', this.artist);
    // console.log('Canciones:', this.tracks);
  }

  closeModal() {
    this.modalController.dismiss();
  }

  playPreview(url: string) {
    const audio = new Audio(url);
    audio.play();
  }
  selectSong(song: any) {
    this.modalController.dismiss(song); // Devuelve la canción seleccionada
  }
}
