import React from 'react';
import Adjunct from './Adjunct.jsx'

/** 全局控件 */
import LoginDialog from './LoginDialog.jsx'
import SetpwdDialog from './PwdDialog.jsx'


/**
 * 简单react组件
 */
export default class Global extends React.Component {

    render() {
        return (
            <div>
                <Adjunct/>
                <LoginDialog />
                <SetpwdDialog/>
            </div>
        );
    }
}



