import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon } from '../models/pokemon.interface';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private url = 'https://pokemon-pichincha.herokuapp.com/pokemons/';

  constructor(private http: HttpClient) { }

  getPokemons(author: number): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(`${this.url}?idAuthor=${author}`);
  }

  getPokemon(id: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.url}${id}`);
  }
  
  getPokemonsCount(author: number): Observable<number> {
    return this.http.get<number>(`${this.url}count?idAuthor=${author}`);
  }

  createPokemon(author: number, pokemon: Pokemon): Observable<any> {
    return this.http.post<any>(`${this.url}?idAuthor=${author}`, pokemon);
  }

  updatePokemon(id: number, pokemon: Pokemon): Observable<Pokemon> {
    return this.http.put<Pokemon>(`${this.url}${id}`, pokemon);
  }

  deletePokemon(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}${id}`);
  }
}
