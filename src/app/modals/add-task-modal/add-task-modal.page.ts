import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-task-modal',
  templateUrl: './add-task-modal.page.html',
  styleUrls: ['./add-task-modal.page.scss'],
})
export class AddTaskModalPage implements OnInit {
  task: string;

  constructor(private modalController: ModalController,) { 

    this.task = 'description';
  }

  ngOnInit() {
     
  }
  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }

}
