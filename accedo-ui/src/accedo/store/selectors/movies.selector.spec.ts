import { StoreModule, Store, combineReducers } from '@ngrx/store';
import { ROUTER_NAVIGATION } from '@ngrx/router-store';

import { TestBed } from '@angular/core/testing';
import { Movie, CoverImage, Image } from '../../models';

import * as fromRoot from '../../../app/store';
import * as fromReducers from '../reducers/index';
import * as fromActions from '../actions/index';
import * as fromSelectors from '../selectors/movies.selector';

describe('Movies Selectors', () => {
  let store: Store<fromReducers.ProductsState>;

  const movie1 : Movie = {
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
  };

  const movie2 : Movie = {
    "title": "12 Years a Slave",
    "description": "In the antebellum United States, Solomon Northup, a free black man from upstate " +
        "New York, is abducted and sold into slavery.",
    "type": "movie",
    "publishedDate": 1389312000000,
    "availableDate": 1389312000000,
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
        "duration": 7200000,
        "geoLock": false,
        "id": "vid_101"
      }
    ],
    "credits": [
      {
        "role": "Director",
        "name": "Steve McQueen"
      }, {
        "role": "Chiwetel Ejiofor",
        "name": "Chiwetel Ejiofor"
      }, {
        "role": "Michael Kenneth Williams",
        "name": "Michael Kenneth Williams"
      }, {
        "role": "Michael Fassbender",
        "name": "Michael Fassbender"
      }
    ],
    "parentalRatings": [
      {
        "scheme": "MPAA",
        "rating": "R"
      }
    ],
    "images": [
      {
        "type": "cover",
        "url": "http://lorempixel.com/214/317/",
        "width": 214,
        "height": 317,
        "id": "0fed2015ee5eed694899959976bd49d3"
      }
    ],
    "categories": [
      {
        "title": "Biography",
        "description": "Biography movies",
        "id": "movies-biography"
      }, {
        "title": "Drama",
        "description": "Drama movies",
        "id": "movies-drama"
      }, {
        "title": "History",
        "description": "History movies",
        "id": "movies-history"
      }
    ],
    "id": "12-years-a-slave"
  };

  const movie3 : Movie = {
    "title": "2 Guns",
    "description": "A DEA agent and a naval intelligence officer find themselves on the run after a " +
        "botched attempt to infiltrate a drug cartel. While fleeing, they learn the secre" +
        "t of their shaky alliance: Neither knew that the other was an undercover agent.",
    "type": "movie",
    "publishedDate": 1376611200000,
    "availableDate": 1376611200000,
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
        "duration": 9000000,
        "geoLock": false,
        "id": "vid_102"
      }
    ],
    "credits": [
      {
        "role": "Director",
        "name": "Baltasar Kormákur"
      }, {
        "role": "Denzel Washington",
        "name": "Denzel Washington"
      }, {
        "role": "Mark Wahlberg",
        "name": "Mark Wahlberg"
      }, {
        "role": "Paula Patton",
        "name": "Paula Patton"
      }
    ],
    "parentalRatings": [
      {
        "scheme": "MPAA",
        "rating": "R"
      }
    ],
    "images": [
      {
        "type": "cover",
        "url": "http://lorempixel.com/214/317/?t=2",
        "width": 214,
        "height": 317,
        "id": "65651bfb058aa122e2a3734ae473484c"
      }
    ],
    "categories": [
      {
        "title": "Action",
        "description": "Action movies",
        "id": "movies-action"
      }, {
        "title": "Comedy",
        "description": "Comedy movies",
        "id": "movies-comedy"
      }, {
        "title": "Crime",
        "description": "Crime movies",
        "id": "movies-crime"
      }, {
        "title": "Drama",
        "description": "Drama movies",
        "id": "movies-drama"
      }, {
        "title": "Thriller",
        "description": "Thriller movies",
        "id": "movies-thriller"
      }
    ],
    "id": "2-guns"
  };

  const movies: Movie[] = [movie1, movie2, movie3];

  const entities = {
    "10-things-i-hate-about-you" : movies[0],
    "12-years-a-slave" : movies[1],
    "2-guns" : movies[2],
  };

  const coverImages: CoverImage[] = movies
    .map( (movie: Movie) => {
      const images: CoverImage[] = movie.images
        .map( (image: Image) => {
            return {
              src: image.url,
              height: `${image.height}`,
              width: `${image.width}`,
              alt: movie.description,
              title: movie.title,
              type: image.type,
              id: movie.id
            } as CoverImage;
        });
      return images[0];
    })


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          products: combineReducers(fromReducers.reducers),
        }),
      ],
    });

    store = TestBed.get(Store);
  });

  describe('getMovieState', () => {
    it('should return state of movie store slice', () => {
      let result;

      store
        .select(fromSelectors.getMovieState)
        .subscribe(value => (result = value));

      expect(result).toEqual({
        entities: {},
        loaded: false,
        loading: false,
      });

      store.dispatch(new fromActions.LoadMoviesSuccess(movies));

      expect(result).toEqual({
        entities,
        loaded: true,
        loading: false,
      });
    });
  });

  describe('getMoviesEntities', () => {
    it('should return movies as entities', () => {
      let result;

      store
        .select(fromSelectors.getMoviesEntities)
        .subscribe(value => (result = value));

      expect(result).toEqual({});

      store.dispatch(new fromActions.LoadMoviesSuccess(movies));

      expect(result).toEqual(entities);
    });
  });

  describe('getCoverImages', () => {
    it('should return an array of CoverImages', () => {
      let result;

      store.dispatch(new fromActions.LoadMoviesSuccess(movies));

      store
        .select(fromSelectors.getCoverImages)
        .subscribe(coverImgs => (result = coverImgs));

      expect(result).toEqual(coverImages);

    });
  });

  describe('getSelectedMovie', () => {
    it('should return selected movie as an entity', () => {
      let result;
      let params;

      store.dispatch(new fromActions.LoadMoviesSuccess(movies));

      store.dispatch({
        type: 'ROUTER_NAVIGATION',
        payload: {
          routerState: {
            url: '/accedo',
            queryParams: {},
            params: { movieId: "12-years-a-slave" },
          },
          event: {},
        },
      });

      store
        .select(fromRoot.getRouterState)
        .subscribe(routerState => (params = routerState.state.params));

      expect(params).toEqual({movieId: '12-years-a-slave'});

      store
        .select(fromSelectors.getSelectedMovie)
        .subscribe(selectedMovie => (result = selectedMovie));

      expect(result).toEqual(movie2);
    });
  });

  describe('getAllMovies', () => {
    it('should return movies as an array', () => {
      let result;

      store
        .select(fromSelectors.getAllMovies)
        .subscribe(value => (result = value));

      expect(result).toEqual([]);

      store.dispatch(new fromActions.LoadMoviesSuccess(movies));

      expect(result).toEqual(movies);
    });
  });

  describe('getMoviesLoaded', () => {
    it('should return the pizzas loaded state', () => {
      let result;
    store
        .select(fromSelectors.getMoviesLoaded)
        .subscribe(value => (result = value));

      expect(result).toEqual(false);
      store.dispatch(new fromActions.LoadMoviesSuccess([]));
      expect(result).toEqual(true);
    });
  });

  describe('getMovieLoading', () => {
    it('should return the pizzas loading state', () => {
      let result;

      store
        .select(fromSelectors.getMovieLoading)
        .subscribe(value => (result = value));

      expect(result).toEqual(false);

      store.dispatch(new fromActions.LoadMovies());

      expect(result).toEqual(true);
    });
  });
});
