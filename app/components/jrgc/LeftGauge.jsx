import React from 'react';

import Gauge from '../common/Gauge.jsx'


/**
 * 左边仪表板
 */
export default class LeftGauge extends React.Component {

    render() {
        const baseOptionSet={};
        const dataOptionSet={};
        return (
            <div style={{display:'inline-block',width:'33%'}}>
                <Gauge baseOptionSet={baseOptionSet} dataOptionSet={dataOptionSet} containerId="LeftGauge" width="20rem" height="20rem"/>
            </div>
        );
    }
}



