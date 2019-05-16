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
        'id':[null],
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
    
    
    
    
    async getTaskInfo() {
      
      this.taskId = this.navParams.get('taskId');
      
      // If you want to use await, getTaskById() should return a promise
      this.task = await this.api.getTaskById(this.taskId).toPromise();
      
      // I'm assuming the task has an userId property
      if(this.task && this.task.assignedUserId && this.task.clientId) {
        
        // Update the value of the control
        this.taskForm.get('assignedUserId').setValue(this.task.assignedUserId);  
        this.taskForm.get('clientId').setValue(this.task.clientId); 
        // this.taskForm.get('deadlineType').setValue(this.task.deadlineType);
        
        if (this.taskForm.get('deadline')) {
          this.taskForm.get('deadline').setValue(this.task.deadline);
        }
        if (this.taskForm.get('deadlineType')) {
          this.taskForm.get('deadlineType').setValue(this.task.deadlineType);
        }

        if (this.taskForm.get('deadlineType').value==0) {
          this.select='immediately';
          this.showTo=false;
        }else if (this.taskForm.get('deadlineType').value==6) {
          this.select='forYouInfomation';
          this.showTo=false;
        }else if (this.taskForm.get('deadlineType').value==3) {
          this.select='enableOn';
          this.showTo=true;
          this.toDate=this.task.deadline;
          
        }else if (this.taskForm.get('deadlineType').value==4) {
          this.select='enableFrom';
          this.showFrom=true; 
          console.log(this.task.deadline);
          console.log(this.task.fromDate);
          this.toDate=this.task.deadline; 
          this.fromDate=this.task.fromDate; 
          this.taskForm.get('fromDate').setValue(this.fromDate);
        }
        this.taskForm.get('deadline').setValue(this.task.deadline);
 
      }
      
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
      // console.log(date);
      // console.log(this.currentDate);
      // console.log(this.toDate);
      switch (date) {
        case 'immediately':
        
        this.showTo=false;
        this.showFrom=false;
        this.taskForm.get('deadlineType').setValue(0);
        this.taskForm.get('deadline').setValue(this.currentDate);
        break;
        
        case 'forYouInfomation':
        
        this.showTo=false;
        this.showFrom=false;
        this.taskForm.get('deadlineType').setValue(6);
        this.taskForm.get('deadline').setValue(this.currentDate);
        break;
        
        case 'enableOn':
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
    
    async updateTask(){
      if (this.taskForm.valid){
        await this.api.updateTask( this.taskForm.value)
        .subscribe(res => {
          
          this.updateAlert();
          this.closeModal();
          
        }, (err) => {
          console.log(err);
        });
      }else{
        // this.errorAlert();
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
  }
  