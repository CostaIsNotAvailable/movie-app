import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/services';
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

  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id !== null) {
        this.id = +id;
        this.apiService.getMovie(this.id).subscribe(movie => {
          this.movie = movie;
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

   this.apiService.sendComment(this.id, this.comment).subscribe(postedComment => {
      if (!this.movie) {
        return;
      }

      this.movie.comments.unshift(postedComment);
    });
  }
}
