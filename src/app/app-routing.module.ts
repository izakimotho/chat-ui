import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  //Main redirect

  {path: '', redirectTo: 'auth', pathMatch: 'full'},

 
  {
    path: '', 
    children: [    
      {
        path: 'chat',
        loadChildren: () => import('./chat/chat.module').then(module => module.ChatModule)
      }, 
      {
         path: 'auth',
         loadChildren: () => import('./auth/auth.module').then(module => module.AuthModule)
      }, 
      {
         path: 'policy',
         loadChildren: () => import('./policy/policy.module').then(module => module.PolicyModule)
      },
    ]
  },  
  {path: '**',  redirectTo: 'auth'}

];





@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
