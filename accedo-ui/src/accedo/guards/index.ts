import { MoviesGuard } from './movies.guard'
import { MovieExistsGuard } from './movie-exists.guard';
import { HistoryGuard } from './history.guard'

export const guards : any[] = [MoviesGuard, MovieExistsGuard, HistoryGuard];

export * from './movies.guard';
export * from './movie-exists.guard';
export * from './history.guard';
