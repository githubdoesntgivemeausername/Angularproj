import { Component, OnInit } from '@angular/core';
import { Movie } from './models/movie';

import { db } from "./../assets/movie-db";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {

  errorMessage:string = "";
  movies:Movie[] =[];
  filteredMovies:Movie[] = [];
  languages:any[] = db.languages;
  selectedLanguages = this.languages.filter(lang => lang.checked).map(lang => lang.name);
  genres:any[] = db.genres;
  selectedGenres = this.genres.filter(genre => genre.checked).map(genre => genre.name);

  ngOnInit(): void {
      this.movies = db.movies;
      this.filteredMovies = this.movies;
  }
  getAllLanguages(): string[] {
    return this.languages.map(lang => lang.name);
  }

  getAllGenres(): string[] {
    return this.genres.map(genre => genre.name);
  }
  onLanguageSelected(language: string) {
    const index = this.selectedLanguages.indexOf(language);
    if (index > -1) {
      this.selectedLanguages.splice(index, 1);
    } else {
      this.selectedLanguages.push(language);
    }
    this.getFilteredMovies();
  }
  onGenreSelected(genre: string) {
    const index = this.selectedGenres.indexOf(genre);
    if (index > -1) {
      this.selectedGenres.splice(index, 1);
    } else {
      this.selectedGenres.push(genre);
    }
    this.getFilteredMovies();
  }
  getFilteredMovies() {
    this.filteredMovies = this.movies.filter(movie => 
      this.selectedLanguages.includes(movie.language.toLowerCase()) &&
      this.selectedGenres.includes(movie.genre.toLowerCase())
    );
  }
clearFilters() {
  this.selectedLanguages = [];
  this.selectedGenres = [];
  this.getFilteredMovies()
}
}



