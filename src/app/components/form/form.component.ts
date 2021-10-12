import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Pokemon } from 'src/app/shared/models/pokemon.interface';
import { PokemonService } from 'src/app/shared/services/pokemon.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, OnChanges {
  @Input() 
  isUpdating: boolean = false;
  @Output()
  updated = new EventEmitter<boolean>();
  @Input()
  pokemon: Pokemon | undefined = undefined;

  pokemonForm: FormGroup;

  constructor(
    private pokemonService: PokemonService
  ) {
    this.pokemonForm = new FormGroup({
      id: new FormControl(undefined, [Validators.required]),
      name: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      hp: new FormControl(0, [Validators.required]),
      attack: new FormControl(0, [Validators.required]),
      defense: new FormControl(0, [Validators.required]),
      idAuthor: new FormControl(1, [Validators.required]),
      created_at: new FormControl(undefined, [Validators.required]),
      updated_at: new FormControl(undefined, [Validators.required]),
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.pokemon && this.pokemonForm.setValue(this.pokemon);
  }
  
  get name() {
    return this.pokemonForm.get('name') as FormControl;
  }
  get image() {
    return this.pokemonForm.get('image') as FormControl;
  }
  get type() {
    return this.pokemonForm.get('type') as FormControl;
  }
  get hp() {
    return this.pokemonForm.get('hp') as FormControl;
  }
  get attack() {
    return this.pokemonForm.get('attack') as FormControl;
  }
  get defense() {
    return this.pokemonForm.get('defense') as FormControl;
  }

  getErrorMessage(controlName: string) {
    if (this.pokemonForm.get(controlName)?.hasError('required')) {
      return 'You must enter a value';
    }
    return;
  }

  updatePokemon() {
    this.pokemon &&
      this.pokemonService.updatePokemon(this.pokemon.id, this.pokemonForm.value)
        .subscribe(
          () => {
            this.updated.emit(true);
            this.pokemonForm.reset();
          }
        );
  }

  createPokemon() {
    this.pokemonService.createPokemon(1, this.pokemonForm.value)
      .subscribe(
        () => {
          this.updated.emit(true);
          this.pokemonForm.reset();
        }
      )
  }

  formatLabel(value: number) {
    if (value >= 100) {
      return Math.round(value);
    }

    return value;
  }
}
