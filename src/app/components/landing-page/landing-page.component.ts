import { Component, OnInit } from '@angular/core';
import { HowToPlayComponent } from './how-to-play/how-to-play.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '@auth0/auth0-angular';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  user: any;

  constructor(private dialog: MatDialog,
              private auth: AuthService,
              private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.auth.user$.subscribe((profile) => {
      this.user = profile;
      this.pokemonService.isUserNew(this.user).subscribe((val) => {
        console.log(val);
      });
    });
    this.auth.isAuthenticated$.subscribe((val) => {
      if (val === false) {
        this.auth.logout();
      }
    });
  }

  openInstructions(name) {
    let dialogRef = this.dialog.open(HowToPlayComponent, {
      height: '640px',
      width: '600px',
      data: {
        name: name
      }
    });
  }

}
