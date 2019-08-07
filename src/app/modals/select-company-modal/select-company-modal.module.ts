import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SelectCompanyModalPage } from './select-company-modal.page';
import { SortModuleModule } from 'src/app/sort-module/sort-module.module';
import { SearchModuleModule } from 'src/app/search-module/search-module.module';

const routes: Routes = [
  {
    path: '',
    component: SelectCompanyModalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SortModuleModule,
    SearchModuleModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SelectCompanyModalPage]
})
export class SelectCompanyModalPageModule {}
