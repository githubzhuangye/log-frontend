import React from 'react';

import BreadHead from '../components/common/BreadHead.jsx'
import SsjkMain from '../components/ssjk/Main.jsx'

/**
 * 实时监控页面
 */
export default class Ssjk extends React.Component {

    render() {
        return (
            <div>
                <BreadHead firstLevel="实时监控" firstUrl="/ssjk" disabled={true} />
                <SsjkMain/>
            </div>
        );
    }
}



