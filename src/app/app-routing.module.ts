import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  // { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },

  { path: 'task-modal', loadChildren: './task-modal/task-modal.module#TaskModalPageModule' },
  // { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'remember', loadChildren: './remember/remember.module#RememberPageModule' },
  { path: 'settings', loadChildren: './settings/settings.module#SettingsPageModule' },
  { path: 'task-view-modal', loadChildren: './task-view-modal/task-view-modal.module#TaskViewModalPageModule' },
  { path: 'note-modal', loadChildren: './modals/note-modal/note-modal.module#NoteModalPageModule' },
  { path: 'add-company-modal', loadChildren: './modals/add-company-modal/add-company-modal.module#AddCompanyModalPageModule' },


  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  {
    path: 'tabs',
    loadChildren: './tabs/tabs.module#TabsPageModule',
    canActivate: [AuthGuardService] 
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
