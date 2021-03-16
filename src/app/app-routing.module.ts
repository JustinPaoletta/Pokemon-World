import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PokemonTableComponent } from './components/pokemon-table/pokemon-table.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { MapComponent } from './components/map/map.component';
import { StorageComponent } from './components/storage/storage.component';


const routes: Routes = [
  {path: '', redirectTo: '/landing-page', pathMatch: 'full'},
  {path: 'landing-page', component: LandingPageComponent},
  {path: 'pokedex', component: PokemonTableComponent},
  {path: 'map', component: MapComponent},
  {path: 'storage', component: StorageComponent},
];

@NgModule({
  imports: [
  RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' }),
  ],
  
exports: [RouterModule]
})
export class AppRoutingModule { }
