import { Component } from '@angular/core';
import {Observable} from 'rxjs'; 
import { AlertController, LoadingController} from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { AddTaskModalPage } from '../modals/add-task-modal/add-task-modal.page';
import { RestApiService } from '../rest-api.service';
import { map } from 'rxjs/operators';
import { EditTaskModalPage } from '../modals/edit-task-modal/edit-task-modal.page';



@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  
  items:[];
  tasks: Observable<any>;
  taskId: number;
  

  
 

 
  //  async getTasks() {
  //    this.api.getTasks().pipe(map(res => {
  //     this.tasks = res.json();
  //     return this.tasks;
  //   }));
  // }
  

  // async getTasks() {
  //   return this.tasks=this.api.getTasks()
  // }
  
  
  constructor(public modalController: ModalController,
    public api: RestApiService,private alertController: AlertController ,
    public router: Router,
    public loadingController: LoadingController,) {}
    
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

    async getTasks() {
      const loading = await this.loadingController.create({
        message: 'Loading'
      });
      await loading.present();
      return this.api.getTasks().subscribe(data=>{this.tasks=data
        loading.dismiss();
      });
    }
    ngOnInit() {
      // this.getItems();
      this.getTasks();
    }


    setTaskId(id:number){
      this.taskId=id;
      console.log(this.taskId);
      this.editModal();
    }
    async editModal() {
      const modal = await this.modalController.create({
        component: EditTaskModalPage,
        cssClass: 'addCompanyCustom',
        componentProps:{
          taskId: this.taskId,

        }
      });
      modal.onDidDismiss().then((dataReturned) => {
        if (dataReturned !== null) {
          console.log('Modal Sent Data :', dataReturned);
        }
      });
      return await modal.present();
    }






    doRefresh(event) {
      this.getTasks();
      console.log('Begin async operation');

      setTimeout(() => {
        console.log('Async operation has ended');
        event.target.complete();
      }, 2000);
    }
  
  }
  