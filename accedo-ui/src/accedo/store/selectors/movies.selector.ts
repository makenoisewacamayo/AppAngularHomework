import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../app/store';
import * as fromFeature from '../reducers';
import * as fromMovies from '../reducers/movies.reducer';

import { Movie, Image, CoverImage, Content } from '../../models';

export const getMovieState = createSelector(fromFeature.getProductsState, (state : fromFeature.ProductsState) => state.movies);

export const getMoviesEntities = createSelector(getMovieState, fromMovies.getMoviesEntities);

export const getAllMovies = createSelector(getMoviesEntities, (entities) => {
  return Object
    .keys(entities)
    .map(id => entities[id]);
});



export const getCoverImages = createSelector(getAllMovies, (movies: Movie[]) => {
    return movies.map( (movie: Movie) => {
      const coverImages: CoverImage[] = movie.images
        .map( (image: Image) => {
          return {
            src: image.url,
            height: `${image.height}`,
            width : `${image.width}`,
            alt: movie.description,
            title: movie.title,
            type: image.type,
            id: movie.id
          } as CoverImage;
        })
      return coverImages[0];
    });
});

export const getSelectedMovie = createSelector(getMoviesEntities, fromRoot.getRouterState, (entities, router) : Movie => {
  return router.state && entities[router.state.params.movieId];
});

export const getSelectedContent = createSelector( getSelectedMovie, (movie: Movie) => {
  return movie.contents[0];
});


export const getMoviesLoaded = createSelector(getMovieState, fromMovies.getMoviesLoaded);

export const getMovieLoading = createSelector(getMovieState, fromMovies.getMoviesLoading);
