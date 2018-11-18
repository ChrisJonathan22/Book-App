import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { AddbookComponent } from './addbook/addbook.component';
import { DeleteComponent } from './delete/delete.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'addBook', component: AddbookComponent },
  { path: 'deleteBook', component: DeleteComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', component: PagenotfoundComponent }
];



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PagenotfoundComponent,
    HomeComponent,
    AboutComponent,
    AddbookComponent,
    DeleteComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // this is only for debugging purposes. It logs the navigation destinations.
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
