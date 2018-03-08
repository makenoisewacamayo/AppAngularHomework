import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MaterialExportModule } from './material-export/material-export.module';

import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import "hammerjs";

import {
  StoreRouterConnectingModule,
  RouterStateSerializer
} from '@ngrx/router-store'
import { StoreModule, MetaReducer } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// not used in production
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {storeFreeze} from 'ngrx-store-freeze';

// this would be done dynamically with webpack for builds
const environment = {
  development: true,
  production: false
};

export const metaReducers : MetaReducer<any> [] = !environment.production
  ? [storeFreeze]
  : [];

import { reducers, CustomSerializer, effects } from './store';

import { AppComponent } from './container/app.component';

// routes
export const ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'accedo' },
  {
    path: 'accedo',
    loadChildren: '../accedo/accedo.module#AccedoModule',
  }
];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialExportModule,
    RouterModule.forRoot(ROUTES),
    StoreModule.forRoot(reducers, {metaReducers}),
    EffectsModule.forRoot(effects),
    StoreRouterConnectingModule,
    environment.development ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [{
    provide: RouterStateSerializer,
    useClass: CustomSerializer
  }],
  declarations: [
    AppComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
