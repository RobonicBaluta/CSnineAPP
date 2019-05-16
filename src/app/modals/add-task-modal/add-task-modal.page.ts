import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { RestApiService } from 'src/app/rest-api.service';

@Component({
  selector: 'app-add-task-modal',
  templateUrl: './add-task-modal.page.html',
  styleUrls: ['./add-task-modal.page.scss'],
})
export class AddTaskModalPage implements OnInit {
  taskTab: string;
  taskForm: FormGroup;
  entityType: any;
  entityId: any;
  companyId: any;
  clients: Observable<any>;
  simpleUsers: Observable <any>;
  assignedUserId: number;
  clientId: number;
  description:any;
  select:any;
  selectedUser:string='40224';
  currentDate=new Date();
  toDate:Date;
  fromDate:Date;
  showFrom:boolean=false;
  showTo: boolean=false;
  me:boolean=true;
  profile: Observable<any>;
  info: any;
  
  constructor(
    private modalController: ModalController, 
    private formBuilder: FormBuilder,
    private navParams:NavParams,
    public api: RestApiService) { 
      
      
      this.taskTab = 'description';
      
      this.taskForm = this.formBuilder.group({
        'title':[null],
        'description' : [null],
        'descriptionHtml':[null],
        'assignedUserId': [null],
        'deadline':[null],
        'deadlineType':[null],
        'fromDate':[null],
        'clientId':[null],
        
        'entityRelatedTo': this.formBuilder.group({
          'entityId': [null],
          'entityType': [null],
          
        }),   
      });
      
      
    }
    
    ngOnInit() {
      this.getCompanyId();
      this.taskForm.get('descriptionHtml').setValue(this.taskForm.get('description'));
      this.entityId=this.companyId;
      this.entityType='Company';
      this.getCompanies();
      this.getSimpleUsers();
      this.getProfile();
      
      
      
    }
    
    
    async closeModal() {
      const onClosedData: string = "Wrapped Up!";
      await this.modalController.dismiss(onClosedData);
    }
    async getCompanyId(){
      this.companyId=this.navParams.get('companyId');
      console.log(this.companyId);
    }
    async getCompanies(){
      this.clients=this.api.getCompanies();
    }
    async getProfile(){
      return this.api.getProfile().subscribe(profile=>{this.info=profile
        
        if(this.me){
          
          console.log('me');
          this.setMe();
        }else{
          this.removeMe();
          console.log('not me');
        }
      });
    }
    setMe(){
      if(this.info && this.info.userId){
        this.taskForm.get('assignedUserId').setValue(this.info.userId);  
      }
    }
    removeMe(){
      this.taskForm.get('assignedUserId').setValue('');  
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
    
    async addTask(){
      await this.api.addTask(this.taskForm.value)
      .subscribe(res => {
        console.log(this.taskForm.value);
        this.closeModal();
      }, (err) => {
        console.log(err);
      });
      
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
    
    compareWithFn = (o1, o2) => {
      return o1 && o2 ? o1.id === o2.id : o1 === o2;
    };
    
    compareWith = this.compareWithFn;
    
  }
  