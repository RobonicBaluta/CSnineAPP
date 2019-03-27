import { Component } from '@angular/core';
import {Observable} from 'rxjs'; 
import { AlertController} from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { TaskModalPage } from '../task-modal/task-modal.page';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(public modalController: ModalController,
    public router: Router,) {}

  async openModal() {
    const modal = await this.modalController.create({
      component: TaskModalPage,
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        console.log('Modal Sent Data :', dataReturned);
      }
    });
    return await modal.present();
  }
}
