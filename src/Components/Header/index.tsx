import React, {FC} from 'react';
import {observer} from 'mobx-react';
import store from '../../Store/PokemonInfo';

import styles from './Header.module.sass';

import FilterPanel from '../FilterPanel';

const Header: FC = observer(() => {
    return(
        <div className={styles.headerWrap}>
            {!store.entered ? <div className={styles.welcomeText}>WELCOME TO POKEMON LIST WEBSITE</div> : null}
            {store.entered ? <FilterPanel /> : null}
        </div>
    )
})

export default Header;