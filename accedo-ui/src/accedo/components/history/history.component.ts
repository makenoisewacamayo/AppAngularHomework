import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Movie, MovieExtended} from '../../models';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

/**
 * GraphQL tag se utiliza para poder definir las operaciones
 * que queramos realizar en el servicio GraphQL (Querys, Mutation y Subscription)
 */
import gql from 'graphql-tag';

/**
 * Query de consulta de usuarios
 */
const HISTORIC_QUERY = gql `{ historic { id, movie, dateViewed } }`;



@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit, OnDestroy {

  public users : MovieExtended[];
  public dataSource : MatTableDataSource<MovieExtended >;
  private subscription: Subscription;

  public usersQuery: QueryRef<any>;
  public usersObservable: Observable<any>;

  public displayColumns = [
    'movie',
    'fecha',
  ];

  constructor(
    private apollo: Apollo,
    private router: Router
  ) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<MovieExtended>([]);

    /**
     * Observable que realiza consulta al servicio GraphQL,
     * utiliza como parámetro la Query escrita en GQL
     */
    this.usersQuery = this.apollo.watchQuery<MovieExtended[]>({
      query: HISTORIC_QUERY
    });
    this.usersObservable = this.usersQuery.valueChanges;

    /**
     * Realiza petición al servidor para obtener la lista de
     * usuarios
     */
    this.subscription = this.usersObservable.subscribe(
      res => {
        this.setDataTable(res.data['historic']);
      }, err => {
        console.log(err);
      });

  }

   /**
   * Carga datos en la tabla
   * @param data
   */
  setDataTable (data: MovieExtended[]) {
    this.dataSource = new MatTableDataSource<MovieExtended>(data);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
