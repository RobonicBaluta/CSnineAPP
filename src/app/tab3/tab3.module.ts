import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';
import { SearchModuleModule } from '../search-module/search-module.module';
import { SortModuleModule } from '../sort-module/sort-module.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SortModuleModule,
    SearchModuleModule,
    RouterModule.forChild([{ path: '', component: Tab3Page }])
  ],
  declarations: [Tab3Page],
  
  
})
export class Tab3PageModule {}
