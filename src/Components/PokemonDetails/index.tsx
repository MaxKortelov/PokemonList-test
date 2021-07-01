import React, {FC} from 'react';

import styles from './PokemonDetails.module.sass';
import {IPokemonDetails} from '../../Interfaces';

const PokemonDetails : FC<IPokemonDetails> = ({pokemon, close}) => {

    const onClose = () => {close(false)}

    return(
        <div className={styles.pokemonDetailsWrap}>
            <div className={styles.darkBackground} onClick={onClose}/>
            <div className={styles.detailsWrap}>

            </div>
        </div>
    )
}

export default PokemonDetails;