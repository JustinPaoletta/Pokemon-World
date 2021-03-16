import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditPokemonComponent } from '../../edit-pokemon/edit-pokemon.component';


@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.scss']
})
export class BoxComponent implements OnInit {

  @Input() pokemonBox = [];

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    
  }

  editPokemon(pokemon) {
    let dialogRef = this.dialog.open(EditPokemonComponent, {
      height: '440px',
      width: '600px',
      data: {
        pokemon: pokemon
      }
    });
  }

}
