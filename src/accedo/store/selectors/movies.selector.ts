import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../app/store';
import * as fromFeature from '../reducers';
import * as fromMovies from '../reducers/movies.reducer';

import { Movie } from '../../models';

export const getMovieState = createSelector(fromFeature.getProductsState, (state : fromFeature.ProductsState) => state.movies);

export const getMoviesEntities = createSelector(getMovieState, fromMovies.getMoviesEntities);

export const getAllMovies = createSelector(getMoviesEntities, (entities) => {
  return Object
    .keys(entities)
    .map(id => entities[id]);
});

export const getSelectedMovie = createSelector(getMoviesEntities, fromRoot.getRouterState, (entities, router) : Movie => {
  return router.state && entities[router.state.params.movieId];
});

export const getPizzaVisualised = createSelector(getSelectedPizza, fromToppings.getToppingsEntities, fromToppings.getSelectedToppings, (pizza, toppingEntities, selectedToppings) => {
  const toppings = selectedToppings.map(id => toppingEntities[id]);
  return {
    ...pizza,
    toppings
  };
});

export const getPizzaLoaded = createSelector(getPizzaState, fromPizzas.getPizzasLoaded);

export const getPizzaLoading = createSelector(getPizzaState, fromPizzas.getPizzasLoading);
