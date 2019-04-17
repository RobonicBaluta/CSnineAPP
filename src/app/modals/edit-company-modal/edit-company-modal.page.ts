import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment, ModalController, Events } from '@ionic/angular';
import { AlertController, NavParams} from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from '../../rest-api.service';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import {Directive, ElementRef, Input} from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-company-modal',
  templateUrl: './edit-company-modal.page.html',
  styleUrls: ['./edit-company-modal.page.scss'],
})
export class EditCompanyModalPage implements OnInit {
  company: Observable<any>;
  notes: Observable <any>;
  companyForm: FormGroup;
  companyId: null;
  companyTab: string;
  constructor(private modalController: ModalController
    ,private alertCtrl: AlertController, 
    public router: Router, 
    public navCtrl: NavController, 
    private formBuilder: FormBuilder, 
    public alertController: AlertController,
    public api: RestApiService, private navParams:NavParams,private events:Events) {
      
      this.companyTab='info';
      
      this.companyForm = this.formBuilder.group({
        'id':[null],
        'name' : [null],
        'code':[null],
        'website': [null],
        'taxNumber':[null],
        
        'address': this.formBuilder.group({
          'country': this.formBuilder.group({
            'name': [null],
          }),
          'region': this.formBuilder.group({
            'name': [null],
          }),
          'city': this.formBuilder.group({
            'name': [null],
          }),
          'zip': this.formBuilder.group({
            'number': [null],
          }),
          'street': [null],
          
        }),
        'telephone': [null],
        'email': [null],
        // 'categories':  this.formBuilder.array([
        //   this.formBuilder.group({
        //     'name':['']
        //   })
        // ]),
        
        
        
      });
    }
    
    ngOnInit() {
      
      this.getCompanyInfo();
      this.getCompanyNotes()
    }
    
    // @Input() set showWhen(value) {
    //     this.ref.nativeElement.hidden = !value;
    //   }
    //   get showWhen() {
    //     return !this.ref.nativeElement.hidden;
    //   }
    
    
    
    //Get the company info with id passed from the view
    async getCompanyInfo(){
      this.companyId=this.navParams.get('companyId');
      await this.api.getCompanyById(this.companyId).subscribe(result=>{
        this.company=result;
      })
    }
    
    
    async getCompanyNotes(){
      this.companyId=this.navParams.get('companyId');
      this.notes= this.api.getNotes(this.companyId)
      
    }
    
    
    async deleteNote(itemId:number){
      this.api.deleteNote(itemId)
      .subscribe(res => {
        this.deleteAlert();
        this.doRefresh(this.events);
        // this.router.navigate(['/home']);
      }, err => {
        console.log(err);
      });
    }


    async updateCompany(){
      await this.api.updateCompany( this.companyForm.value)
      .subscribe(res => {
        
        this.updateAlert();
        this.closeModal();
        // window.location.reload();
        //this.router.navigate(['/home']);
      }, (err) => {
        console.log(err);
      });
    }
    
    
    async updateAlert() {
      const alert = await this.alertController.create({
        header: 'Alert',
        message: 'Changes succesfully saved',
        buttons: ['OK']
      });
      alert.present();
    }
    async deleteAlert() {
      const alert = await this.alertController.create({
        header: 'Alert',
        message: 'Note successfully deleted',
        buttons: ['OK'],
      });
      alert.present();
    }
    async closeModal() {
      const onClosedData: string = "Wrapped Up!";
      await this.modalController.dismiss(onClosedData);
    }

    doRefresh(event) {
      this.getCompanyNotes();
      console.log('Begin async operation');
      
      setTimeout(() => {
        console.log('Async operation has ended');
        event.target.complete();
      }, 2000);
    }
  }
  