import React, {FC} from 'react';
import store from '../../Store/PokemonInfo'

import styles from './Main.module.sass';
import {observer} from 'mobx-react';
import CardList from '../CardList';

const Main : FC = observer(() => {

    const getPokemon = () => {
        store.addPokemon(null);
        store.toggleEntered(true);
    };

    return(
        <div className={styles.mainWrap}>
            {!store.entered ? <div
                className={styles.enterButton}
                onClick={getPokemon}
            >Get Pokemon</div> : null}
            {store.entered ? <CardList /> : null}
        </div>
    )
})

export default Main;