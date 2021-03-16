import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../pokemon-table/pokemon-table.component';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  center: google.maps.LatLngLiteral
  markers = [];
  markerCoordinates = [];
  shapes = [];
  myPokemon: any = [];
  clock: number = 60;
  timerStarted: boolean = false;
  user;

  @ViewChild('text') text: ElementRef

  constructor(private pokemonService: PokemonService,
              private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.user$.subscribe((user) => {
      this.user = user;
      this.pokemonService.getWildPokemon(this.user.nickname).subscribe((pokemon) => {
        let pokemonArray = pokemon as Array<Pokemon>; 
        let numOfPokemon = pokemonArray.length;
        let randomAmount = this.getRandomNumber(30, 100);
        let randomStartingPoint = this.getRandomNumber(0, (numOfPokemon - randomAmount));
        this.myPokemon = pokemonArray.splice(randomStartingPoint, randomAmount);
        this.center = {
          lat: 25,
          lng: -81
        }
        setTimeout(() => { this.text.nativeElement.innerHTML = "Get Ready to Catch Em!" }, 1500)
        setTimeout(() => { this.initMap(); this.startCountdown() }, 3000);
        setInterval(() => { { this.ngOnInit() } }, 120000);
      });
    })
  }

  startCountdown() {
    this.clock = 120;
    if (!this.timerStarted) {
      setInterval(() => { this.clock -= 1 }, 1000);
      this.timerStarted = true;
    }
  }

  initMap(): void {
    const map = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        zoom: 6,
        center: this.center,
        mapTypeId: "terrain",
        zoomControl: true,
        maxZoom: 15,
        minZoom: 4, 
        restriction: {
          latLngBounds: {
              north: 85,
              south: -85,
              west: -180,
              east: 180
          }
        }
      }, 
    );
      
    this.myPokemon.forEach((pokemon) => {
      let marker = new google.maps.Marker({
        position: { 
          lat: this.getRandomNumber(-80, 80),
          lng: this.getRandomNumber(-165, 165)
        },
        map,
        icon: { url: `https://pokemon-world.s3.us-east-2.amazonaws.com/assets/Pokemon/${pokemon.SERIAL}.gif`, scaledSize: new google.maps.Size(30, 30) },
        animation: google.maps.Animation.BOUNCE,
        cursor: 'pointer',
      })
      this.markerCoordinates.push([marker.getPosition().lat(), marker.getPosition().lng()])
      marker.addListener("click", () => {
        infowindow.open(map, marker);
      });
      marker.setVisible(Math.random() >= .8);
      const contentString =
      "</div>" +
        `<a href='https://en.wikipedia.org/wiki/${pokemon.NAME}'>` +
      `https://en.wikipedia.org/wiki/${pokemon.NAME}</a>` +
      "</div>";

      const infowindow = new google.maps.InfoWindow({
        content: contentString,
      });
      this.markers.push(
        marker
      )
    })

    map.addListener("zoom_changed", () => {
      let zoom = map.getZoom();
      // iterate over markers and call setVisible
      if (zoom > 6) {
        this.markers.forEach((i) => {
          i.setVisible(Math.random() > .4);
        });
      }
      if (zoom > 8) {
        this.markers.forEach((i) => {
          i.setVisible(true);
        });
      }
    });

    const drawingManager = new google.maps.drawing.DrawingManager({
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: [
          google.maps.drawing.OverlayType.RECTANGLE,
        ],
      },
    });
    drawingManager.setMap(map);

    drawingManager.addListener(
      'overlaycomplete', 
      (e) => {

        let bounds = e.overlay.getBounds();
        let east = bounds.getNorthEast();
        let west = bounds.getSouthWest();
        let eastLat = east.lat();
        let eastLng = east.lng();
        let westLat = west.lat();
        let westLng = west.lng();

        console.log(this.markerCoordinates);

        this.markerCoordinates.forEach((coordinate) => {
            let pokeLat = coordinate[0];
            let pokeLng = coordinate[1];

            if ( eastLat > pokeLat && pokeLat > westLat && eastLng > pokeLng && pokeLng > westLng ) {
              console.log('found one!')
              this.markers.forEach((marker) => {
                let lat = marker.getPosition().lat();
                let lng = marker.getPosition().lng();
                if (lat === pokeLat && lng === pokeLng) {
                  const icon = marker.getIcon() as any;
                  const serial = icon.url.split('/').pop().split('.').shift();
                  this.pokemonService.catchOnePokemon(serial, this.user.nickname).subscribe(() => {
                    marker.setMap(null);
                    this.markers = this.markers.filter((m) => m !== marker);
                  })
                }
              })
            }
        })

        e.overlay.setMap(null);
      }
    );
  
  }

  getRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
  }

}
