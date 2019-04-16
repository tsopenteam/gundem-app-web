import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './Components/Home/home.component';

import { HomeService } from './Components/Home/Services/home.service';
import { HomeDataService } from './Components/Home/Services/home.data.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [
    HomeService,
    HomeDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
