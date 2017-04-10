import React from 'react';
import LeftGauge from './LeftGauge.jsx'
import MiddleGauge from './MiddleGauge.jsx'
import RightGauge from './RightGauge.jsx'


/**
 * 仪表板tiao,默认放置三个仪表板
 */
export default class GaugeBar extends React.Component {

    render() {
        return (
            <div style={{textAlign:'center'}}>
                <LeftGauge/>
                <MiddleGauge/>
                <RightGauge/>
            </div>
        );
    }
}



