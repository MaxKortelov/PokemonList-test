import {action, makeAutoObservable, observable} from 'mobx';
import axios from 'axios';
import { IPokemonList } from '../Interfaces';

class Pokemon{
    @observable pokemonList: IPokemonList | {} = {};
    @observable entered: boolean = false;
    @observable itemsPerPage: string = '20';
    @observable loading: boolean = false;
    @observable page: number = 0;


    constructor() {
        makeAutoObservable(this)
    }

    @action
    addPokemon() {
        const url = `https://pokeapi.co/api/v2/pokemon/?limit=${this.itemsPerPage}&offset=${this.page * Number(this.itemsPerPage)}`
        this.toggleLoading(true);
        axios.get(url)
            .then(res => {
                if(res.status === 200) {
                    this.pokemonList = res.data;
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

    @action
    setPage(page: number) {this.page = page}
}

export default new Pokemon();