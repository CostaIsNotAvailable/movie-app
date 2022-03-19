import { CollectionDto, CommentDto, CompanyDto, GenreDto } from "src/dtos";

export interface MovieDetailDto {
  id: number;
  adult: boolean;
  backdropPath: string;
  belongsToCollection: CollectionDto;
  budget: number;
  genres : GenreDto[];
  homepage: string;
  imdbId: string;
  originalLanguage: string;
  originalTitle: string;
  overview: string;
  popularity: number;
  posterPath: string;
  productionCompanies: CompanyDto[];
  revenue: number;
  runtime: number;
  releaseDate: string;
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  voteAverage: number;
  voteCount: number;
  comments: CommentDto[];
}
