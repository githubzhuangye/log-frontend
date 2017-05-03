import React from 'react';

import BreadHead  from'../components/common/BreadHead.jsx'
import TabBar from '../components/yhgl/TabBar.jsx'


/**
 *  用户管理
 */
export default class Yhgl extends React.Component {

    render() {
        return (
            <div>
                <BreadHead firstLevel="用户管理" firstUrl="/yhgl" disabled={true}/>
                <TabBar/>
                {this.props.children}
            </div>
        );
    }
}


