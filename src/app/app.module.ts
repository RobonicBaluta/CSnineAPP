import { TaskModalPageModule } from './task-modal/task-modal.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskViewModalPageModule } from './task-view-modal/task-view-modal.module';
import { HttpClientModule } from '@angular/common/http';
import { NoteModalPageModule } from './modals/note-modal/note-modal.module';
import { AddCompanyModalPageModule } from './modals/add-company-modal/add-company-modal.module'

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,TaskModalPageModule, TaskViewModalPageModule, HttpClientModule,NoteModalPageModule,AddCompanyModalPageModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule {}
