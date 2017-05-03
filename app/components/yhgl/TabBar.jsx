import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import styles from './TabBar.css'

import {connect} from 'react-redux'
import {push} from 'react-router-redux'

/**
 * tab页
 */
class TabBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 'a',
        };
    }

    handleChange = (value) => {
        this.setState({
            value: value,
        });
    };

    render() {
        return (
            <Tabs  className={styles.root} value={this.state.value} onChange={this.handleChange}   >

                <Tab    label="用户管理" value="a"  onActive={()=>{this.props.dispatch(push('/log-frontend/yhgl/user'));}}  >
                </Tab>
                <Tab   label="权限设置" value="b"  onActive={()=>{this.props.dispatch(push('/log-frontend/yhgl/action'));}}>
                </Tab>

            </Tabs>

        );
    }
}

export default connect()(TabBar);


