import { ActionReducerMap, createFeatureSelector } from '@ngrx/store'
import * as fromMovies from './movies.reducer';
import * as fromHistory from './history.reducer';

export interface ProductsState {
  movies: fromMovies.MovieState
  history: fromHistory.HistoryState
}

export const reducers: ActionReducerMap<ProductsState> = {
  movies: fromMovies.reducer,
  history: fromHistory.reducer
}

export const getProductsState = createFeatureSelector<ProductsState>(
  'products'
);
