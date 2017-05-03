import React from 'react';
import styles from './css/HeaderBar.css'

import FlatButton from 'material-ui/FlatButton';
import AppBar from 'material-ui/AppBar';

import logo from '../imgs/logo.png'

import LoginButton from '../components/global/LoginButton.jsx'

export default class HeaderBar extends React.Component {
    render() {
        return (
            <div className={styles.root}>
                <AppBar title="监控平台"  iconElementRight={<LoginButton/>} iconElementLeft={<img src={logo}/>} />
            </div>
        );
    }
}



