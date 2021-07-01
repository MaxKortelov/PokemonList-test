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
    @observable itemsPerPage: string = '10';
    @observable loading: boolean = false;

    constructor() {
        makeAutoObservable(this)
    }

    @action
    addPokemon() {
        const url = `https://pokeapi.co/api/v2/pokemon/?limit=${this.itemsPerPage}&offset=${this.itemsPerPage}`
        this.toggleLoading(true);
        axios.get(url)
            .then(res => {
                if(res.status === 200) {
                    this.pokemonList = {...res.data};
                }
            })
            .catch(err => console.log(err))
            .finally(() => this.toggleLoading(false));
    }

    @action
    toggleEntered(boolean: boolean) {this.entered = boolean};

    @action
    toggleLoading(boolean: boolean) {this.loading = boolean};

    @action
    setItemsPerPage(value: string) {this.itemsPerPage = value};
}

export default new Pokemon();