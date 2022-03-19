import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { CommentDto, GenreDto, MovieDetailDto, MovieDto } from 'src/dtos';
import * as camelcaseKeys from 'camelcase-keys';
import { map, Observable, pipe, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  BASE_URL = 'https://movie-api.benoithubert.me';

  constructor(private http: HttpClient) { }

  format<T>() {
    return pipe(
      map(data => camelcaseKeys(data as T, { deep: true }))
    );
  }

  getMovies() {
    return this.http.get<MovieDto[]>(`${this.BASE_URL}/movies`)
      .pipe(this.format<MovieDto[]>());
  }

  getMovie(id: number) {
    return this.http.get<MovieDetailDto>(`${this.BASE_URL}/movies/${id}`)
      .pipe(this.format<MovieDetailDto>());
  }

  getGenres() {
    return this.http.get<GenreDto[]>(`${this.BASE_URL}/genres`)
      .pipe(this.format<GenreDto[]>());
  }

  sendComment(id: number, comment: Partial<CommentDto>) {
    return this.http.post<CommentDto>(
      `${this.BASE_URL}/movies/${id}/comments`,
      comment
    ).pipe(this.format<CommentDto>());
  }
}
