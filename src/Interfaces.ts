export interface IPokemonList {
    count: number,
    next: string,
    previous: string,
    results: []
}

export interface ICard {
    info: {
        name: string,
        url: string,
    },
}

export interface IPokemon {
    sprites: {
        other: {
            'official-artwork': {
                'front_default': string
            }
        }
    },
    types: [
        {
            type: {
                name: string
            }
        }
    ]
}

export interface IPokemonDetails {
    pokemon : IPokemon | {},
    close : (boolean: boolean) => void
}