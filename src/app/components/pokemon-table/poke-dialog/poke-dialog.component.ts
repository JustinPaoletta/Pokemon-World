import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Pokemon } from '../pokemon-table.component';

@Component({
  selector: 'app-poke-dialog',
  templateUrl: './poke-dialog.component.html',
  styleUrls: ['./poke-dialog.component.scss']
})
export class PokeDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {pokemon: Pokemon}) { 

  }

  ngOnInit(): void {
    
  }

}
