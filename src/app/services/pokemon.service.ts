import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) {}

  getAllPokemon(user) {
    return this.http.get(`http://ec2-18-219-120-68.us-east-2.compute.amazonaws.com:8000/allpokemon:${user}`);
  }

  catchOnePokemon(serial, user) {
    return this.http.post('http://ec2-18-219-120-68.us-east-2.compute.amazonaws.com:8000/catch', {serial: serial, user: user});
  }

  getCaughtPokemon(user) {
    return this.http.get(`http://ec2-18-219-120-68.us-east-2.compute.amazonaws.com:8000/pokemon-boxes:${user}`);
  }

  getWildPokemon(user) {
    return this.http.get(`http://ec2-18-219-120-68.us-east-2.compute.amazonaws.com:8000/allWildPokemon:${user}`);
  }

  isUserNew(user) {
    return this.http.post('http://ec2-18-219-120-68.us-east-2.compute.amazonaws.com:8000/isUserNew', {user: user});
  }

  changeName(user, pokemon, newName) {
    return this.http.put('http://ec2-18-219-120-68.us-east-2.compute.amazonaws.com:8000/changeName', {user: user, pokemon: pokemon, newName: newName})
  }

  releasePokemon(user, pokemon) {
    const name = pokemon.NAME;
    return this.http.delete(`http://ec2-18-219-120-68.us-east-2.compute.amazonaws.com:8000/releasePokemon/:${user}/:${name}`)
  }

}
