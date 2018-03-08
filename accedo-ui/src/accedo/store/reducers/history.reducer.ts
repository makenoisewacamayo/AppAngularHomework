import * as fromHistory from '../actions/history.action';
import { Movie } from '../../models';

export interface HistoryState {
  entities : {
    [id : string]: Movie
  };
  error: any,
  loaded : boolean;
  loading : boolean;
};

export const initialState: HistoryState = {
  entities: {},
  error: null,
  loaded: false,
  loading: false
}

export function reducer(state = initialState, action : fromHistory.HistoryActions) : HistoryState {

  switch(action.type) {
    case fromHistory.LOAD_HISTORY:
      {
        return {
          ...state,
          loading: true
        };
      }
    case fromHistory.LOAD_HISTORY_SUCCESS:
      {
        const movies = action.payload;
        const entities = movies.reduce((entities : {
          [id : string]: Movie
        }, movie : Movie) => {
          return {
            ...entities,
            [movie.id]: movie
          };
        }, {
          ...state.entities
        });

        return {
          ...state,
          loading: false,
          loaded: true,
          error: null,
          entities
        };
      }
    case fromHistory.CREATE_HISTORY_FAIL:
    case fromHistory.LOAD_HISTORY_FAIL:
      {
        const error = action.payload;
        return {
          ...state,
          error: error,
          loading: false,
          loaded: false
        };
      }
    case fromHistory.CREATE_HISTORY_SUCCESS: {
      const movie = action.payload;
      const entities = {
        ...state.entities,
        [movie.id]: movie
      }
      return {
        ...state,
        error: null,
        entities,
      }
    }
  }

  return state;
}

export const getHistoryLoading = (state : HistoryState) => state.loading;
export const getHistoryLoaded = (state : HistoryState) => state.loaded;
export const getHistoryEntities = (state : HistoryState) => state.entities;
export const getHistoryError = (state: HistoryState) => state.error;
