import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import styles from './TabBar.css'

import {connect} from 'react-redux'
import {push} from 'react-router-redux'

import IdCardMain from './idcard/Main.jsx'
import BankCardMain from './bankcard/Main.jsx'
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
                <Tab    label="身份证认证" value="a"  onActive={()=>{this.props.dispatch(push('/log-frontend/rzbb/scbb/idcard'));}}  >
                    <div>
                    </div>
                </Tab>
                <Tab   label="银行卡认证" value="b"  onActive={()=>{this.props.dispatch(push('/log-frontend/rzbb/scbb/bankcard'));}}>
                    <div>
                    </div>
                </Tab>
                <Tab label="运营商认证"   value="c"   onActive={()=>{this.props.dispatch(push('/log-frontend/rzbb/scbb/member'));}}>
                    <div>
                    </div>
                </Tab>
            </Tabs>

        );
    }
}

export default connect()(TabBar);


