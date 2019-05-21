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
  myTasks: Observable<any>;
  givenTasks: Observable<any>;
  taskId: number;
  tasksTab:string;
  

  
 

 
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
    


    ngOnInit() {
      // this.getItems();
      this.getMyTasks();
      this.getGivenTasks();
      this.tasksTab = 'myTasks';
    }
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

    async getMyTasks() {
      const loading = await this.loadingController.create({
        message: 'Loading'
      });
      await loading.present();
      return this.api.getMyTasks().subscribe(data=>{this.myTasks=data
        loading.dismiss();
      });
    }


    async getGivenTasks() {
      const loading = await this.loadingController.create({
        message: 'Loading'
      });
      await loading.present();
      return this.api.getGivenTasks().subscribe(data=>{this.givenTasks=data
        loading.dismiss();
      });
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
      this.getMyTasks();
      this.getGivenTasks();
      console.log('Begin async operation');

      setTimeout(() => {
        console.log('Async operation has ended');
        event.target.complete();
      }, 2000);
    }
  
  }
  