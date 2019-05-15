import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RestApiService } from '../../rest-api.service'
import { ModalController, AlertController, NavController, NavParams, Events } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-task-modal',
  templateUrl: './edit-task-modal.page.html',
  styleUrls: ['./edit-task-modal.page.scss'],
})
export class EditTaskModalPage implements OnInit {
  task: Observable<any>;
  notes: Observable <any>;
  taskForm: FormGroup;
  taskId: null;

  entityType: any;
  entityId: any;
  companyId: any;
  clients: Observable<any>;
  simpleUsers: Observable <any>;
  assignedUserId: number;
  clientId: number;
  description:any;
  select:any;
  selectedUser:any;
  currentDate=new Date();
  toDate:Date;
  fromDate:Date;
  showFrom:boolean=false;
  showTo: boolean=false;
  profile: Observable<any>;
  info: any;
  constructor(
    private modalController: ModalController
    ,private alertCtrl: AlertController, 
    public router: Router, 
    public navCtrl: NavController, 
    private formBuilder: FormBuilder, 
    public alertController: AlertController,
    public api: RestApiService,
    private navParams:NavParams,
    private events:Events) { 


      this.taskForm = this.formBuilder.group({
        'title':[null],
        'description' : [null],
        'descriptionHtml':[null],
        'assignedUserId': [null],
        'deadline':[null],
        'deadlineType':[null],
        'fromDate':[null],
        'clientId':[null],
        
   
      });
    }

  ngOnInit() {
    this.getTaskInfo();
    // this.getCompanyId();
    this.taskForm.get('descriptionHtml').setValue(this.taskForm.get('description'));
    this.entityId=this.companyId;
    this.entityType='Company';
    this.getCompanies();
    this.getSimpleUsers();
  }




  async getTaskInfo(){
    this.taskId=this.navParams.get('taskId');
    console.log(this.taskId);
    await this.api.getTaskById(this.taskId).subscribe(result=>{
      this.task=result;
    })
  }


  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }

  async getCompanies(){
    this.clients=this.api.getCompanies();
  }

  async getSimpleUsers(){
    this.simpleUsers=this.api.getSimpleUsers();
  }
  async setUser(userId){
    this.assignedUserId=userId;
  }
  async setClient(clientId){
    this.clientId=clientId;
  }


  checkDate(){
    
    let date=this.select;
    console.log(date);
    console.log(this.currentDate);
    console.log(this.toDate);
    switch (date) {
      case 'immediately':
   
      this.showTo=false;
      this.taskForm.get('deadlineType').setValue(0);
      this.taskForm.get('deadline').setValue(this.currentDate);
      break;
      
      case 'forYouInfomation':
    
      this.showTo=false;
      this.taskForm.get('deadlineType').setValue(6);
      this.taskForm.get('deadline').setValue(this.currentDate);
      break;

      case 'enableTo':
      this.showFrom=false;
      this.showTo=true;
    
      
      
      break;
      case 'enableFrom':
      this.showFrom=true;
      this.showTo=true;
      
      
      
      break;


      default:
      
      break;
    }
  }


  setTo(){
    this.taskForm.get('deadlineType').setValue(3);
    this.taskForm.get('deadline').setValue(this.toDate);
  }
  setFrom(){
    this.taskForm.get('deadlineType').setValue(4);
    this.taskForm.get('fromDate').setValue(this.fromDate);
  }
}
