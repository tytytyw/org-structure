import React, { useState } from 'react'
import styles from './SortButton.module.sass'
import { ReactComponent as ArrowIcon } from "./icons/up.svg"
import { ReactComponent as TreeIcon } from "./icons/tree.svg"
import classNames from 'classnames'

const SortButton = ({ direction, setDirection, setShowLoader }) => {
    const [openMenu, setOpenMenu] = useState(false);

    const controlButtonClassName = 'react-flow__controls-button';


    return (
        <div className={classNames({ [styles.wrapper]: true, [styles.active]: openMenu })}>
            <button
                className={classNames({ [controlButtonClassName]: true, [styles.mainButton]: true, [styles.active]: openMenu })}
                onClick={() => setOpenMenu(prev => !prev)}
            >
                <TreeIcon />
            </button>

            <div className={styles.subButtons}>
                <button
                    className={classNames({ [controlButtonClassName]: true, [styles.subButton]: true, [styles.active]: direction === 'BT' })}
                    id={styles.BT}
                    onClick={() => { setShowLoader(true); setDirection('BT') }}
                >
                    <ArrowIcon />
                </button>

                <button
                    className={classNames({ [controlButtonClassName]: true, [styles.subButton]: true, [styles.active]: direction === 'TB' })}
                    id={styles.TB}
                    onClick={() => { setShowLoader(true); setDirection('TB') }}
                >
                    <ArrowIcon />
                </button>
                <button
                    className={classNames({ [controlButtonClassName]: true, [styles.subButton]: true, [styles.active]: direction === 'RL' })}
                    id={styles.RL}
                    onClick={() => { setShowLoader(true); setDirection('RL') }}
                >
                    <ArrowIcon />
                </button>
                <button
                    className={classNames({ [controlButtonClassName]: true, [styles.subButton]: true, [styles.active]: direction === 'LR' })}
                    id={styles.LR}
                    onClick={() => { setShowLoader(true); setDirection('LR') }}
                >
                    <ArrowIcon />
                </button>

            </div>



        </div>

    )
}

export default SortButton