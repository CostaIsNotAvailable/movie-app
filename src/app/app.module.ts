import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MovieDetailsComponent, MovieListComponent } from 'src/components';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    MovieListComponent,
    MovieDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
