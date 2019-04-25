import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FormBuilder, FormGroup } from '@angular/forms';

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
  constructor(
    private modalController: ModalController, 
    private formBuilder: FormBuilder,
    private navParams:NavParams) { 
      
      
      this.taskTab = 'description';
      
      this.taskForm = this.formBuilder.group({
        'title':[null],
        'description' : [null],
        'descriptionHtml':[null],
        'assignedUserId': [null],
        'deadline':[null],
        'clientId':[null],
        
        'entityRelatedTo': this.formBuilder.group({
          'entityId': [null],
          'entityType': [null],
          
        }),   
      });
      
      
    }
    
    ngOnInit() {
      this.taskForm.get('descriptionHtml').setValue(this.taskForm.get('description'));
      this.entityId=this.companyId;
      this.entityType='Company';
    }
    async closeModal() {
      const onClosedData: string = "Wrapped Up!";
      await this.modalController.dismiss(onClosedData);
    }
    async getCompanyId(){
      this.companyId=this.navParams.get('companyId');
      console.log(this.companyId);
    }
    
  }
  