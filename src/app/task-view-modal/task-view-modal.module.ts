import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TaskViewModalPage } from './task-view-modal.page';

const routes: Routes = [
  {
    path: '',
    component: TaskViewModalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, 
    FormsModule, 
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TaskViewModalPage]
})
export class TaskViewModalPageModule {}
