import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { Actions } from '@ngrx/effects';

import { hot, cold } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';

import { AccedoService } from '../../services/accedo.service';
import { SpinnerService } from '../../services/spinner.service';
import * as fromEffects from './movies.effect';
import * as fromActions from '../actions/movies.action';
import { Movie } from '../../models'

export class TestActions extends Actions {
  constructor() {
    super(empty());
  }

  set stream(source: Observable<any>) {
    this.source = source;
  }
}

export function getActions() {
  return new TestActions();
}

describe('MovieEffect', () => {
  let actions$: TestActions;
  let accedoApi: AccedoService;
  let spinner: SpinnerService;
  let effects: fromEffects.MoviesEffects;

  const movies: Movie[] = [
        {
          "title": "10 Things I Hate About You",
          "description": "A new kid must find a guy to date the meanest girl in school, the older sister of the girl he has a crush on, who cannot date until her older sister does.",
          "type": "movie",
          "publishedDate": 931478400000,
          "availableDate": 931478400000,
          "metadata": [{ "value": "en", "name": "language"}],
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
            },
            {
            "role": "Heath Ledger",
            "name": "Heath Ledger"
            },
            {
            "role": "Julia Stiles",
            "name": "Julia Stiles"
            },
            {
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
            },
            {
              "title": "Drama",
              "description": "Drama movies",
              "id": "movies-drama"
            },
            {
              "title": "Romance",
              "description": "Romantic movies",
              "id": "movies-romance"
            }
          ],
          "id": "10-things-i-hate-about-you"
        }];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AccedoService,
        SpinnerService,
        fromEffects.MoviesEffects,
        { provide: Actions, useFactory: getActions },
      ],
    });

    actions$ = TestBed.get(Actions);
    accedoApi = TestBed.get(AccedoService);
    spinner = TestBed.get(SpinnerService);
    effects = TestBed.get(fromEffects.MoviesEffects);

    spyOn(accedoApi,'getMovies').and.returnValue(of(movies));
    spyOn(spinner,"openSpinner").and.returnValue(true);
    spyOn(spinner, "closeSpinner").and.returnValue(true);
  });

  describe('loadMovies$', () => {
    it('should return a collection from LoadPizzasSuccess', () => {
      const action = new fromActions.LoadMovies();
      const completion = new fromActions.LoadMoviesSuccess(movies);

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.loadMovies$).toBeObservable(expected);
    });
  });

});
