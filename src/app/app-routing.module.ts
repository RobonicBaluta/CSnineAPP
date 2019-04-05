import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [


  // { path: '', redirectTo: 'login', pathMatch: 'full' },
  

  {
    path: '',
    loadChildren: './login/login.module#LoginPageModule'
  },
  
  // {
  //   path: 'tabs',
  //   loadChildren: './tabs/tabs.module#TabsPageModule',
    
  // },
  // { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },

  //{ path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'reset', loadChildren: './reset-password/reset-password.module#ResetPasswordPageModule' },
  
  { path: 'settings', loadChildren: './settings/settings.module#SettingsPageModule' },
  { path: 'note-modal', loadChildren: './modals/note-modal/note-modal.module#NoteModalPageModule' },
  { path: 'add-company-modal', loadChildren: './modals/add-company-modal/add-company-modal.module#AddCompanyModalPageModule' },
  // {
  //   path: '',
  //   loadChildren: './tabs/tabs.module#TabsPageModule',
  //   canActivate: [AuthGuardService]
  // },


  { path: '', redirectTo: 'tabs', pathMatch: 'full' },
    { path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule',
    canActivate: [AuthGuardService] },
  { path: 'reset-password', loadChildren: './reset-password/reset-password.module#ResetPasswordPageModule' }




];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
