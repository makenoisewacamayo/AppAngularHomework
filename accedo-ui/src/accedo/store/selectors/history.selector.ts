import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../app/store';
import * as fromFeature from '../reducers';
import * as fromHistory from '../reducers/history.reducer';

import { Movie } from '../../models';

export const getHistoryState = createSelector(fromFeature.getProductsState, (state : fromFeature.ProductsState) => state.movies);

export const getHistoryEntities = createSelector(getHistoryState, fromHistory.getHistoryEntities);

export const getAllHistory = createSelector(getHistoryEntities, (entities) => {
  return Object
    .keys(entities)
    .map(id => entities[id]);
});


export const getHistoryLoaded = createSelector(getHistoryState, fromHistory.getHistoryLoaded);

export const getHistoryLoading = createSelector(getHistoryState, fromHistory.getHistoryLoading);
