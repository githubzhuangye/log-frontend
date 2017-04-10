import React from 'react';

import GaugeBar from '../components/jrgc/GaugeBar.jsx'
import ImportantEventList from '../components/jrgc/ImportantEventList.jsx'
import BreadHead  from'../components/common/BreadHead.jsx'


/**
 *  今日观察页面
 */
export default class HelloMessage extends React.Component {

    render() {
        return (
            <div>
                <BreadHead firstLevel="今日观察" firstUrl="/jrgc" disabled={true}/>
                <GaugeBar/>
                <ImportantEventList/>
            </div>
        );
    }
}



