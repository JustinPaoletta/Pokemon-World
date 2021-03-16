import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { PokeDialogComponent } from './poke-dialog/poke-dialog.component';
import { AuthService } from '@auth0/auth0-angular';

export interface Pokemon {
  ABILITY1: string
  ABILITY2: string | null
  ABILITY_HIDDEN: string
  ATK: number
  CODE: number
  COLOR: string
  DEF: number
  GENERATION: string
  HEIGHT: number
  HP: number
  LEGENDARY: string
  MEGA_EVOLUTION: string
  NAME: string
  NUMBER: string
  SERIAL: number
  SPD: string
  SP_ATK: string
  SP_DEF: string
  TOTAL: number
  TYPE1: string
  TYPE2: string
  WEIGHT: number
  STATUS: string
}

@Component({
  selector: 'app-pokemon-table',
  templateUrl: './pokemon-table.component.html',
  styleUrls: ['./pokemon-table.component.scss']
})
export class PokemonTableComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['NUMBER', 'NAME', 'TYPE1', 'TYPE2', 'HP', 'ATK', 'DEF', 'SPD', 'SP_ATK', 'SP_DEF', 'GENERATION', 'STATUS'];
  dataSource: MatTableDataSource<Pokemon>;
  pokemon;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  pageEvent: PageEvent;
  user;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(private pokemonService: PokemonService,
              private dialog: MatDialog,
              private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.user$.subscribe((user) => {
      this.user = user;
      this.pokemonService.getAllPokemon(user.nickname).subscribe((val) => {
        this.pokemon = val;
        this.dataSource = new MatTableDataSource(this.pokemon);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    })
 
  }

  ngAfterViewInit() {

  }

  doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  openPokeDialog(pokemon) {
    let dialogRef = this.dialog.open(PokeDialogComponent, {
      data: {
        pokemon: pokemon
      },
      height: '640px',
      width: '600px',
      position: {
        left: '31%'
      }
    });
  }

}
