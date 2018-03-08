import * as fromMovies from './movies.reducer';
import * as fromActions from '../actions/movies.action';
import { Movie } from '../../models';

describe('MovieReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const {initialState} = fromMovies;
      const action = {} as any;
      const state = fromMovies.reducer(undefined, action);
      expect(state).toBe(initialState);
    });
  });

  describe('LOAD_MOVIES action', () => {
    it('should set loading to true', () => {
      const { initialState } = fromMovies;
      const action = new fromActions.LoadMovies();
      const state = fromMovies.reducer(initialState, action);

      expect(state.loading).toEqual(true);
      expect(state.loaded).toEqual(false);
      expect(state.entities).toEqual({});
    });
  });

  describe('LOAD_MOVIES_SUCCESS action', () => {
    it('should populate with movies array', () => {
      const movies : Movie[] = [{
        "title": "10 Things I Hate About You",
        "description": "A new kid must find a guy to date the meanest girl in school, the older sister o" +
          "f the girl he has a crush on, who cannot date until her older sister does.",
        "type": "movie",
        "publishedDate": 931478400000,
        "availableDate": 931478400000,
        "metadata": [
          {
            "value": "en",
            "name": "language"
          }
        ],
        "contents": [
          {
            "url": "http://d2bqeap5aduv6p.cloudfront.net/project_coderush_640x360_521kbs_56min.mp4",
            "format": "mp4",
            "width": 640,
            "height": 360,
            "language": "en",
            "duration": 3600000,
            "geoLock": false,
            "id": "vid_103"
          }
        ],
        "credits": [
          {
            "role": "Director",
            "name": "Gil Junger"
          }, {
            "role": "Heath Ledger",
            "name": "Heath Ledger"
          }, {
            "role": "Julia Stiles",
            "name": "Julia Stiles"
          }, {
            "role": "Joseph Gordon-Levitt",
            "name": "Joseph Gordon-Levitt"
          }
        ],
        "parentalRatings": [
          {
            "scheme": "MPAA",
            "rating": "PG_13"
          }
        ],
        "images": [
          {
            "type": "cover",
            "url": "http://lorempixel.com/214/317/?t=1",
            "width": 214,
            "height": 317,
            "id": "f67e6e8a7478d1dae24e869f3d7081cf"
          }
        ],
        "categories": [
          {
            "title": "Comedy",
            "description": "Comedy movies",
            "id": "movies-comedy"
          }, {
            "title": "Drama",
            "description": "Drama movies",
            "id": "movies-drama"
          }, {
            "title": "Romance",
            "description": "Romantic movies",
            "id": "movies-romance"
          }
        ],
        "id": "10-things-i-hate-about-you"
      }];
      const entities = {
        "10-things-i-hate-about-you" : movies[0],
      };
      const {initialState} = fromMovies;
      const action = new fromActions.LoadMoviesSuccess(movies);
      const state = fromMovies.reducer(initialState, action);

      expect(state.loaded).toEqual(true);
      expect(state.loading).toEqual(false);
      expect(state.entities).toEqual(entities);
    });
  });

  describe('LOAD_MOVIES_FAIL action', () => {
    it('should return the initial state', () => {
      const {initialState} = fromMovies;
      const action = new fromActions.LoadMoviesFail({});
      const state = fromMovies.reducer(initialState, action);

      expect(state).toEqual(initialState);
    });

    it('should return the previous state', () => {
      const {initialState} = fromMovies;
      const previousState = {
        ...initialState,
        loading: true
      };
      const action = new fromActions.LoadMoviesFail({});
      const state = fromMovies.reducer(previousState, action);

      expect(state).toEqual(initialState);
    });
  });

});

describe('MovieReducer Selectors', () => {
  describe('getMoviesEntities', () => {
    it('should return .entities', () => {
      const entities : {
        [key : string] : Movie
      } = {
        "10-things-i-hate-about-you" : {
          "title": "10 Things I Hate About You",
          "description": "A new kid must find a guy to date the meanest girl in school, the older sister o" +
              "f the girl he has a crush on, who cannot date until her older sister does.",
          "type": "movie",
          "publishedDate": 931478400000,
          "availableDate": 931478400000,
          "metadata": [
            {
              "value": "en",
              "name": "language"
            }
          ],
          "contents": [
            {
              "url": "http://d2bqeap5aduv6p.cloudfront.net/project_coderush_640x360_521kbs_56min.mp4",
              "format": "mp4",
              "width": 640,
              "height": 360,
              "language": "en",
              "duration": 3600000,
              "geoLock": false,
              "id": "vid_103"
            }
          ],
          "credits": [
            {
              "role": "Director",
              "name": "Gil Junger"
            }, {
              "role": "Heath Ledger",
              "name": "Heath Ledger"
            }, {
              "role": "Julia Stiles",
              "name": "Julia Stiles"
            }, {
              "role": "Joseph Gordon-Levitt",
              "name": "Joseph Gordon-Levitt"
            }
          ],
          "parentalRatings": [
            {
              "scheme": "MPAA",
              "rating": "PG_13"
            }
          ],
          "images": [
            {
              "type": "cover",
              "url": "http://lorempixel.com/214/317/?t=1",
              "width": 214,
              "height": 317,
              "id": "f67e6e8a7478d1dae24e869f3d7081cf"
            }
          ],
          "categories": [
            {
              "title": "Comedy",
              "description": "Comedy movies",
              "id": "movies-comedy"
            }, {
              "title": "Drama",
              "description": "Drama movies",
              "id": "movies-drama"
            }, {
              "title": "Romance",
              "description": "Romantic movies",
              "id": "movies-romance"
            }
          ],
          "id": "10-things-i-hate-about-you"
        }
      };
      const {initialState} = fromMovies;
      const previousState = {
        ...initialState,
        entities
      };
      const slice = fromMovies.getMoviesEntities(previousState);

      expect(slice).toEqual(entities);
    });
  });

  describe('getMoviesLoading', () => {
    it('should return .loading', () => {
      const {initialState} = fromMovies;
      const previousState = {
        ...initialState,
        loading: true
      };
      const slice = fromMovies.getMoviesLoading(previousState);

      expect(slice).toEqual(true);
    });
  });

  describe('getMoviesLoaded', () => {
    it('should return .loaded', () => {
      const {initialState} = fromMovies;
      const previousState = {
        ...initialState,
        loaded: true
      };
      const slice = fromMovies.getMoviesLoaded(previousState);

      expect(slice).toEqual(true);
    });
  });
});
