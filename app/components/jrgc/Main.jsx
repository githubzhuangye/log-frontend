import React from 'react';

import GaugeBar from '../../components/jrgc/GaugeBar.jsx'
import ImportantInfoList from '../../components/jrgc/ImportantInfoList.jsx'

/**
 * 简单react组件
 */
export default class Main extends React.Component {

    render() {
        return (
            <div>
                <GaugeBar/>
                <ImportantInfoList/>
            </div>
        );
    }
}



