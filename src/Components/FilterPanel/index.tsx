import React, {FC, useState} from 'react';
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
            padding: '5px 0 5px 10px',
        },
    })
);

const FilterPanel : FC = observer(() => {

    const classes = useStyles();

    const [value, setValue] = useState('');

    const handleItemsPerPageChange = (event: React.ChangeEvent<{ value: unknown }>) => {store.setItemsPerPage(event.target.value as string)};

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