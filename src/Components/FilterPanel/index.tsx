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
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
            width: 300,
            maxWidth: 300,
        },
    })
);

const FilterPanel : FC = observer(() => {

    const classes = useStyles();

    const [value, setValue] = useState('');
    const ref = useRef(0);

    const search = () => {
        if(ref.current <= 2) ref.current += 1;
        if(ref.current > 2) {
            if(value.length > 0) {
                const searchList = store.fullListPokemon.filter(el => !el.name.indexOf(value.toLowerCase())) || undefined;
                store.addPokemon(searchList);
            } else {store.addPokemon(null)}
        }
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

    const [typeName, setTypeName] = useState<string[]>([]);
    const renderTypes = () => (
        store.typeList.map((type, index) => (
            <MenuItem key={index} value={type.name}>
                <Checkbox checked={typeName.indexOf(type.name) > -1}/>
                <ListItemText primary={type.name.toUpperCase()}/>
            </MenuItem>
        ))
    );
    const handleTypeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setTypeName(event.target.value as string[]);
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
        if(ref.current <= 2) ref.current += 1;
        if(ref.current > 2) {
            if(typeName.length > 0) {
                store.nullifyTypePokemon();
                typeName.forEach(name => store.loadTypePokemon(name, value))
            } else {search()}
        }
    }, [typeName.length]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className={styles.filterPanelWrap}>
            <div className={styles.itemsQuantityWrap}>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-mutiple-checkbox-label">Types</InputLabel>
                    <Select
                        labelId="demo-mutiple-checkbox-label"
                        id="demo-mutiple-checkbox"
                        multiple
                        value={typeName}
                        onChange={handleTypeChange}
                        input={<Input />}
                        renderValue={(selected) => (selected as string[]).join(', ')}
                        MenuProps={MenuProps}
                    >
                        {renderTypes()}
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