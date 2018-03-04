import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError } from 'rxjs/operators'

import * as fromRoot from '../../../app/store';
import * as movieActions from '../actions/movies.action';
import * as fromServices from '../../services';



@Injectable()
export class MoviesEffects {
  constructor(
    private actions$: Actions,
    private accedoService: fromServices.AccedoService
  ) {}

  @Effect()
  loadMovies$ = this.actions$.ofType(movieActions.LOAD_MOVIES)
    .pipe(
      switchMap( () => {
        return this.accedoService
        .getMovies()
        .pipe(
          map(movies => new movieActions.LoadMoviesSuccess(movies)),
          catchError(error => of(new movieActions.LoadMoviesFail(error)))
        );
      })
    );


}


