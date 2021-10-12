import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/shared/models/pokemon.interface';
import { PokemonService } from 'src/app/shared/services/pokemon.service';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnChanges {
  @Input() updated = false;
  @Output() isUpdating = new EventEmitter<boolean>();
  @Output() actualPokemon = new EventEmitter<Pokemon>();
  displayedColumns: string[] = ['id', 'name', 'image', 'type', 'hp', 'attack', 'defense', 'buttons'];
  pokemonDataSource: Pokemon[] = [];
  pokemons: Pokemon[] = [];

  constructor(
    private pokemonService: PokemonService,
  ) { }

  ngOnInit(): void {
    this.getPokemons();
  }

  ngOnChanges(): void {
    this.updated && this.getPokemons();
  }

  private getPokemons() {
    this.pokemonService.getPokemons(1)
      .subscribe(
        (res: Pokemon[]) => {
          this.pokemonDataSource = res;
          this.pokemons = res;
          this.updated = false;
        }
      )
  }

  setActualPokemon(pokemon: Pokemon) {
    this.actualPokemon.emit(pokemon);
    this.isUpdating.emit(true);
  }

  deletePokemon(id: number) {
    this.pokemonService.deletePokemon(id)
      .subscribe(
        () => {
          this.getPokemons();
        }
      )
  }

  filterByName(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.pokemonDataSource = this.pokemons.filter(
      pokemon => pokemon.name.trim().toLowerCase().includes(filterValue.trim().toLowerCase()) 
    )
  }
}
