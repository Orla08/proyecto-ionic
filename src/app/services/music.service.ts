import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Track {
  id: number;
  album_id: number;
  disc_number: number;
  duration_ms: number;
  name: string;
  preview_url: string;
  track_number: number;
  created_at: string; // o Date si lo vas a parsear
  updated_at: string; // o Date si lo vas a parsear
  artist_id: number;
}


export interface requestToFavoriteTrack {
  favorite_track: {
    user_id: number;
    track_id: number
  }
}


@Injectable({
  providedIn: 'root'
})
export class MusicService {

  urlServer: string = "https://music.fly.dev"

  constructor(
    public http: HttpClient
  ) { }


  getTracks(): Observable<Track[]> {
    return this.http.get<Track[]>(`${this.urlServer}/tracks`)
  }

  getTracksByArtitsId(artitsId: number): Observable<Track[]> {
    return this.http.get<Track[]>(`${this.urlServer}/tracks/artist/${artitsId}`)
  }

  getTracksByAlbumId(almbunId: number): Observable<Track[]> {
    return this.http.get<Track[]>(`${this.urlServer}/tracks/album/${almbunId}`)
  }

  getAllAlbums() {
    return this.http.get<any[]>(`${this.urlServer}/albums`)
  }

  getAlbumById(albumId: number) {
    return this.http.get<any[]>(`${this.urlServer}/tracks/album/${albumId}`)
  }

  getAllArtits() {
    return this.http.get<any[]>(`${this.urlServer}/artists`)
  }

  getArtitsById(id: number) {
    return this.http.get<any[]>(`${this.urlServer}/artists/${id}`)
  }


  getAllTracksFavorites() {
    return this.http.get<any[]>(`${this.urlServer}/favorite_tracks`)
  }

  postTrackFavorite(body: requestToFavoriteTrack) {
    return this.http.post<any>(`${this.urlServer}/favorite_tracks`, body)
  }

  deleteTrackFavorite(idTrack: number) {
    return this.http.delete<any>(`${this.urlServer}/favorite_tracks/${idTrack}`)
  }

}
