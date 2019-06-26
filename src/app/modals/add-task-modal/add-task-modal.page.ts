import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, NavParams, LoadingController, AlertController, IonSegment } from '@ionic/angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { RestApiService } from 'src/app/rest-api.service';
import { EditTaskModalPage } from '../edit-task-modal/edit-task-modal.page';


@Component({
  selector: 'app-add-task-modal',
  templateUrl: './add-task-modal.page.html',
  styleUrls: ['./add-task-modal.page.scss'],
})
export class AddTaskModalPage implements OnInit {
  taskTabs: string;
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
  currentDate=new Date();
  toDate:Date;
  fromDate:Date;
  showFrom:boolean=false;
  showTo: boolean=false;
  me:boolean=true;
  profile: Observable<any>;
  info: any;
  taskId: number;
  

  @ViewChild (IonSegment) segment:IonSegment;
  
  constructor(
    private modalController: ModalController, 
    private formBuilder: FormBuilder,
    private navParams:NavParams,
    public api: RestApiService,
    public loadingController: LoadingController,
    private alertCtrl: AlertController) { 
      
      this.taskTabs = 'general';
      
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
      const loading = await this.loadingController.create({
        message: 'Loading'
      });
      await loading.present();
      this.clients=this.api.getCompanies();
      loading.dismiss();
    }
    async getProfile(){
      const loading = await this.loadingController.create({
        message: 'Loading'
      });
      await loading.present();
      return this.api.getProfile().subscribe(profile=>{this.info=profile
        if(this.me){
          console.log('me');
          this.setMe();
        }else{
          this.removeMe();
          console.log('not me');
        }
        loading.dismiss();
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
      const loading = await this.loadingController.create({
        message: 'Loading'
      });
      await loading.present();
      this.simpleUsers=this.api.getSimpleUsers();
      loading.dismiss();
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
        this.closeModal();
        this.setTaskId(res.id);
        this.presentAlert();
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

    async presentAlert() {

      const alert = await this.alertCtrl.create({
        header: 'Alert',
        message: 'Task successfully created',
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
    
    compareWithFn = (o1, o2) => {
      return o1 && o2 ? o1.id === o2.id : o1 === o2;
    };
    
    compareWith = this.compareWithFn;
    
  }
  