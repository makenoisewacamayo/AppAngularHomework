import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { CoverImage, Movie } from '../../models';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromStore from '../../store';



@Component({
  changeDetection : ChangeDetectionStrategy.OnPush,
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  images$: Observable<CoverImage[]>;

  constructor(private store: Store<fromStore.ProductsState>) {}

  ngOnInit() {
    this.images$ = this.store.select(fromStore.getCoverImages);
  }

  test(e: Event, ele: any) {
    console.log("test");
    console.log(e);
    console.log(ele);
  }
}
