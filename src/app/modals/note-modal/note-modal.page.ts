import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, NavController, NavParams } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { RestApiService } from 'src/app/rest-api.service';

@Component({
  selector: 'app-note-modal',
  templateUrl: './note-modal.page.html',
  styleUrls: ['./note-modal.page.scss'],
})
export class NoteModalPage implements OnInit {
  companyId: any;
  defaultTitle: any;
  entityId: any;
  entityType: any;
  noteHtml: any;
  note: any;
  noteForm: FormGroup;
  constructor( 
    private modalController: ModalController
    ,private alertCtrl: AlertController, 
    public router: Router, 
    public navCtrl: NavController, 
    private formBuilder: FormBuilder, 
    public alertController: AlertController,
    public api: RestApiService, private navParams:NavParams
    ) { 
      
      this.noteForm = this.formBuilder.group({
        "note": [null],
        "title": [null],
        "entityId": [null],
        "entityType": [null],
        "NoteHtml": [null],  
      });
    }
    
    ngOnInit() {
      this.getCompanyId();
      this.noteForm.get('NoteHtml').setValue(this.noteForm.get('note'));
      this.defaultTitle = 'Said:';
      this.entityId=this.companyId;
      this.noteHtml=this.companyId;
      this.entityType='Company';
    }
 
    
    async getCompanyId(){
      this.companyId=this.navParams.get('companyId');
      console.log(this.companyId);
    }

    async addNote(){
      await this.api.addNote(this.noteForm.value)
      .subscribe(res => {        
        this.presentAlert()
        this.closeModal();
        // window.location.reload();
        //this.router.navigate(['/home']);
      }, (err) => {
        console.log(err);
      });
    }

    async closeModal() {
      const onClosedData: string = "Wrapped Up!";
      await this.modalController.dismiss(onClosedData);
    }
    
    async presentAlert() {
      const alert = await this.alertController.create({
        header: 'Alert',
        message: 'Note successfully created',
        buttons: ['OK']
      });
      alert.present();
    }
    
    
  }
  