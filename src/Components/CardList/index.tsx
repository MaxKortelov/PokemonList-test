import React, {FC} from 'react';
import store from '../../Store/PokemonInfo';
import {observer} from 'mobx-react';

import styles from './CardList.module.sass';
import Card from '../Card';

const CardList : FC = observer(() => {

    const renderCards = () => {
        return "results" in store.pokemonList ? store.pokemonList.results.map(pokemon => {
            return <Card/>
        }) : null;
    }

    return(
        <div className={styles.cardListWrap}>
            {renderCards()}
        </div>
    )
})

export default CardList;