import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as camelcaseKeys from 'camelcase-keys';
import { MovieDto } from 'src/dtos';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movies: MovieDto[] = [];
  filteredMovies: MovieDto[] = []

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.http.get<MovieDto[]>('https://movie-api.benoithubert.me/movies').subscribe(response => {
      this.movies = camelcaseKeys(response, { deep: true });
    });
  }

  filter(filter: (movie: MovieDto) => boolean): void {
    this.filteredMovies = this.movies.filter(movie => filter(movie));
  }
}
