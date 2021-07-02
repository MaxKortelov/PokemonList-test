import React, {FC} from 'react';
import store from '../../Store/PokemonInfo';
import {observer} from 'mobx-react';

import styles from './Footer.module.sass';
import TablePagination from '@material-ui/core/TablePagination';

const Footer : FC = observer(() => {

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        store.setPage(newPage);
        store.addPokemon();
    };
    const handleItemsPerPageChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        store.setItemsPerPage(event.target.value as string);
        store.addPokemon();
    };

    if(!store.entered || ('results' in store.pokemonList ? store.pokemonList.results.length === 0 : true)) return null;
    return(
        <div className={styles.footerWrap}>
            <TablePagination
                component="div"
                page={store.page}
                onChangePage={handleChangePage}
                count={'count' in store.pokemonList ? store.pokemonList.count : 0}
                rowsPerPageOptions={[10, 20, 50]}
                rowsPerPage={Number(store.itemsPerPage)}
                onChangeRowsPerPage={handleItemsPerPageChange}
            />
        </div>
    )
})

export default Footer;