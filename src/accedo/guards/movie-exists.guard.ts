import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { tap, map, filter, take, switchMap, catchError } from 'rxjs/operators';

import * as fromStore from '../store';

import { Movie } from '../models';

@Injectable()
export class MovieExistsGuard implements CanActivate {
  constructor(private store : Store < fromStore.ProductsState >) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.checkStore()
      .pipe(
        switchMap(() => {
          const id = route.params.pizzaId;
          return this.hasMovie(id);
        })
      );
  }
  hasMovie(id: string): Observable<boolean> {
    return this.store.select(fromStore.getMoviesEntities)
      .pipe(
        map((entities: {[key: string]:  Movie}) => !!entities[id]),
        take(1)
      );
  }
  checkStore(): Observable<boolean> {
    return this.store
      .select(fromStore.getMoviesLoaded)
      .pipe(
        tap(loaded => {
          if (!loaded) {
            this.store.dispatch(new fromStore.LoadMovies);
          }
        }),
        filter(loaded => loaded),
        take(1)
      );
  }
}
