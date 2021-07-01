import React, {FC, useEffect, useState} from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';

import styles from './CardPokemon.module.sass';
import axios from 'axios';

interface ICard {
    info: {
        name: string,
        url: string,
    },
}

interface IPokemon {
    sprites: {
        other: {
            'official-artwork': {
                'front_default': string
            }
        }
    },
    types: [
        {
            type: {
                name: string
            }
        }
    ]
}

const CardPokemon : FC<ICard> = ({info}) => {

    const [loading, setLoading] = useState(true);
    const [pokemon, setPokemon] = useState<IPokemon | {}>({});

    useEffect(() => {
        axios.get(info.url)
            .then(res => {
                if(res.status === 200) {
                    setPokemon(res.data);
                    setLoading(false);
                    console.log(res.data);
                }
            })
            .catch(err => console.log(err))
    }, [info.url]);

    const renderTypes = () => {
        return 'types' in pokemon ? pokemon.types.map(type => {
            return <div className={styles.type}>{type.type.name[0].toUpperCase() + type.type.name.substring(1)}</div>
        }) : null;
    };

    return(
        <div className={styles.cardListWrap}>
            <Card>
                <CardActionArea>
                    {loading
                    ? <Skeleton variant="rect" width="100%">
                        <div style={{ paddingTop: '57%' }} />
                    </Skeleton>
                    : <CardMedia
                        component='img'
                        alt='Pokemon'
                        height='140'
                        image={'sprites' in pokemon ? pokemon.sprites.other['official-artwork']['front_default'] : ''}
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
    )
}

export default CardPokemon;