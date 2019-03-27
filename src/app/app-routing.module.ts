import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'task-modal', loadChildren: './task-modal/task-modal.module#TaskModalPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'remember', loadChildren: './remember/remember.module#RememberPageModule' },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
