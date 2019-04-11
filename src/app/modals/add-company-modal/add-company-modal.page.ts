import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment, ModalController } from '@ionic/angular';
import { AlertController, NavParams} from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from '../../rest-api.service';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';
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
  cat=[];
  
  constructor(private modalController: ModalController
    ,private alertCtrl: AlertController, 
    public router: Router, 
    public navCtrl: NavController, 
    private formBuilder: FormBuilder, 
    public api: RestApiService,  ) { 
      this.companyTab='info';
      
      
      this.company = this.formBuilder.group({
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
    
    addCategory(): void {
      (<FormArray>this.company.get('categories')).push(this.addCategoryFormGroup());
    }
    
    addCategoryFormGroup(): FormGroup {
      return this.formBuilder.group({
        'name': [''],
        
      });
    }
    // createCategory(): FormGroup {
    //   return this.formBuilder.group({
    //  'name':[null]
    //   });
    // }
    compareWithFn = (o1, o2) => {
      return o1 && o2 ? o1.id === o2.id : o1 === o2;
    };
    
    showselected(selected_value)
{
console.log(this.cat);
}
    
    
    compareWith = this.compareWithFn;
    
    // categories() {
    //   return this.formBuilder.group({
    //     'id': null,
    //     'name': null
    //   })
    // }
    
    
    async addCompany(){
      await this.api.addCompany(this.company.value)
      .subscribe(res => {
        this.closeModal();
        this.createCompanyAlert();
        // this.presentAlert();
        // this.router.navigate(['/login']);
        
      }, (err) => {
        console.log(err);
      });
    }
    async getCategories(){
      this.categoriesList=this.api.getCategories();
    }
    ngOnInit() {
      this.segment.value="'info'";
      this.getCategories();
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
  }
  
  
  
  
  