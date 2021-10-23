import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './user/auth-guard.service';

import { ShellComponent } from './home/shell.component';
import { WellcomeComponent } from './home/wellcome.component';
import { PageNotFoundComponent } from './home/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      { path: 'welcome', component: WellcomeComponent },
      {
        path: 'nurses',
        // canActivate: [AuthGuard],
        loadChildren: () =>
          import('./nurses/nurse.module').then(m => m.NurseModule)
      },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
    ]
  },
  { path: '**', component: PageNotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
