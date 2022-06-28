import React from "react";
import styles from "./CustomNode.module.sass";
import { Handle } from "react-flow-renderer";
import classNames from "classnames";
import PropTypes from "prop-types";

function CustomNode({ data }) {
    return (
        <div className={classNames(styles.node, 'nodrag')}>
            {data.type !== 'owner' ? <Handle
                type="target"
                position="left"
                isConnectable={false}
                style={{
                    width: 10,
                    height: 10,
                    borderRadius: 50,
                    background: "#1976D2",
                }}
            /> : null}
            <div className={styles.person} onClick={() => console.log(data)}>
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
            {data.hasSubordinates ? <Handle
                type="source"
                position="bottom"
                isConnectable={false}
                style={{
                    width: 10,
                    height: 10,
                    borderRadius: 50,
                    background: "#1976D2",
                    zIndex: 2,
                }}
            /> : null}

        </div>
    );
}

export default CustomNode;

CustomNode.propTypes = {
    data: PropTypes.object
};