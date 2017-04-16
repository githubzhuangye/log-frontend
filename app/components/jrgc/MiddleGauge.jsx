import React from 'react';
import {connect} from 'react-redux'

import Gauge from '../common/Gauge.jsx'
import {URL_LEFT_GAUGE, URL_PREFIX} from '../../consts/Urls'

import {
    ACTION_YCZS,
    ACTION_YCZS_SUCCESS,
    ACTION_YCZS_ERROR
}from './redux/Redux'

/**
 * 左边仪表板
 */
class MiddleGauge extends React.Component {

    //组件渲染结束
    componentDidMount() {
        this.props.fillData();
    }

    render() {
        const {yczs} =this.props;
        const baseOptionSet = {};
        let DATA_TOTAL= [{value: 0, name: '超时指数'}];
        const dataOptionSet = {DATA_TOTAL};
        return (
            <div style={{display: 'inline-block', width: '30%'}}>
                <Gauge baseOptionSet={baseOptionSet} dataOptionSet={dataOptionSet} containerId="MiddleGauge" width="20rem"
                       height="20rem"/>
            </div>
        );
    }
}


//复杂connect,一般用于URL请求
export default connect(
    (state, ownProps) => ({
        yczs: state.jrgc_redux.yczs
    }),
    (dispatch, ownProps) => ({
        fillData: (params) => dispatch(
            {
                url: URL_PREFIX + URL_LEFT_GAUGE,
                params: params,
                types: [ACTION_YCZS,ACTION_YCZS_SUCCESS,ACTION_YCZS_ERROR]
            }
        ),
    })
)(MiddleGauge);







