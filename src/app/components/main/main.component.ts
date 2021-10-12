import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/shared/models/pokemon.interface';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  
  updated: boolean = false;
  isUpdating: boolean = false;
  actualPokemon: Pokemon | undefined;

  constructor() {
  }

  ngOnInit(): void {}

  setUpdating(event: boolean) {
    this.isUpdating = event;
  }

  setUpdated(event: boolean) {
    this.updated = event;
    this.isUpdating = false;
    this.actualPokemon = undefined;
  }

  setActualPokemon(event: Pokemon) {
    this.actualPokemon = event;
  }
}
