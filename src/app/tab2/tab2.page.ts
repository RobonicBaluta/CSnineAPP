import { Component } from '@angular/core';
import {Observable} from 'rxjs'; 
import { AlertController} from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { AddTaskModalPage } from '../modals/add-task-modal/add-task-modal.page';
import { RestApiService } from '../rest-api.service';



@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  
  items:any;
  results: Observable<any>;
  
  ngOnInit() {
    // this.getItems();
    // this.getTasks();
  }
  
  async getItems() {
    this.results=this.api.getItems();
  
  }

  async getTasks() {
    this.results=this.api.getTasks();
  }
  
  
  constructor(public modalController: ModalController,
    public api: RestApiService,private alertController: AlertController ,
    public router: Router,) {}
    
    async  addTaskModal() {
      const modal = await this.modalController.create({
        component: AddTaskModalPage,
        cssClass: 'addCompanyCustom',
      });
      modal.onDidDismiss().then((dataReturned) => {
        if (dataReturned !== null) {
          console.log('Modal Sent Data :', dataReturned);
        }
      });
      
      return await modal.present();
    }
  }
  