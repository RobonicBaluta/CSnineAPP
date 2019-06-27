import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment, ModalController, Events, LoadingController } from '@ionic/angular';
import { AlertController, NavParams} from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from '../../rest-api.service';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
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
  select:any;
  regionName: any;
  categoriesList: Observable<any>;
  
  info:boolean=true;
  location:boolean=false;
  contact:boolean=false;
  noteList:boolean=false;
 
  
  
 constructor(private modalController: ModalController
    ,private alertCtrl: AlertController, 
    public router: Router, 
    public navCtrl: NavController, 
    private formBuilder: FormBuilder, 
    public alertController: AlertController,
    public api: RestApiService,
    private navParams:NavParams,
    private events:Events,
    public loadingController: LoadingController) {
      
      // this.companyTab='info';
    
      this.companyForm = this.formBuilder.group({
        'id':[null],
        'name' : [null,[Validators.required, Validators.min(1)]],
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
        'categories': [null],
        
        
      });


    }
    
    ngOnInit() {
      
      this.getCompanyInfo();
      this.getCompanyNotes();
      this.getCategories();
      this.showInfo();
    }
    
    showInfo(){
      this.info=true;
      this.location=false;
      this.contact=false;
      this.noteList=false;
    }
    showLocation(){
      this.info=false;
      this.location=true;
      this.contact=false;
      this.noteList=false;
    }
    
    showContact(){
      this.info=false;
      this.location=false;
      this.contact=true;
      this.noteList=false;
    }
    showNotes(){
      this.info=false;
      this.location=false;
      this.contact=false;
      this.noteList=true;
    }
    // @Input() set showWhen(value) {
    //     this.ref.nativeElement.hidden = !value;
    //   }
    //   get showWhen() {
    //     return !this.ref.nativeElement.hidden;
    //   }
    
    
    
    //Get the company info with id passed from the view
    // async getCompanyInfo(){
    //   this.companyId=this.navParams.get('companyId');
    //   await this.api.getCompanyById(this.companyId).subscribe(result=>{
    //     this.company=result;
    //   })
    // }
    
    async getCompanyInfo(){

      const loading = await this.loadingController.create({
        message: 'Laden'
      });
      await loading.present();

      this.companyId=this.navParams.get('companyId');
      this.company= await this.api.getCompanyById(this.companyId).toPromise();
      if(this.company && this.company.categories){
        console.log(this.company.categories);
  
        this.select=this.company.categories;

      
        console.log(this.select);
      }
      loading.dismiss();
    }
    
    async getCategories(){
      this.categoriesList=this.api.getCategories();
    }
    
    async getCompanyNotes(){
      this.companyId=this.navParams.get('companyId');
      this.notes= this.api.getNotes(this.companyId)
    }
    
    
    async deleteNote(itemId:number){
      this.api.deleteNote(itemId)
      .subscribe(res => {
        // this.deleteAlert();
        this.doRefresh(this.events);
      }, err => {
        console.log(err);
      });
    }
    
    
    async updateCompany(){
      if (this.companyForm.valid){
        await this.api.updateCompany( this.companyForm.value)
        .subscribe(res => {

          // this.updateAlert();
          this.closeModal();
        }, (err) => {
          console.log(err);
        });
      }else{
        this.errorAlert();
      }
    }
    
    
    async updateAlert() {
      const alert = await this.alertController.create({
        header: 'Alert',
        cssClass: 'alert',
        message: 'Changes succesfully saved',
        buttons: ['OK']
      });
      alert.present();
    }
    async deleteAlert() {
      const alert = await this.alertController.create({
        header: 'Alert',
        cssClass: 'alert',
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
    
    async errorAlert() {
      
      const alert = await this.alertCtrl.create({
        header: 'ERROR',
        message: 'The name field can not be empty',
        buttons: [
          {
            text: 'Ok',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            }
          }
        ]
      });
      
      await alert.present();
    }
  }
  