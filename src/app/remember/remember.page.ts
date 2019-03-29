import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController} from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-remember',
  templateUrl: './remember.page.html',
  styleUrls: ['./remember.page.scss'],
})
export class RememberPage implements OnInit {

  constructor( private alertCtrl: AlertController, public navCtrl: NavController ) { }

  @ViewChild('myNav') nav: NavController
    async presentAlert() {
      
      const alert = await this.alertCtrl.create({
        header: 'Recover',
        //subHeader: 'Hola que ase',
        message: 'An email has been sent to you',
        buttons: [
          {
            text: 'Ok',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            }
          }
        ]
      });
  
      await alert.present();
    }

  ngOnInit() {
  }

}
