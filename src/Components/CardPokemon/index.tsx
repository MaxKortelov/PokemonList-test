import React, {FC, useEffect, useState} from 'react';
import {
    createStyles,
    makeStyles,
    Theme,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

import styles from './CardPokemon.module.sass';
import axios from 'axios';
import {ICard, IPokemon} from '../../Interfaces';
import PokemonDetails from '../PokemonDetails';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            minWidth: '100%',
            width: '100%',
            minHeight: '100%',
            height: '100%',
        },
    })
);

const CardPokemon : FC<ICard> = ({info}) => {

    const classes = useStyles();

    const [loading, setLoading] = useState(true);
    const [pokemon, setPokemon] = useState<IPokemon | {}>({});
    const [details, setDetails] = useState(false);

    useEffect(() => {
        setPokemon({});
        setLoading(true);
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        axios.get(info.url, {
            cancelToken: source.token
        })
            .then(res => {
                if(res.status === 200) {
                    setPokemon(res.data);
                    setLoading(false);
                }
            })
            .catch(err => console.log(err));
        return () => {source.cancel()};
    }, [info.url]);

    const renderTypes = () => {
        return 'types' in pokemon ? pokemon.types.map((type, index) => {
            return <div className={styles.type} key={index}>{type.type.name[0].toUpperCase() + type.type.name.substring(1)}</div>
        }) : <Skeleton animation='wave' width='100%' />;
    };

    const handleClickCard = () => {
        if(!loading) setDetails(true);
    }

    return(
        <>
            <div className={styles.cardListWrap}>
                <Card
                    className={classes.root}
                    onClick={handleClickCard}
                >
                    <CardActionArea>
                        {loading
                        ? <Skeleton variant='rect' width='100%'>
                            <div style={{ paddingTop: '57%' }} />
                        </Skeleton>
                        : <CardMedia
                            component='img'
                            alt='Pokemon'
                            height='140'
                            image={'sprites' in pokemon ? pokemon.sprites.other['official-artwork']['front_default'] ? pokemon.sprites.other['official-artwork']['front_default'] : './assets/preview.jpeg' : ''}
                        />}
                        <CardContent>
                            <Typography gutterBottom variant='h5' component='h2'>
                                {info.name.toUpperCase()}
                            </Typography>
                            <div className={styles.typesWrap}>
                                {renderTypes()}
                            </div>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </div>
            {details ? <PokemonDetails
                pokemon={pokemon}
                info={info}
                close={setDetails}
            /> : null}
        </>
    )
}

export default CardPokemon;