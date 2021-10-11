import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { PokemonService } from './pokemon.service';
import { Pokemon } from '../models/pokemon.interface';

describe('PokemonService', () => {
  let httpTestingController: HttpTestingController;
  let service: PokemonService;
  const testData: Pokemon = {
    id: 2,
    name: "Charizard",
    image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/006.png",
    type: "fire",
    hp: 100,
    attack: 20,
    defense: 12,
    idAuthor: 1,
    created_at: "2020-07-02T22:50:05.414Z",
    updated_at: "2020-07-02T22:50:05.414Z"
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(PokemonService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get a single pokemon', () => {
    const getUrl = 'https://pokemon-pichincha.herokuapp.com/pokemons/1';
  
    service.getPokemon(1)
      .subscribe(data =>
        expect(data).toEqual(testData)
      );

    const req = httpTestingController.expectOne(getUrl);
  
    expect(req.request.method).toEqual('GET');
  
    req.flush(testData);
  
    httpTestingController.verify();
  });

  it('should get pokemons', () => {
    const getUrl = 'https://pokemon-pichincha.herokuapp.com/pokemons/?idAuthor=1';
  
    service.getPokemons(1)
      .subscribe(data =>
        expect(data.length).toBeGreaterThan(0)
      );

    const req = httpTestingController.expectOne(getUrl);
  
    expect(req.request.method).toEqual('GET');
  
    req.flush([testData, testData]);
  
    httpTestingController.verify();
  });

  it('should get pokemons count', () => {
    const getUrl = 'https://pokemon-pichincha.herokuapp.com/pokemons/count?idAuthor=1';
  
    service.getPokemonsCount(1)
      .subscribe(data =>
        expect(data).toEqual(12)
      );

    const req = httpTestingController.expectOne(getUrl);
  
    expect(req.request.method).toEqual('GET');
  
    req.flush(12);
  
    httpTestingController.verify();
  });

  it('should create pokemon', () => {
    const postUrl = 'https://pokemon-pichincha.herokuapp.com/pokemons/?idAuthor=1';
  
    service.createPokemon(1, testData)
      .subscribe(data =>
        expect(data).toEqual(testData)
      );

    const req = httpTestingController.expectOne(postUrl);
  
    expect(req.request.method).toEqual('POST');
  
    req.flush(testData);
  
    httpTestingController.verify();
  });

  it('should update pokemon', () => {
    const putUrl = 'https://pokemon-pichincha.herokuapp.com/pokemons/1';
  
    service.updatePokemon(1, testData)
      .subscribe(data =>
        expect(data).toEqual(testData)
      );

    const req = httpTestingController.expectOne(putUrl);
  
    expect(req.request.method).toEqual('PUT');
  
    req.flush(testData);
  
    httpTestingController.verify();
  });
  
  it('should remove pokemon', () => {
    const deleteUrl = 'https://pokemon-pichincha.herokuapp.com/pokemons/1';
  
    service.deletePokemon(1)
      .subscribe(data =>
        expect(data).toEqual({})
      );

    const req = httpTestingController.expectOne(deleteUrl);
  
    expect(req.request.method).toEqual('DELETE');
  
    req.flush({});
  
    httpTestingController.verify();
  });
});
