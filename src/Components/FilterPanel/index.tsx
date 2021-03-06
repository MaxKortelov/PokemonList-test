import React, {FC, useEffect, useRef, useState} from 'react';
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
    InputLabel,
    Checkbox,
    ListItemText,
    Input,
} from '@material-ui/core';
import store from '../../Store/PokemonInfo';
import styles from './FilterPanel.module.sass';
import {useDebounce} from '../../Hooks';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';

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
            [theme.breakpoints.down('sm')]: {
                minWidth: '250px',
                width: '250px',
            },
            [theme.breakpoints.down('xs')]: {
                minWidth: '170px',
                width: '170px',
            },
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
            maxWidth: 300,
        },
    })
);

const FilterPanel : FC = observer(() => {

    const classes = useStyles();

    const ref = useRef(0);

    const search = () => {
        if(ref.current <= 2) ref.current += 1;
        if(!store.isTypes) {
            if(ref.current > 2) {
                if(store.inputSearch.length > 0) {
                    const searchList = store.fullListPokemon.filter(el => !el.name.indexOf(store.inputSearch.toLowerCase())) || undefined;
                    store.addPokemon(searchList);
                } else {store.addPokemon(null)}
            }
        } else {
            store.nullifyTypePokemon();
            store.chosenTypes.forEach(name => store.loadTypePokemon(name, store.inputSearch))
        }
    };

    const debouncedValue = useDebounce<string>(store.inputSearch, 500);

    useEffect(search, [debouncedValue]); // eslint-disable-line

    const handleInputChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        store.setInputSearch(event.target.value as string);
    };

    const handleExitClick = () => {
        store.toggleEntered(false);
        store.removePokemon();
    };

    const renderTypes = () => (
        store.typeList.map((type, index) => (
            <MenuItem key={index} value={type.name}>
                <Checkbox checked={store.chosenTypes.indexOf(type.name) > -1}/>
                <ListItemText primary={type.name.toUpperCase()}/>
            </MenuItem>
        ))
    );
    const handleTypeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        store.setChosenTypes(event.target.value as string[]);
    };
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    useEffect(() => {
        if(ref.current <= 2) ref.current += 2;
        if(ref.current > 2) {
            if(store.chosenTypes.length > 0) {
                store.nullifyTypePokemon();
                store.chosenTypes.forEach(name => store.loadTypePokemon(name, store.inputSearch));
            } else {store.toggleIsTypes(false); search()}
        }
    }, [store.chosenTypes.length]); // eslint-disable-line

    const [switcher, setSwitcher] = useState<boolean>(true);
    const toggleSwitcher = () => setSwitcher(!switcher);

    return (
        <div className={styles.filterPanelWrap}>
            <div
                className={styles.switchView}
                onClick={toggleSwitcher}
            ><ArrowDropDownCircleIcon /></div>
            <div className={`${styles.itemsTypeWrap} ${switcher ? styles.hide : styles.show}`}>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-mutiple-checkbox-label">Types</InputLabel>
                    <Select
                        labelId="demo-mutiple-checkbox-label"
                        id="demo-mutiple-checkbox"
                        multiple
                        value={store.chosenTypes}
                        onChange={handleTypeChange}
                        input={<Input />}
                        renderValue={(selected) => (selected as string[]).join(', ')}
                        MenuProps={MenuProps}
                    >
                        {renderTypes()}
                    </Select>
                </FormControl>
            </div>
            <div className={switcher ? styles.show : styles.hide}>
                <TextField
                    InputProps={{ classes, disableUnderline: true }}
                    value={store.inputSearch}
                    placeholder='Search'
                    variant='standard'
                    size='small'
                    onChange={handleInputChange}
                />
            </div>
            <div className={styles.exitIcon} onClick={handleExitClick}><ExitToAppIcon /></div>
            <Button
                className={styles.exitText}
                variant='contained'
                color='primary'
                onClick={handleExitClick}
            >Exit</Button>
        </div>
    )
})

export default FilterPanel;