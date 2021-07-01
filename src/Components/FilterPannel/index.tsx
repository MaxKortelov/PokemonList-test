import React, {FC, useState} from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import {makeStyles, createStyles, Theme} from '@material-ui/core';

import store from '../../Store/PokemonInfo';

import styles from './FilterPannel.module.sass';

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
            },
            '&$focused': {
                backgroundColor: '#fff',
                borderColor: theme.palette.primary.main,
            },
        },
        input: {
            minWidth: '300px',
            width: '300px',
        },
    }),
);

const FilterPannel : FC = () => {

    const classes = useStyles();

    const [age, setAge] = useState('10');
    const [value, setValue] = useState('');

    const handleItemsPerPageChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setAge(event.target.value as string);
    };

    const handleInputChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setValue(event.target.value as string);
    };

    const handleExitClick = () => {store.toggleEntered(false)};

    return (
        <div className={styles.filterPanelWrap}>
            <div className={styles.itemsQuantityWrap}>
                <span className={styles.name}>Items per Page</span>
                <FormControl>
                    <Select
                        value={age}
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
                onChange={handleInputChange} />
            <Button
                variant='contained'
                color='primary'
                onClick={handleExitClick}
            >Exit</Button>
        </div>
    )
}

export default FilterPannel;