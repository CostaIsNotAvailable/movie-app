export interface MovieDetailDto {
  id: number;
  adult: boolean;
  backdropPath: string;
  belongsToCollection: Collection;
  budget: number;
  genres : Genre[];
  homepage: string;
  imdbId: string;
  originalLanguage: string;
  originalTitle: string;
  overview: string;
  popularity: number;
  posterPath: string;
  productionCompanies: Company[];
  revenue: number;
  runtime: number;
  releaseDate: string;
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  voteAverage: number;
  voteCount: number;
  comments: Comment[];
}

export interface Collection {
  id: number;
  name: string;
  posterPath: string;
  backDropPath: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Company {
  id: number;
  logoPath: string;
  name: string;
  originCountry: string;
}

export interface Comment {
  id: number;
  movieId: number;
  author: string;
  text: string;
  rating: number;
}
