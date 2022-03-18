import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as camelcaseKeys from 'camelcase-keys';
import { GenreDto, MovieDto } from 'src/dtos';

@Component({
  selector: 'app-movie-filter',
  templateUrl: './movie-filter.component.html',
  styleUrls: ['./movie-filter.component.css']
})
export class MovieFilterComponent implements OnInit {

  @Output() filter = new EventEmitter<(movie: MovieDto) => boolean>()

  genres?: GenreDto[];
  selectedGenres: number[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<GenreDto[]>('https://movie-api.benoithubert.me/genres').subscribe(response => {
      this.genres = camelcaseKeys(response, { deep: true });
      this.emitFilter();
    });
  }

  toggleGenre(id: number): void {
    const index = this.selectedGenres.indexOf(id);
    if (index > -1) {
      this.selectedGenres.splice(index, 1);
    } else {
      this.selectedGenres.push(id);
    }
    this.emitFilter();
  }

  isSelected(id: number): boolean {
    return this.selectedGenres.includes(id);
  }

  emitFilter(): void {
    const filter = (movie: MovieDto) =>
      !this.selectedGenres.length ||
      movie.genreIds.some(genre => this.selectedGenres.includes(genre));

    this.filter.emit(filter);
  }
}
