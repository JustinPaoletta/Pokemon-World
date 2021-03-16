import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { AuthService } from '@auth0/auth0-angular';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.scss']
})
export class StorageComponent implements OnInit {

  myPokemon: any = [];
  pages: number;
  pokemonBoxes: any = [];
  currentPage: number = 0;
  user: any;
  mainSub: Subscription;

  constructor(private pokemonService: PokemonService,
              private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.user$.subscribe((user) => {
      this.user = user;
      this.pokemonService.getCaughtPokemon(this.user.nickname).pipe(first()).subscribe((pokemon) => {
        this.myPokemon = pokemon;
        this.pages = Math.ceil(this.myPokemon.length / 50);
        for (let i = 0; i < this.pages; i++) {
          this.pokemonBoxes.push(this.myPokemon.splice(0, 50));
        }
      });
    })
  }
            

  increment() {
    if (this.currentPage < this.pages - 1) {
      this.currentPage++;
    }
  }

  decrement() {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }

}

