import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError, tap } from 'rxjs/operators'

import * as fromRoot from '../../../app/store';
import * as historyActions from '../actions/history.action';
import * as fromServices from '../../services';



@Injectable()
export class HistoryEffects {
  constructor(
    private actions$: Actions,
    private historyService: fromServices.HistoryService,
    private spinnerService: fromServices.SpinnerService,
  ) {}

  @Effect()
  loadHistory$ = this.actions$.ofType(historyActions.LOAD_HISTORY)
    .pipe(
      switchMap( () => {
        return this.historyService
        .getHistory()
        .pipe(
          map(movies => new historyActions.LoadHistorySuccess(movies)),
          catchError(error => of(new historyActions.LoadHistoryFail(error)))
        );
      })
    );

  @Effect()
  createHistory$ = this.actions$
    .ofType(historyActions.CREATE_HISTORY)
    .pipe(
      map((action: historyActions.CreateHistory) => action.payload),
      switchMap(movie => {
        return this.historyService
          .createHistory(movie)
          .pipe(
            map(movie => new historyActions.CreateHistorySuccess(movie)),
            catchError(error => of(new historyActions.CreateHistoryFail(error)))
          )
      })
    );




}


