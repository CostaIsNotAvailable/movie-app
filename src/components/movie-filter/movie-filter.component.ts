import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiService } from 'src/services';
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

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getGenres().subscribe(genres => {
      this.genres = genres;
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
