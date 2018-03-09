import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { tap } from 'rxjs/operators';
import * as fromStore from '../../store';
import * as fromActions from '../../store/actions/history.action';
import { MatProgressBar } from '@angular/material'


import { Movie, Content } from '../../models';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  movie$: Observable<Movie>;
  content$: Observable<Content>;

  constructor(private store : Store<fromStore.ProductsState>) {}

  ngOnInit() {
    this.movie$ = this.store.select(fromStore.getSelectedMovie);
    this.movie$.subscribe( (movie) => {
      this.content$ = of(movie.contents[0]);
    });
  }
  onPlay(event: MediaStreamEvent) {
    this.movie$.subscribe( (movie: Movie) => {
      this.store.dispatch(new fromActions.CreateHistory(movie));
    })
  }

}
