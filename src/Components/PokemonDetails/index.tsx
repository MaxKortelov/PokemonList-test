import React, {FC, useState} from 'react';

import styles from './PokemonDetails.module.sass';
import {IPokemonDetails} from '../../Interfaces';
import PropTypes from 'prop-types';

const PokemonDetails : FC<IPokemonDetails> = ({pokemon, info, close}) => {

    const onClose = () => {close(false)}

    const [showPreview, setShowPreview] = useState(false);

    const showBigPreview = () => setShowPreview(true);
    const hideBigPreview = () => setShowPreview(false);

    const renderMoves = () => {
        return 'moves' in pokemon ? pokemon.moves.map((move, index) => {
            return <div className={styles.listItem} key={index}>{move.move.name}</div>
        })  : <div>No moves</div>
    };

    const renderStats = () => {
        return 'stats' in pokemon ? pokemon.stats.map((stat, index) => {
            return <div className={styles.listStats} key={index}>{stat.stat.name}</div>
        })  : <div>No stats</div>
    };

    return(
        <div className={styles.pokemonDetailsWrap}>
            <div className={styles.darkBackground} onClick={onClose}/>
            <div className={styles.detailsWrap}>
                <div className={styles.headerWrap}>
                    <span className={styles.cross} onClick={onClose} />
                    <div
                        className={styles.previewWrap}
                        onTouchStart={showBigPreview}
                        onTouchEnd={hideBigPreview}
                        onMouseOver={showBigPreview}
                        onMouseLeave={hideBigPreview}
                    >
                    {'sprites' in pokemon ? pokemon.sprites.front_default ? <img
                        src={'sprites' in pokemon ? pokemon.sprites.front_default : ''}
                        alt=''
                    /> : null : null}
                    {'sprites' in pokemon ? pokemon.sprites.back_default ? <img
                        src={'sprites' in pokemon ? pokemon.sprites.back_default : ''}
                        alt=''
                        onMouseOver={showBigPreview}
                        onMouseLeave={hideBigPreview}
                    /> : null : null}
                    </div>
                </div>
                <h2 className={styles.title}>{'name' in info ? info.name.toUpperCase() : ''}</h2>
                <div className={styles.paramsWrap}>
                    <div className={styles.tableRow}>
                        <div className={styles.tableCellTitle}>Moves</div>
                        <div className={styles.tableCellDescription}>{renderMoves()}</div>
                    </div>
                    <div className={styles.tableRow}>
                        <div className={styles.tableCellTitle}>Stats</div>
                        <div className={styles.tableCellDescription}>{renderStats()}</div>
                    </div>
                </div>
            </div>
            {showPreview ? <div className={styles.bigPreviewWrap}>
                {'sprites' in pokemon ? pokemon.sprites.other['dream_world']['front_default']
                    ? <img
                        className={styles.bigPreview}
                        src={'sprites' in pokemon ? pokemon.sprites.other['dream_world']['front_default'] : ''}
                        alt=''
                    />
                    : <img
                        className={styles.bigPreview}
                        src={'sprites' in pokemon ? pokemon.sprites.other['official-artwork']['front_default'] : ''}
                        alt=''
                    /> : null}</div> : null}
        </div>
    )
}

PokemonDetails.propTypes = {
    pokemon: PropTypes.any,
    info: PropTypes.any,
    close: PropTypes.any,
}

export default PokemonDetails;