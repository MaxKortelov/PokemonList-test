import React, {FC, useEffect} from 'react';
import store from '../../Store/PokemonInfo';
import {observer} from 'mobx-react';

import styles from './Footer.module.sass';
import TablePagination from '@material-ui/core/TablePagination';

const Footer : FC = observer(() => {

    useEffect(() => {
        store.setPage(0);
    }, [store.isSearched, store.isTypes, store.chosenTypes.length, store.inputSearch, store.itemsPerPage]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        if(store.isSearched || store.isTypes) {
            store.setPage(newPage);
        } else {
            store.setPage(newPage)
            store.addPokemon(null);
        }
    };
    const handleItemsPerPageChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        if(store.isSearched || store.isTypes) {
            store.setItemsPerPage(event.target.value as string);
        } else {
            store.setItemsPerPage(event.target.value as string);
            store.addPokemon(null);
        }
    };

    if(!store.entered || ('results' in store.pokemonList ? store.pokemonList.results.length === 0 : true)) return null;
    return(
        <div className={styles.footerWrap}>
            <TablePagination
                component="div"
                page={store.page}
                onChangePage={handleChangePage}
                count={store.isSearched || store.isTypes
                    ? 'results' in store.pokemonList
                        ? store.pokemonList.results.length
                        : 0
                    : 'count' in store.pokemonList
                        ? store.pokemonList.count
                        : 0}
                rowsPerPageOptions={[10, 20, 50]}
                rowsPerPage={Number(store.itemsPerPage)}
                onChangeRowsPerPage={handleItemsPerPageChange}
            />
        </div>
    )
})

export default Footer;