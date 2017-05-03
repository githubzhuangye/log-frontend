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

                <Tab    label="通道预警设置" value="a"  onActive={()=>{this.props.dispatch(push('/log-frontend/yjsz/channel'));}}  >
                </Tab>
                <Tab   label="商户预警设置" value="b"  onActive={()=>{this.props.dispatch(push('/log-frontend/yjsz/member'));}}>
                </Tab>
                <Tab   label="异常预警设置" value="c"  onActive={()=>{this.props.dispatch(push('/log-frontend/yjsz/exception'));}}>
                </Tab>
                <Tab   label="系统预警设置" value="d"  onActive={()=>{this.props.dispatch(push('/log-frontend/yjsz/member'));}}>
                </Tab>

            </Tabs>

        );
    }
}

export default connect()(TabBar);


