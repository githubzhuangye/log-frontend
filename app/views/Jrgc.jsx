import React from 'react';

import BreadHead  from'../components/common/BreadHead.jsx'
import JrgcMain from '../components/jrgc/Main.jsx'


/**
 *  今日观察页面
 */
export default class Jrgc extends React.Component {

    render() {
        return (
            <div>
                <BreadHead firstLevel="今日观察" firstUrl="/jrgc" disabled={true}/>
                <JrgcMain/>
            </div>
        );
    }
}



