import {Component, OnInit, ViewChild, ChangeDetectionStrategy} from '@angular/core';

import { Movie } from '../../models';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromStore from '../../store';

import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})



export class HistoryComponent implements OnInit {
  history$: Observable<Movie[]>;
  error$ : Observable<boolean>;

  displayedColumns = [ 'name', 'dateViewed'];
  dataSource: MatTableDataSource<Movie>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private store: Store<fromStore.ProductsState>) {}

  ngOnInit() {
    this.history$ = this.store.select(fromStore.getAllHistory);
    this.history$.subscribe(
      (movies) => { this.dataSource = new MatTableDataSource<Movie>(movies); }
    )
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
