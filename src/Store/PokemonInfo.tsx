import {action, makeAutoObservable, observable} from 'mobx';
import axios from 'axios';

interface IPokemonList {
    count: number,
    next: string,
    previous: string,
    results: []
};

class Pokemon{
    @observable pokemonList: IPokemonList | {} = {};
    @observable entered: boolean = false;
    @observable itemsPerPage: string = '10';
    @observable shownPokemons: string = '0'
    @observable loading: boolean = false;
    @observable page: number = 1;

    constructor() {
        makeAutoObservable(this)
    }

    @action
    addPokemon() {
        const url = `https://pokeapi.co/api/v2/pokemon/?limit=${this.itemsPerPage}&offset=${this.shownPokemons}`
        this.toggleLoading(true);
        axios.get(url)
            .then(res => {
                if(res.status === 200) {
                    this.pokemonList = res.data;
                    this.shownPokemons = String(Number(this.itemsPerPage) * this.page - Number(this.itemsPerPage))
                }
            })
            .catch(err => console.log(err))
            .finally(() => this.toggleLoading(false));
    }

    @action
    removePokemon() {this.pokemonList = {}}

    @action
    toggleEntered(boolean: boolean) {this.entered = boolean};

    @action
    toggleLoading(boolean: boolean) {this.loading = boolean};

    @action
    setItemsPerPage(value: string) {this.itemsPerPage = value};
}

export default new Pokemon();