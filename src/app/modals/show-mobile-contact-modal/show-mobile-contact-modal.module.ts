import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ShowMobileContactModalPage } from './show-mobile-contact-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ShowMobileContactModalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ShowMobileContactModalPage]
})
export class ShowMobileContactModalPageModule {}
