import React, {FC} from 'react';
import store from '../../Store/PokemonInfo';
import {observer} from 'mobx-react';

import styles from './Loader.module.sass';

const Loader : FC = observer(() => {
    return(
        <div className={`${styles.loaderWrap} ${store.loading ? styles.appear : styles.disappear}`}>
            <div className={`${styles.pokeball} ${styles.bounce}`}/>
        </div>
        )
})

export default Loader;