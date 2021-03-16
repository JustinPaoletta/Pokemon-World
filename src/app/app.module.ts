import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { PokemonTableComponent } from './components/pokemon-table/pokemon-table.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { MatPaginatorModule }  from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PokeDialogComponent } from './components/pokemon-table/poke-dialog/poke-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { GoogleMapsModule } from '@angular/google-maps';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MapComponent } from './components/map/map.component';
import { StorageComponent } from './components/storage/storage.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BoxComponent } from './components/storage/box/box.component';
import { HowToPlayComponent } from './components/landing-page/how-to-play/how-to-play.component';
import { AuthModule } from '@auth0/auth0-angular';
import { environment as env } from '../environments/environment';
import { LoginButtonComponent } from './components/login-button/login-button.component';
import { LogoutButtonComponent } from './components/logout-button/logout-button.component';
import { AuthenticationButtonComponent } from './components/authentication-button/authentication-button.component';
import { AuthNavComponent } from './components/auth-nav/auth-nav.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EditPokemonComponent } from './components/edit-pokemon/edit-pokemon.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    PokemonTableComponent,
    LandingPageComponent,
    PokeDialogComponent,
    SidenavComponent,
    MapComponent,
    StorageComponent,
    BoxComponent,
    HowToPlayComponent,
    LoginButtonComponent,
    LogoutButtonComponent,
    AuthenticationButtonComponent,
    AuthNavComponent,
    EditPokemonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
    MatDialogModule,
    GoogleMapsModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    AuthModule.forRoot({
      ...env.auth,
    }),
    MatTooltipModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
