import React, {FC} from 'react';
import {observer} from 'mobx-react';
import store from '../../Store/PokemonInfo';

import styles from './Header.module.sass';

import FilterPannel from '../FilterPannel';

const Header: FC = observer(() => {
    return(
        <div className={styles.headerWrap}>
            {!store.entered ? <div>WELCOME TO POKEMON LIST WEBSITE</div> : null}
            {store.entered ? <FilterPannel /> : null}
        </div>
    )
})

export default Header;