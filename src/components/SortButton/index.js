import React, { useState } from 'react'
import styles from './SortButton.module.sass'
import { ReactComponent as ArrowIcon } from "./icons/up.svg"
import { ReactComponent as TreeIcon } from "./icons/tree.svg"
import classNames from 'classnames'

const SortButton = ({ direction, setDirection }) => {
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
                    onClick={() => {  setDirection('BT') }}
                >
                    <ArrowIcon />
                </button>

                <button
                    className={classNames({ [controlButtonClassName]: true, [styles.subButton]: true, [styles.active]: direction === 'TB' })}
                    id={styles.TB}
                    onClick={() => {  setDirection('TB') }}
                >
                    <ArrowIcon />
                </button>
                <button
                    className={classNames({ [controlButtonClassName]: true, [styles.subButton]: true, [styles.active]: direction === 'RL' })}
                    id={styles.RL}
                    onClick={() => {  setDirection('RL') }}
                >
                    <ArrowIcon />
                </button>
                <button
                    className={classNames({ [controlButtonClassName]: true, [styles.subButton]: true, [styles.active]: direction === 'LR' })}
                    id={styles.LR}
                    onClick={() => {  setDirection('LR') }}
                >
                    <ArrowIcon />
                </button>
            </div>

        </div>

    )
}

export default SortButton