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

  createHistory(payload: Movie): Observable<Movie> {
    return this.http
      .post<Movie>('/api/history', payload)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  updateHistory(payload: Movie): Observable<Movie> {
    return this.http
      .put<Movie>(`/api/history/${payload.id}`, payload)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  removeHistory(payload: Movie): Observable<Movie> {
    return this.http
      .delete<any>(`/api/history/${payload.id}`)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }
}

