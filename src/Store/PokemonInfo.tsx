import {action, makeAutoObservable, observable} from 'mobx';
import axios from 'axios';

interface IPokemonList {
    count: number,
    next: string,
    previous: string,
    results: object
}

class Pokemon{
    @observable pokemonList?: IPokemonList | {} = {};
    @observable entered: boolean = false;

    constructor() {
        makeAutoObservable(this)
    }

    @action
    addPokemon() {
        const url = `https://pokeapi.co/api/v2/pokemon/?limit=60&offset=60`
        axios.get(url)
            .then(res => {
                if(res.status === 200) {
                    this.pokemonList = {...res.data};
                }
            })
            .catch(err => console.log(err));
    }
    @action
    toggleEntered(boolean: boolean) {this.entered = boolean}
}

export default new Pokemon();