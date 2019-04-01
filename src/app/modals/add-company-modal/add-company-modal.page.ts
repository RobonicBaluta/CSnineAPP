import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-company-modal',
  templateUrl: './add-company-modal.page.html',
  styleUrls: ['./add-company-modal.page.scss'],
})
export class AddCompanyModalPage implements OnInit {

  @ViewChild (IonSegment) segment:IonSegment;
  company: string;
  
  constructor(private modalController: ModalController,) { 
    this.company='info';
  
  }

  ngOnInit() {
    this.segment.value="'info'";
  }
  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }
  }

