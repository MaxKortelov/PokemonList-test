import {makeAutoObservable} from 'mobx';

class Pokemon{
    pokemonList: object = [];

    constructor() {
        makeAutoObservable(this)
    }

    addPokemon() {
        
    }
}

export default new Pokemon();