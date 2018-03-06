import { ActionReducerMap, createFeatureSelector } from '@ngrx/store'
import * as fromMovies from './movies.reducer';


export interface ProductsState {
  movies: fromMovies.MovieState

}

export const reducers: ActionReducerMap<ProductsState> = {
  movies: fromMovies.reducer
}

export const getProductsState = createFeatureSelector<ProductsState>(
  'products'
);
