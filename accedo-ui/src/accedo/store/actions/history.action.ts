import { Action } from '@ngrx/store';
import { Movie } from '../../models';

// Load movies for
export const LOAD_HISTORY = '[Historic API] Load Historic';
export const LOAD_HISTORY_FAIL = '[Historic API] Load Hisotric Fail';
export const LOAD_HISTORY_SUCCESS = '[Historic API] Load Historic Success';

export class LoadHistory implements Action {
  readonly type = LOAD_HISTORY;
}

export class LoadHistoryFail implements Action {
  readonly type = LOAD_HISTORY_FAIL;
  constructor(public payload : any) {}
}

export class LoadHistorySuccess implements Action {
  readonly type = LOAD_HISTORY_SUCCESS;
  constructor(public payload : Movie[]) {}
}

// create history
export const CREATE_HISTORY = '[Historic API] Create Hystory entry';
export const CREATE_HISTORY_FAIL = '[Historic API] Create Hystory entry Fail';
export const CREATE_HISTORY_SUCCESS = '[Historic API] Create Hystory entry Success';

export class CreateHistory implements Action {
  readonly type = CREATE_HISTORY;
  constructor(public payload : Movie) {}
}

export class CreateHistoryFail implements Action {
  readonly type = CREATE_HISTORY_FAIL;
  constructor(public payload : any) {}
}

export class CreateHistorySuccess implements Action {
  readonly type = CREATE_HISTORY_SUCCESS;
  constructor(public payload : Movie) {}
}

export type HistoryActions =
 | LoadHistory
 | LoadHistoryFail
 | LoadHistorySuccess
 | CreateHistory
 | CreateHistoryFail
 | CreateHistorySuccess;
