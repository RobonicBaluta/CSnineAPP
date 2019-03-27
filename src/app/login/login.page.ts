import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController} from '@ionic/angular';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor( private alertCtrl: AlertController, public navCtrl: NavController ) { }

  @ViewChild('myNav') nav: NavController
    async presentAlert() {
      
      const alert = await this.alertCtrl.create({
        header: 'Error',
        //subHeader: 'Hola que ase',
        message: 'The email or the password that you have written is wrong',
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
