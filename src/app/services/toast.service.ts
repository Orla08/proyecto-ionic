import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastController: ToastController) { }

  async showMessageOk(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color: 'success',
      position: 'top',
      icon: 'checkmark-circle-outline'
    });
    await toast.present();
  }

  async showMessageError(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color: 'danger',
      position: 'bottom',
      icon: 'close-circle-outline'
    });
    await toast.present();
  }

  async showMessageInfo(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color: 'primary',
      position: 'top',
      icon: 'information-circle-outline'
    });
    await toast.present();
  }
}
