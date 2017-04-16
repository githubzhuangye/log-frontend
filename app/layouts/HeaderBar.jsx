import React from 'react';
import styles from './css/HeaderBar.css'

import FlatButton from 'material-ui/FlatButton';
import AppBar from 'material-ui/AppBar';

export default class HeaderBar extends React.Component {
    render() {
        return (
            <div className={styles.root}>
                <AppBar title="监控平台"  iconElementRight={<FlatButton {...this.props} label="登录" />} />

            </div>
        );
    }
}


