import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment, ModalController } from '@ionic/angular';
import { AlertController, NavParams} from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { RestApiService } from '../../rest-api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-company-modal',
  templateUrl: './add-company-modal.page.html',
  styleUrls: ['./add-company-modal.page.scss'],
})
export class AddCompanyModalPage implements OnInit {
  
  @ViewChild (IonSegment) segment:IonSegment;
  companyTab: string;
  company:FormGroup;
  categoriesList: Observable<any>;
  
  constructor(
    private modalController: ModalController,
    private alertCtrl: AlertController, 
    public navCtrl: NavController, 
    private formBuilder: FormBuilder, 
    public api: RestApiService,  ) { 
      
      this.companyTab='info';
      
      this.company = this.formBuilder.group({
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
      this.getCategories();
    }
    
    compareWithFn = (o1, o2) => {
      return o1 && o2 ? o1.id === o2.id : o1 === o2;
    };
    
    compareWith = this.compareWithFn;
    
    async getCategories(){
      this.categoriesList=this.api.getCategories();
    }
    
    async addCompany(){
      if (this.company.valid){
        await this.api.addCompany(this.company.value)
        .subscribe(res => {
          this.closeModal();
          this.createCompanyAlert();
        }, (err) => {
          console.log(err);
        });
      }else{
        this.errorAlert();
      }
    }
    
    
    async closeModal() {
      const onClosedData: string = "Wrapped Up!";
      await this.modalController.dismiss(onClosedData);
    }
    
    async createCompanyAlert() {
      
      const alert = await this.alertCtrl.create({
        header: 'Add',
        message: 'Company successfully created',
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
  
  
  
  
  