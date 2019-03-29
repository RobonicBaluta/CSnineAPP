import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.page.html',
  styleUrls: ['./task-modal.page.scss'],
})
export class TaskModalPage implements OnInit {
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
      async closeModal() {
        const onClosedData: string = "Wrapped Up!";
        await this.modalController.dismiss(onClosedData);
      }
    }
