import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { RestApiService } from '../../rest-api.service'
import { ModalController, AlertController, NavController, NavParams, Events, LoadingController, ActionSheetController, IonSegment } from '@ionic/angular';
import { Router } from '@angular/router';
import { File, FileEntry } from '@ionic-native/file/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { cordova } from '@ionic-native/core';
import { Platform } from '@ionic/angular';
import { saveAs } from 'file-saver';


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
 
   fd = new FormData();
  
  info: any;
  me: boolean;
  formFile: any;
  testResponse: any;
  nativepath: any;
  doc: any;
  documents: Observable<any>;
  document: Observable<any>;
  file=new File();
  fileArray:any;
  generalTab:boolean=true;
  documentsTab:boolean=false;
  @ViewChild (IonSegment) segment:IonSegment;
  taskTabs: string;

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
    // private file: File,
    private transfer: FileTransfer,
    private filePath:FilePath,
    private fileOpener: FileOpener,
    private actionSheetController: ActionSheetController,
    public loadingController: LoadingController,
    private fileChooser: FileChooser,
    private platform: Platform,) { 
      
      this.taskTabs = 'general';
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
      // this.entityId=this.companyId;
      // this.entityType='Company';
      
      
      // this.documentForm.get('entityType').setValue(null);
      // this.documentForm.get('entityId').setValue(0);
      // this.documentForm.get('documentName').setValue('file.txt');
      // this.documentForm.get('parentId').setValue(0);
      
      // this.formFile= this.documentForm.get('files');
      

      
      this.getCompanies();
      this.getSimpleUsers();
      this.getProfile();
      this.getDocuments();
    }
    
   
    

    async getDocuments(){
      this.documents=this.api.getDocuments(this.taskId);
    }
    async getDocumentById(documentId:number,documentName:string){
      this.doc=this.api.getDocumentById(documentId).subscribe(result=>{
             this.doc=result;
        // saveAs(this.doc,'theDoc');
        // window.alert('saved');
            //  var blob = new Blob([this.doc]);
            
    //Determine a native file path to save to
      
    let filePath=this.file.externalRootDirectory;
    // let filePath = (this.appConfig.isNativeAndroid) ? this.file.externalRootDirectory : this.file.cacheDirectory;

    //Write the file

    // this.platform.ready();

    this.file.writeFile(filePath, documentName, this.doc, { replace: true }).then((fileEntry: FileEntry) => {
      // window.alert(fileEntry.toURL());
     window.alert("Datei gespeichert!");



    //  let fileExtn=documentName.split('.').reverse()[0];
    //  let fileMIMEType=this.getMIMEtype(fileExtn);

      // Open with File Opener plugin
      // this.fileOpener.open(fileEntry.toURL(), fileMIMEType)
      //   .then(() => console.log('File is opened'))
      //   .catch(err => window.alert('Error openening file: ' + err)
      //   );
    })
      .catch((err) => {
        console.error("Error creating file: " + err);
        window.alert("Error creating file: " + err);

        throw err;  //Rethrow - will be caught by caller
      });
      
    });
  }
  getMIMEtype(extn){
    let ext=extn.toLowerCase();
    let MIMETypes={
      'txt' :'text/plain',
      'docx':'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'doc' : 'application/msword',
      'pdf' : 'application/pdf',
      'jpg' : 'image/jpeg',
      'bmp' : 'image/bmp',
      'png' : 'image/png',
      'xls' : 'application/vnd.ms-excel',
      'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'rtf' : 'application/rtf',
      'ppt' : 'application/vnd.ms-powerpoint',
      'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    }
    return MIMETypes[ext];
  }
  doRefresh(event) {
    this.getDocuments();
    console.log('Begin async operation');
    
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  handleFileInput(files: FileList,taskId) {
  
    const entityType = 'Task';
    const entityId = taskId;
    const self = this;
    // window.alert(`prefor`);
    for (let i = 0; i < files.length; i++) {

      var blob = new Blob([files[i]] as any);
      self.api.uploadFiles(blob, entityType, entityId, files[i].name).subscribe(data => {
      //  window.alert(`Initialized`);
        console.log(data);
        self.api.commitFile(entityType,entityId, data.document).subscribe(data=>{
          this.doRefresh(this.events);
          console.log(data);
        })
      });
      
    }
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
    
    
    
      
      readfile(fileLoader) {
       
        (<any>window).resolveLocalFileSystemURL(this.nativepath, (res) => {
          res.file((resFile) => {
            var reader = new FileReader();
            // reader.readAsArrayBuffer(resFile);
            
            reader.onloadend = (evt: any) => {
              window.alert(this.nativepath);
              window.alert('end loader');
              fileLoader.dismiss();
              window.alert('before blob');
              // var src = evt.target.result;
              // src = src.split("base64,");
              // var contentType = src[0].split(':');
              // this.testResponse = contentType[1].replace(';','');
              // contentType = JSON.stringify(contentType[1].replace(';',''));
              var fileBlob  = evt.target.result as any ;
              window.alert('after blob');
              window.alert('befor blob apend');
              
              this.fd.append('files',fileBlob);
              //do what you want to do with the file
              window.alert('after blob append');
              window.alert(fileBlob.size);
            }
            //  reader.readAsDataURL(resFile);
            reader.readAsBinaryString(resFile);
            
          });
        });
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

      showGeneral(){
        this.generalTab=true;
        this.documentsTab=false;
      }
      showDocs(){
        this.documentsTab=true;
        this.generalTab=false;
      }
    }
    