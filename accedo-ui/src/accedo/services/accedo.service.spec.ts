import { TestBed, getTestBed} from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


import { AccedoService } from './accedo.service';
import { Movie, AccedoResponse } from '../models/movie.model'

const dummyAccedoResponse: AccedoResponse = {
  totalCount: 1,
  entries: [{
    "title": "10 Things I Hate About You",
    "description": "A new kid must find a guy to date the meanest girl in school, the older sister of the girl he has a crush on, who cannot date until her older sister does.",
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
  }]};

describe('Accedo Service', () => {
  let injector: TestBed;
  let service: AccedoService;
  let httpMock: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AccedoService]
    });
    injector = getTestBed();
    service = injector.get(AccedoService);
    httpMock = injector.get(HttpTestingController)
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('get movies should return an Observable<Movie[]>', () => {
    service.getMovies().subscribe( movies => {
      expect(movies.length).toEqual(1);
      expect(movies).toEqual(dummyAccedoResponse.entries);
    })
    const req = httpMock.expectOne('/movies');
    expect(req.request.method).toEqual('GET');
    req.flush(dummyAccedoResponse);
  });



});
