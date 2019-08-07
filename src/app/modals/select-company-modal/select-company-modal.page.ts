import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs'; 
import { ModalController, LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from 'src/app/rest-api.service';
import { AddTaskModalPage } from '../add-task-modal/add-task-modal.page';

@Component({
  selector: 'app-select-company-modal',
  templateUrl: './select-company-modal.page.html',
  styleUrls: ['./select-company-modal.page.scss'],
})
export class SelectCompanyModalPage implements OnInit {
  items:any;
  companies: Observable<any>;
  companyId: number;
  order: number;
  descending: boolean = true;

  
  constructor(public api: RestApiService,
    public modalController: ModalController,
    // private addTaskModalPage: AddTaskModalPage,
    public router: Router,
    private alertController: AlertController,
    public loadingController: LoadingController) { }
    
    ngOnInit() {
      this.getCompanies();
      
    }
    
    async getCompanies(){
      const loading = await this.loadingController.create({
        message: 'Laden'
      });
      await loading.present();
      this.companies= await this.api.getCompanies();
      this.sort();
      loading.dismiss();
    }
    
    
   
    setCompanyData(company){
      // this.addTaskModalPage.clientId=id;
      // this.addTaskModalPage.selectedCompany=name;
      this.modalController.dismiss(company);
    }
    
    sort(){
      // this.descending = !this.descending;
      this.order = this.descending ? 1 : -1;
    }
    
    async closeModal() {
      const onClosedData: string = "Wrapped Up!";
      await this.modalController.dismiss(onClosedData);
    }
    doRefresh(event) {
      this.getCompanies();
      console.log('Begin async operation');
      
      setTimeout(() => {
        console.log('Async operation has ended');
        event.target.complete();
      }, 2000);
    }
    
  }
  