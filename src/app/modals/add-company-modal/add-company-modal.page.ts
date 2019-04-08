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
  categories: Observable<any>;
  
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
          'street': [''],
          
          'telephone': [''],
          'email': [''],
         
        }),
        // 'categories' : new FormArray([
        //   this.formBuilder.group({
        //     'id': null,
        //     'name': null
        //   })
        // ]),

      });
      
    }
    compareWithFn = (o1, o2) => {
      return o1 && o2 ? o1.id === o2.id : o1 === o2;
    };
    
    compareWith = this.compareWithFn;
    
    // categories() {
    //   return this.formBuilder.group({
    //     'id': null,
    //     'name': null
    //   })
    // }
    
    
    async addCompany(){
      await this.api.resetPassword(this.company.value)
      .subscribe(res => {
        // this.presentAlert();
        this.router.navigate(['/login']);
        
      }, (err) => {
        console.log(err);
      });
    }
    async getCategories(){
      this.categories=this.api.getCategories();
    }
    ngOnInit() {
      this.segment.value="'info'";
      this.getCategories();
    }
    async closeModal() {
      const onClosedData: string = "Wrapped Up!";
      await this.modalController.dismiss(onClosedData);
    }
  }
  
  