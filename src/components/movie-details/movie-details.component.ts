import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import * as camelcaseKeys from 'camelcase-keys';
import { MovieDetailDto } from 'src/dtos';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  id?: number;
  movie?: MovieDetailDto;

  constructor(private http: HttpClient, private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id !== null) {
        this.id = +id;
        this.http.get<MovieDetailDto>(`https://movie-api.benoithubert.me/movies/${this.id}`).subscribe(response => {
          this.movie = camelcaseKeys(response, { deep: true });
        });
      }
    });
  }
}
