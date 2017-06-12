import React from 'react';

import BreadHead  from'../components/common/BreadHead.jsx'
import TabBar from '../components/yjsz/TabBar.jsx'


/**
 *  今日观察页面
 */
export default class Yjsz extends React.Component {

    render() {
        return (
            <div>
                {/*<TabBar/>*/}
                {this.props.children}
            </div>
        );
    }
}


