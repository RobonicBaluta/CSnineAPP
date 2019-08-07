import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  
  
  
  
  
  {
    path: '',
    loadChildren: './select-server/select-server.module#SelectServerPageModule'
  },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'reset', loadChildren: './reset-password/reset-password.module#ResetPasswordPageModule' },
  
  { path: 'settings', loadChildren: './settings/settings.module#SettingsPageModule' },
  { path: 'note-modal', loadChildren: './modals/note-modal/note-modal.module#NoteModalPageModule' },
  { path: 'add-company-modal', loadChildren: './modals/add-company-modal/add-company-modal.module#AddCompanyModalPageModule' },
  // { path: '', redirectTo: 'tabs', pathMatch: 'full' },
  {
    path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule',
    canActivate: [AuthGuardService] 
  },
  { path: 'reset-password', loadChildren: './reset-password/reset-password.module#ResetPasswordPageModule' },
  { path: 'edit-company-modal', loadChildren: './modals/edit-company-modal/edit-company-modal.module#EditCompanyModalPageModule' },
  { path: 'edit-task-modal', loadChildren: './modals/edit-task-modal/edit-task-modal.module#EditTaskModalPageModule' },
  { path: 'show-contact-modal', loadChildren: './modals/show-contact-modal/show-contact-modal.module#ShowContactModalPageModule' },
  { path: 'show-mobile-contact-modal', loadChildren: './modals/show-mobile-contact-modal/show-mobile-contact-modal.module#ShowMobileContactModalPageModule' },
  { path: 'export-contact-modal', loadChildren: './modals/export-contact-modal/export-contact-modal.module#ExportContactModalPageModule' },
  { path: 'select-server', loadChildren: './select-server/select-server.module#SelectServerPageModule' },
  { path: 'select-company-modal', loadChildren: './modals/select-company-modal/select-company-modal.module#SelectCompanyModalPageModule' },
 
 
  
  
  
  
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
