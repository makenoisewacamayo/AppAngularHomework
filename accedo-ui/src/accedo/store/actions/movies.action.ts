import { Action } from '@ngrx/store';
import { Movie } from '../../models';

// Load movies for
export const LOAD_MOVIES = '[Accedo API] Load Movies';
export const LOAD_MOVIES_FAIL = '[Accedo API] Load Movies Fail';
export const LOAD_MOVIES_SUCCESS = '[Accedo API] Load Movies Success';

export class LoadMovies implements Action {
  readonly type = LOAD_MOVIES;
}

export class LoadMoviesFail implements Action {
  readonly type = LOAD_MOVIES_FAIL;
  constructor(public payload : any) {}
}

export class LoadMoviesSuccess implements Action {
  readonly type = LOAD_MOVIES_SUCCESS;
  constructor(public payload : Movie[]) {}
}

export type MovieActions =
 | LoadMovies
 | LoadMoviesFail
 | LoadMoviesSuccess;
