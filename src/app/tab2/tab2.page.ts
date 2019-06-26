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
import { FormGroup, FormBuilder } from '@angular/forms';



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
  myTasksForm: FormGroup;
  givenTasksForm: FormGroup;
  taskStatusForm: FormGroup;
  order: number;
  descending: boolean = true;
  

  
 

 
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
    public loadingController: LoadingController,
    private formBuilder: FormBuilder) {


      this.myTasksForm = this.formBuilder.group({
        "taskListKind": 3,
        "take": 2147483647,
      
    });

    this.taskStatusForm = this.formBuilder.group({
      'id':[null],
      "status": 3,
      "title":[null],
      "deadline":[null],
  });

    this.givenTasksForm = this.formBuilder.group({
      "taskListKind": 2,
      "take": 2147483647,
    
  });
    }
    


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
      return this.api.getMyTasks(this.myTasksForm.value).subscribe(data=>{this.myTasks=data
        this.sort();
        loading.dismiss();
   
      });
    }
    sort(){
      console.log('hello');
      // this.descending = !this.descending;
      this.order = this.descending ? 1 : -1;
    }

    async getGivenTasks() {
      const loading = await this.loadingController.create({
        message: 'Loading'
      });
      await loading.present();
      return this.api.getGivenTasks(this.givenTasksForm.value).subscribe(data=>{this.givenTasks=data
        loading.dismiss();
      });
    }



    setTaskId(id:number){
      this.taskId=id;
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



    async setTaskAsDone(id:number, title:string, deadline){
      this.taskStatusForm.get('id').setValue(id);
      this.taskStatusForm.get('title').setValue(title);
      this.taskStatusForm.get('deadline').setValue(deadline);
      const alert = await this.alertController.create({
          header: 'Task done',
          cssClass: 'alert',
          message: '<strong>Do you want to mark this task as done?</strong>',
          buttons: [
              {
                  text: 'No',
                  role: 'cancel',
                  cssClass: 'secondary',
                  handler: () => {
                  }
              }, {
                  text: 'Yes',
                  handler: () => {
                    this.api.updateTask(this.taskStatusForm.value)
                    .subscribe(res => {
                      this.doRefresh(event);
                      this.presentAlert();
                    }, (err) => {
                      console.log(err);
                    });
                  }
              }
          ]
      });
      await alert.present();
      
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      cssClass: 'alert',
      message: 'Task successfully updated',
      buttons: ['OK']
    });
    alert.present();
  }

    doRefresh(event) {
      this.getMyTasks();
      this.getGivenTasks();
      setTimeout(() => {
        event.target.complete();
      }, 2000);
    }
  
  }
  