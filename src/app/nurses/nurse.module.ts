import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { NurseShellComponent } from './nurse-shell/nurse-shell.component';
import { NurseListComponent } from './nurse-list/nurse-list.component';
import { NurseEditComponent } from './nurse-edit/nurse-edit.component';

/* NgRx */
import { StoreModule } from '@ngrx/store';
import { NurseReducer } from './state/nurse.reducer';
import { EffectsModule } from '@ngrx/effects';
import { NurseEffects } from './state/nurse.effects';

const NurseRoutes: Routes = [
  { path: '', component: NurseShellComponent }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(NurseRoutes),
    StoreModule.forFeature('nurses', NurseReducer),
    EffectsModule.forFeature([NurseEffects])
  ],
  declarations: [
    NurseShellComponent,
    NurseListComponent,
    NurseEditComponent
  ]
})
export class NurseModule { }
