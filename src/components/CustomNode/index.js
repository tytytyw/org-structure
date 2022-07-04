import React from "react";
import styles from "./CustomNode.module.sass";
import { Handle } from "react-flow-renderer";
import classNames from "classnames";
import PropTypes from "prop-types";

function CustomNode({ data, ...props }) {
    return (
        <div className={classNames(styles.node, 'nodrag')}>
            {props.targetPosition && !data.isNotTarget ? <Handle
                type="target"
                position={props.targetPosition}
                isConnectable={false}
                style={{
                    borderRadius: 50,
                    background: "#1976D2",
                    border: 'none',
                    cursor: 'default'
                }}
            /> : null}
            <div className={styles.person}>
                <div className={styles.avatar}>
                    {data.avatar ? <img
                        draggable={false}
                        src={data.avatar}
                        alt="avatar"
                        className={styles.icon}
                    /> : null}
                </div>
                <div className={styles.text}>
                    <p className={styles.name}>{data.name + " " + data.middleName}</p>
                    <p className={styles.name}>{data.surname}</p>
                    <p className={styles.position}>{data.position}</p>
                </div>
            </div>
            {props.sourcePosition && !data.isDontHaveTarget
                ? <Handle
                    position={props.sourcePosition}
                    type="source"
                    isConnectable={false}
                    title={'свернуть'}
                    style={{
                        width: 10,
                        height: 10,
                        borderRadius: 50,
                        background: "#1976D2",
                        zIndex: 2,
                        border: 'none',
                        cursor: 'pointer',
                    }}
                />
                : null}

        </div>
    );
}

export default CustomNode;

CustomNode.propTypes = {
    data: PropTypes.object
};