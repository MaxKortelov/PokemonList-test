export interface IPokemonList {
    count: number,
    next: string,
    previous: string,
    results: [] | Array<{name: string; url: string}>
}

export interface ICard {
    info: {
        name: string,
        url: string,
    },
}

export interface IInfo {
    name: string,
    url: string,
}

export interface IPokemon {
    id: string
    sprites: {
        'back_default': string,
        'front_default': string
        other: {
            'official-artwork': {
                'front_default': string
            },
            'dream_world': {
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
    ],
    moves: [
        {
            move: {
                name: string,
            }
        }
    ],
    stats: [
        {
            stat: {
                name: string,
            }
        }
    ]
}

export interface IPokemonDetails {
    pokemon : IPokemon | {},
    info : IInfo | {},
    close : (boolean: boolean) => void
}

export interface ITypeListPokemon {
    pokemon : IInfo | {}
}