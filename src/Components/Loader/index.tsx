import React from 'react';
import store from '../../Store/PokemonInfo';

import styles from './Loader.module.sass';

const Loader = () => {
    console.log(store.entered)
    return(
        <div className={styles.loaderWrap}>
            <div className={`${styles.pokeball} ${styles.bounce}`}/>
        </div>
        )
};

export default Loader;