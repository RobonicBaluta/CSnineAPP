
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NoteModalPageModule } from './modals/note-modal/note-modal.module';
import { AddCompanyModalPageModule } from './modals/add-company-modal/add-company-modal.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Storage, IonicStorageModule } from '@ionic/storage';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { InterceptorService } from './services/interceptor.service';
import { AddTaskModalPageModule } from './modals/add-task-modal/add-task-modal.module';
import { EditCompanyModalPageModule } from './modals/edit-company-modal/edit-company-modal.module';
import { SearchPipe } from './search.pipe'
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import { HeaderColor } from '@ionic-native/header-color/ngx';
import { EditTaskModalPageModule } from './modals/edit-task-modal/edit-task-modal.module';
import { ShowContactModalPageModule } from './modals/show-contact-modal/show-contact-modal.module';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { ShowMobileContactModalPageModule } from './modals/show-mobile-contact-modal/show-mobile-contact-modal.module';
import { ExportContactModalPageModule } from './modals/export-contact-modal/export-contact-modal.module';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';




export function jwtOptionsFactory(storage) {
  return {
    tokenGetter: () => {
      return storage.get('accessToken');
    },
    whitelistedDomains: ['http://csapi.soltystudio.com/api/v1']
  }
}
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    NoteModalPageModule,
    AddCompanyModalPageModule,
    EditCompanyModalPageModule,
    FormsModule,
    ReactiveFormsModule,
    AddTaskModalPageModule,
    EditTaskModalPageModule,
    ShowContactModalPageModule,
    ShowMobileContactModalPageModule,
    ExportContactModalPageModule,
    IonicStorageModule.forRoot(),
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [Storage],
      }
    })],
    providers: [
      StatusBar,
      HeaderColor,
      SplashScreen,
      LocalNotifications,
      Contacts,
      HeaderColor,
      { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
      { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
      HTTP,
      FileTransfer,
      File,
      FilePath,
      FileChooser,
      FileOpener,

    ],
    

    bootstrap: [AppComponent]
  })
  export class AppModule {}