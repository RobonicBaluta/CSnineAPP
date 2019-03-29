import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task-view-modal',
  templateUrl: './task-view-modal.page.html',
  styleUrls: ['./task-view-modal.page.scss'],
})
export class TaskViewModalPage implements OnInit {

  item=null;
  newItem: FormGroup;
  
  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private activatedRoute: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder
    ) {}
      
      ngOnInit() {
        
      }
      async closeModal2() {
        const onClosedData: string = "Wrapped Up!";
        await this.modalController.dismiss(onClosedData);
      }
    }
