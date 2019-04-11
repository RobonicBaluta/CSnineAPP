import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditCompanyModalPage } from './edit-company-modal.page';

const routes: Routes = [
  {
    path: '',
    component: EditCompanyModalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EditCompanyModalPage]
})
export class EditCompanyModalPageModule {}
