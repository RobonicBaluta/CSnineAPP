import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { RestApiService } from '../../rest-api.service'
import { ModalController, AlertController, NavController, NavParams, Events, LoadingController, ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { File, FileEntry } from '@ionic-native/file/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';


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
  documentForm: FormGroup;
  
  
  taskEntity:any;
  taskType:any;
  taskDocument:any;
  
  
  lastFile: string = null;
  
  info: any;
  me: boolean;
  formFile: any;
  constructor(
    private modalController: ModalController,
    private alertCtrl: AlertController, 
    public router: Router, 
    public navCtrl: NavController, 
    private formBuilder: FormBuilder, 
    public alertController: AlertController,
    public api: RestApiService,
    private navParams:NavParams,
    private events:Events,
    private file: File,
    private transfer: FileTransfer,
    private filePath:FilePath,
    private actionSheetController: ActionSheetController,
    public loadingController: LoadingController) { 
      
      
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
      
      this.documentForm=this.formBuilder.group({
        'entityId':[null],
        // 'documentName':[null],
        // 'parentId':[null],
        'entityType':[null],
        'documentName':[null],
        'parentId':[null],
        'files':[null],
      });
    }
    
    ngOnInit() {
      this.getTaskInfo();
      // this.getCompanyId();
      this.taskForm.get('descriptionHtml').setValue(this.taskForm.get('description'));
      this.entityId=this.companyId;
      this.entityType='Company';
      
      
      this.documentForm.get('entityType').setValue(null);
      this.documentForm.get('entityId').setValue(0);
      this.documentForm.get('documentName').setValue('file.txt');
      this.documentForm.get('parentId').setValue(0);
      
      this.formFile= this.documentForm.get('files');
      
      // this.taskEntity =this.documentForm.get('EntityId');
      // this.taskType=this.documentForm.get('EntityType').setValue('task');
      // this.taskDocument =this.documentForm.get('Files');
      
      this.getCompanies();
      this.getSimpleUsers();
      this.getProfile();
    }
    
    
    public pathForFile(file) {
      if (file === null) {
        return '';
      } else {
        return cordova.file.dataDirectory + file;
      }
    }
    
    
    
    // public uploadImage() {
    //   // Destination URL
    //   var url = "http://yoururl/upload.php";
      
    //   // File for Upload
    //   var targetPath = this.pathForFile(this.lastFile);
      
    //   // File name only
    //   var filename = this.lastFile;
      
    //   var options = {
    //     fileKey: "file",
    //     fileName: filename,
    //     chunkedMode: false,
    //     mimeType: "multipart/form-data",
    //     params : {'fileName': filename}
    //   };
      
    //   const fileTransfer= this.transfer.create();
      
      
      
    //   // Use the FileTransfer to upload the image
    //   fileTransfer.upload(targetPath, url, options).then(data => {
    //     console.log('success')
    //   }, err => {
    //     console.log('not success')
    //   });
    // }
    
    //     changeListener($event) : void {
    //       this.file = $event.target.files[0];
    //       console.log(this.file);
    //     }
    //     startUpload() {
    //       console.log(this.formFile.value);
    //       this.file.resolveLocalFilesystemUrl(this.formFile.value)
    //       .then(entry => {
    //         ( < FileEntry > entry).file(file => this.readFile(file))
    //       })
    //       .catch(err => {
    //         console.log('ERRORRRRR');
    //       });
    //     }
    
    
    // readUrl(event:any) {
    //   if (event.target.files && event.target.files[0]) {
    //     var reader = new FileReader();
    
    //     // reader.onload = (event: ProgressEvent) => {
    //     //   this.url = (<FileReader>event.target).result;
    //     // }
    
    //     reader.readAsDataURL(event.target.files[0]);
    //    console.log( reader.readAsDataURL(event.target.files[0]));
    //   }
    // }
    
    
    
    
    //     readFile(file: any) {
    //       const reader = new FileReader();
    //       reader.onloadend = () => {
    //         const formData = new FormData();
    //         const fileBlob = new Blob([reader.result], {
    //           type: file.type
    //         });
    //         formData.append('file', fileBlob, file.name);
    //         this.api.initDocument(this.documentForm.value)
    //         .subscribe(res => {
    //           // console.log(this.documentForm.value);
    //           this.closeModal();
    //         }, (err) => {
    //           console.log(err);
    //         });
    //       };
    //       reader.readAsArrayBuffer(file);
    //     }
    
    
    // async init(){
    //   await this.api.initDocument(this.taskType,this.taskEntity,this.taskDocument)
    //   .subscribe(res => {
    //     // console.log(this.documentForm.value);
    //     this.closeModal();
    //   }, (err) => {
    //     console.log(err);
    //   });
    // }
    
    async init(){
      console.log(this.documentForm.value);
      await this.api.initDocument(this.documentForm.value)
      .subscribe(res => {
        // console.log(this.documentForm.value);
        this.closeModal();
      }, (err) => {
        console.log(err);
      });
    }
    
    
    
    
    async getProfile(){
      const loading = await this.loadingController.create({
        message: 'Loading'
      });
      await loading.present();
      return this.api.getProfile().subscribe(profile=>{this.info=profile
        
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
    
    
    async meOrNot(){
      await this.getProfile();
      if(this.me){
        console.log('me');
        this.setMe();
      }else{
        this.removeMe();
        console.log('not me');
      }
    }
    
    async getTaskInfo() {
      
      this.taskId = this.navParams.get('taskId');
      const loading = await this.loadingController.create({
        message: 'Loading'
      });
      await loading.present();
      
      this.task = await this.api.getTaskById(this.taskId).toPromise();
      
      
      await this.getProfile();
      
      if(this.task && this.task.assignedUserId && this.task.clientId) {
        
        // Update the value of the control
        this.taskForm.get('assignedUserId').setValue(this.task.assignedUserId);  
        this.taskForm.get('clientId').setValue(this.task.clientId); 
        
        console.log(this.info.userId);
        console.log(this.task.assignedUserId);
        
        if (this.task.assignedUserId==this.info.userId) {
          this.me=true;
          
        }else{
          this.me=false;
        }
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
          // console.log(this.task.deadline);
          // console.log(this.task.fromDate);
          this.toDate=this.task.deadline; 
          this.fromDate=this.task.fromDate; 
          this.taskForm.get('fromDate').setValue(this.fromDate);
        }
        this.taskForm.get('deadline').setValue(this.task.deadline);
        
      }
      loading.dismiss();
      
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
  