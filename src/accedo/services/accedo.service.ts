import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/observable/throw';

import { Movie } from '../models/movie.model';

@Injectable()
export class AccedoService {
  constructor(private http: HttpClient) {}

  getMovies(): Observable<Movie[]> {
    return this.http
      .get<Movie[]>('/movies')
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }
}

