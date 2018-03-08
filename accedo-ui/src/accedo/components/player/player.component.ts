import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import * as fromStore from '../../store';
import * as fromActions from '../../store/actions/history.action';

import { Movie } from '../../models';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  movie$ : Observable<Movie>;

  constructor(private store : Store<fromStore.ProductsState>) {}

  ngOnInit() {
    this.movie$ = this.store.select(fromStore.getSelectedMovie);
    this.movie$.subscribe( (movie) => {
      console.log("get here");
      this.store.dispatch(new fromActions.CreateHistory(movie));
    });
  }

}
