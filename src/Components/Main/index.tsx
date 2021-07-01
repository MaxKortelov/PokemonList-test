import React, {FC} from 'react';
import store from '../../Store/PokemonInfo'

import styles from './Main.module.sass';
import {observer} from 'mobx-react';

const Main : FC = observer(() => {

    const getPokemon = () => {
        store.addPokemon();
        store.toggleEntered(true);
    };

    return(
        <div className={styles.mainWrap}>
            {!store.entered ? <div
                className={styles.enterButton}
                onClick={getPokemon}
            >Get Pokemon</div> : null}
            {store.entered ? <div>123</div> : null}
        </div>
    )
})

export default Main;