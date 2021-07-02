import React, {FC, useEffect, useState} from 'react';
import {observer} from 'mobx-react';
import {
    makeStyles,
    createStyles,
    Theme,
    TextField,
    Select,
    MenuItem,
    FormControl,
    Button,
} from '@material-ui/core';
import store from '../../Store/PokemonInfo';
import styles from './FilterPanel.module.sass';
import {useDebounce} from '../../Hooks';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            minWidth: '100%',
            width: '100%',
            border: '1px solid #e2e2e1',
            overflow: 'hidden',
            borderRadius: 4,
            backgroundColor: '#fcfcfb',
            transition: theme.transitions.create(['border-color', 'box-shadow']),
            '&:hover': {
                backgroundColor: '#fff',
            }
        },
        input: {
            minWidth: '300px',
            width: '300px',
            padding: '5px 0 5px 10px',
        },
    })
);

const FilterPanel : FC = observer(() => {

    const classes = useStyles();

    const [value, setValue] = useState('');

    const handleItemsPerPageChange = (event: React.ChangeEvent<{ value: unknown }>) => {store.setItemsPerPage(event.target.value as string)};



    const search = () => {
        if(value.length > 0) {
            const searchList = store.fullListPokemon.filter(el => !el.name.indexOf(value.toLowerCase())) || undefined;
            store.addPokemon(searchList);
        } else {store.addPokemon(null)}
    };

    const debouncedValue = useDebounce<string>(value, 500);

    useEffect(search, [debouncedValue]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleInputChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setValue(event.target.value as string);
    };

    const handleExitClick = () => {
        store.toggleEntered(false);
        store.removePokemon();
    };

    return (
        <div className={styles.filterPanelWrap}>
            <div className={styles.itemsQuantityWrap}>
                <span className={styles.name}>Items per Page</span>
                <FormControl>
                    <Select
                        value={store.itemsPerPage}
                        onChange={handleItemsPerPageChange}
                    >
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <TextField
                InputProps={{ classes, disableUnderline: true }}
                value={value}
                placeholder='Search'
                variant='standard'
                size='small'
                onChange={handleInputChange}
            />
            <Button
                variant='contained'
                color='primary'
                onClick={handleExitClick}
            >Exit</Button>
        </div>
    )
})

export default FilterPanel;