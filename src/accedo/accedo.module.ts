import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'

import { reducers, effects } from './store'

// components
import * as fromComponents from './components';

// services
import * as fromServices from './services';

// guards
import * as  fromGuards from './guards';

// routes
export const ROUTES: Routes = [
  {
    path: '',
    canActivate: [fromGuards.MoviesGuard],
    component: fromComponents.GalleryComponent,
  },
  {
    path: ':movieId',
    canActivate: [
      fromGuards.MovieExistsGuard
    ],
    component: fromComponents.PlayerComponent
  },
  {
    path: 'history',
    component: fromComponents.HistoryComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(ROUTES),
    StoreModule.forFeature('products', reducers),
    EffectsModule.forFeature(effects),
  ],
  providers: [...fromServices.services, ...fromGuards.guards],
  declarations: [ ...fromComponents.components],
  exports: [ ...fromComponents.components],
})
export class AccedoModule {}
