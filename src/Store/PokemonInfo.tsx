import {action, makeAutoObservable, observable} from 'mobx';
import axios from 'axios';
import {IPokemonList, ITypeListPokemon} from '../Interfaces';

class Pokemon{
    @observable pokemonList: IPokemonList | {} = {};
    @observable entered: boolean = false;
    @observable itemsPerPage: string = '20';
    @observable loading: boolean = false;
    @observable page: number = 0;
    @observable fullListPokemon: [{ name: string; url: string; }] | [] = [];
    @observable isSearched : boolean = false;
    @observable typeList : Array<{name: string, url: string}> | [] = [];
    @observable isTypes : boolean = false;

    constructor() {
        makeAutoObservable(this)
    };

    @action
    addPokemon(searched : [] | Array<{name: string; url: string}> | null) {
        if(searched) {
            if('results' in this.pokemonList) {
                this.pokemonList.results = searched;
                this.isSearched = true;
            }
        } else {
            const url = `https://pokeapi.co/api/v2/pokemon/?limit=${this.itemsPerPage}&offset=${this.page * Number(this.itemsPerPage)}`
            this.toggleLoading(true);
            axios.get(url)
                .then(res => {
                    if(res.status === 200) {
                        this.pokemonList = res.data;
                        this.isSearched = false;
                    }
                })
                .catch(err => console.log(err))
                .finally(() => {
                    this.toggleLoading(false);
                    if(this.fullListPokemon.length === 0) this.getFullListNames();
                });
        }
    };

    @action
    removePokemon() {this.pokemonList = {}};

    @action
    toggleEntered(boolean: boolean) {this.entered = boolean};

    @action
    toggleLoading(boolean: boolean) {this.loading = boolean};

    @action
    setItemsPerPage(value: string) {this.itemsPerPage = value};

    @action
    setPage(page: number) {this.page = page};

    @action
    getFullListNames() {
        this.toggleLoading(true);
        axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=${'count' in this.pokemonList ? this.pokemonList.count : 0}`)
            .then(res => {
               this.fullListPokemon = res.data.results;
            })
            .catch(err => console.log(err))
            .finally(() => {
                this.toggleLoading(false);
                this.getTypeList();
            });
    };

    @action
    getTypeList() {
        this.toggleLoading(true);
        axios.get(`https://pokeapi.co/api/v2/type/`)
            .then(res => {
                this.typeList = res.data.results;
            })
            .catch(err => console.log(err))
            .finally(() => {
                this.toggleLoading(false);
            });
    }
    @action
    nullifyTypePokemon(){
        if ("results" in this.pokemonList) {
            this.pokemonList.results = [];
        }
    }
    @action
    loadTypePokemon(name : string, value : string) {
        this.toggleLoading(true);
        this.typeList.forEach(type => {
            if(type.name === name) {
                axios.get(type.url)
                    .then(res => {
                        if(res.status === 200) {
                            let pokemon : Array<{name: string, url: string}> | [] = [];
                            res.data.pokemon.forEach((p : ITypeListPokemon) => {
                                if("name" in p.pokemon && !p.pokemon.name.indexOf(value.toLowerCase())) pokemon = [...pokemon, p.pokemon];
                            });
                            if(!this.isTypes) {
                                if ("results" in this.pokemonList) {
                                    this.pokemonList.results = pokemon;
                                }
                                this.toggleIsTypes(true);
                            } else {
                                if ("results" in this.pokemonList) {
                                    const obj : any = {};
                                    let arr = [...this.pokemonList.results, ...pokemon];
                                    arr.forEach(el => obj[el['name']] = el);
                                    this.pokemonList.results = Object.keys(obj).map(name =>  obj[name]);
                                }
                            }
                        }
                    })
                    .catch(err => console.log(err))
                    .finally(() => this.toggleLoading(false));
            }
        })
    }
    @action
    toggleIsTypes = (boolean : boolean) => this.isTypes = boolean;
}

export default new Pokemon();