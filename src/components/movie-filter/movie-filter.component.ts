import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as camelcaseKeys from 'camelcase-keys';
import { MovieDto } from 'src/dtos';

@Component({
  selector: 'app-movie-filter',
  templateUrl: './movie-filter.component.html',
  styleUrls: ['./movie-filter.component.css']
})
export class MovieFilterComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<MovieDto[]>('https://movie-api.benoithubert.me/movies').subscribe(response => {
      const movies = camelcaseKeys(response, { deep: true });
      movies.forEach(m => {

      })
    });
  }

}
