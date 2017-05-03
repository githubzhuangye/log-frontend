import React from 'react';
import HeaderBar from "./layouts/HeaderBar.jsx"
import SideBar from './layouts/SideBar.jsx'

import styles from './App.css'

import Global from './components/global/Global.jsx'

export default class App extends React.Component {
    render() {
        return (
            <div>
                {/*  加载全局的一些组件  */}
                <Global/>
                <HeaderBar/>
                <div className={styles.layout}>
                    <div className={styles.left} >
                        <SideBar/>
                    </div>
                    <div className={styles.right}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}

