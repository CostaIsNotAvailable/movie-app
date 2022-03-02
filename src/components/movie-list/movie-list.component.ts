import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MovieDto } from 'src/dtos';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  // private movies: MovieDto;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<MovieDto[]>('https://movie-api.benoithubert.me/movies').subscribe(response => {
      console.log(response);
    });
  }

}
