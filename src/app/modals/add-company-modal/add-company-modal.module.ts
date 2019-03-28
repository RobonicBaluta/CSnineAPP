import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddCompanyModalPage } from './add-company-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AddCompanyModalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddCompanyModalPage]
})
export class AddCompanyModalPageModule {}
