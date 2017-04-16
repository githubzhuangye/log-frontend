import React from 'react';

import LeftHistogram from './BankCardHistogram.jsx'
import RightFanChart from './BankCardFanChart.jsx'

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



