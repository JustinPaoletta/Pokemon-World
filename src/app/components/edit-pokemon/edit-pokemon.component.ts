import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PokemonService } from 'src/app/services/pokemon.service';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-pokemon',
  templateUrl: './edit-pokemon.component.html',
  styleUrls: ['./edit-pokemon.component.scss']
})
export class EditPokemonComponent implements OnInit {

  nickname: string;
  user;

  constructor(@Inject(MAT_DIALOG_DATA) public data,
              private dialogRef: MatDialogRef<EditPokemonComponent>,
              private pokemonService: PokemonService,
              private auth: AuthService,
              private router: Router) { 
                this.router.routeReuseStrategy.shouldReuseRoute = () => {
                  return false;
                };
              }

  ngOnInit(): void {
    this.auth.user$.subscribe((profile) => {
      this.user = profile;
    });
  }

  changeName(pokemon): void {
    this.dialogRef.close();
    this.pokemonService.changeName(this.user.nickname, pokemon, this.nickname).subscribe(() => {
      this.router.navigateByUrl('/storage')
    });
  }

  releasePokemon(pokemon): void {
    this.dialogRef.close();
    this.pokemonService.releasePokemon(this.user.nickname, pokemon).subscribe(() => {
      this.router.navigateByUrl('/storage')
    });
  }

}
