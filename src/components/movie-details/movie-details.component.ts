import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import * as camelcaseKeys from 'camelcase-keys';
import { CommentDto, MovieDetailDto } from 'src/dtos';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  id?: number;
  movie?: MovieDetailDto;
  comment: Partial<CommentDto> = {};

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

  formatISOString(date: string): string {
    const splittedDate = date.substring(0,10).split('-');
    return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`;
  }

  sendComment() {
    if (!this.id) {
      return;
    }

    this.http.post<CommentDto>(
      `https://movie-api.benoithubert.me/movies/${this.id}/comments`,
      this.comment
    ).subscribe(postedComment => {
      if (!this.movie) {
        return;
      }

      this.movie.comments.unshift(postedComment);
    });
  }
}
