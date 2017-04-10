import React from 'react';

import LeftHistogram from './IdCardHistogram.jsx'
import RightFanChart from './IdCardFanChart.jsx'

/**
 * 图表的容器
 */
export default class ChartContainer extends React.Component {

    render() {
        return (
            <div style={{marginTop:'2rem'}}>
                <LeftHistogram/>
                <RightFanChart/>
            </div>
        );
    }
}



