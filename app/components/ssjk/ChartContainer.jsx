import React from 'react';

import ViewHistogram from './ViewHistogram.jsx'

/**
 * 图表的容器
 */
export default class ChartContainer extends React.Component {

    render() {
        return (
            <div style={{marginTop:'2rem'}}>
                <ViewHistogram/>
            </div>
        );
    }
}



