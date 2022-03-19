import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/services';
import { Router } from '@angular/router';
import { MovieDto } from 'src/dtos';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movies: MovieDto[] = [];
  filteredMovies: MovieDto[] = []

  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getMovies().subscribe(movies => {
      this.movies = movies;
    });
  }

  filter(filter: (movie: MovieDto) => boolean): void {
    this.filteredMovies = this.movies.filter(movie => filter(movie));
  }
}
