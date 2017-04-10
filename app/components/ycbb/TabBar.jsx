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
                <Tab    label="身份证查询服务" value="a"   onActive={()=>push('/shfhsc/sfzcx')} >
                    <div>

                    </div>
                </Tab>
                <Tab   label="银行卡查询服务" value="b" onActive={()=>push('/shfhsc/yhqcx')} >
                    <div>
                    </div>
                </Tab>
                <Tab label="商户查询服务"   value="c"  onActive={()=>{push('/shfhsc/shcx');alert();}} >
                    <div>
                    </div>
                </Tab>
            </Tabs>

        );
    }
}

export default connect()(TabBar);


