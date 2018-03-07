export interface Metadata {
  value: string;
  name: string;
}

export interface Credit {
  role: string;
  name: string;
}

export interface Content {
  url: string;
  format: string;
  width: number;
  height: number;
  language : string;
  duration : number;
  geoLock : boolean;
  id : string;
}

export interface ParentalRating {
  scheme: string;
  rating: string;
}

export interface Image {
  type: string;
  url: string,
  width: number;
  height: number;
  id: string;
}

export interface CoverImage {
  type : string;
  src : string,
  width : string;
  height : string;
  alt: string;
  title: string;
  id: string;
  crossorigin?: string;
  decoding?: string;
  referrerpolicy?: string;
}

export interface Categories {
  title: string;
  description: string;
  id: string;
}

export interface Movie {
  title: string;
  description: string;
  type: string;
  publishedDate: number;
  availableDate: number;
  metadata: Metadata[];
  contents: Content[];
  credits?: Credit[];
  parentalRatings: ParentalRating[];
  categories?: Categories[];
  images: Image[];
  id: string;
}

export interface AccedoResponse {
  totalCount: number,
  entries: Movie[]
}
