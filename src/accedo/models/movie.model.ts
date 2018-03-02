interface Metadata {
  value: string;
  name: string;
}

interface Credit {
  role: string;
  name: string;
}

interface Content {
  url: string;
  format: string;
  width: number;
  height: number;
  language : string;
  duration : number;
  geoLock : boolean;
  id : string;
}

interface ParentalRating {
  scheme: string;
  rating: string;
}

interface Image {
  type: string;
  url: string,
  width: number;
  height: number;
  id: string;
}

interface Categories {
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
