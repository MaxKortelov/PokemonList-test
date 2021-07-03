import React, {FC} from 'react';
import store from '../../Store/PokemonInfo';
import {observer} from 'mobx-react';

import styles from './CardList.module.sass';
import CardPokemon from '../CardPokemon';

const CardList : FC = observer(() => {

    const renderCards = () => {
        const results = "results" in store.pokemonList
            ? (store.isSearched || store.isTypes)
                ? store.pokemonList.results.slice(store.page * Number(store.itemsPerPage), (store.page + 1) * Number(store.itemsPerPage))
                : store.pokemonList.results
            : [];
        return results.map((pokemon, index) => {
            return <CardPokemon
                info={pokemon}
                key={index}
            />
        });
    }

    return(
        <div className={styles.cardListWrap}>
            {renderCards()}
        </div>
    )
})

export default CardList;