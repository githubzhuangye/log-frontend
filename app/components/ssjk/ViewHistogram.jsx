import React from 'react';

import Histogram from '../common/Histogram.jsx'

import {connect} from 'react-redux'

import {queryViewMonInfo,getViewXAxisArray,Histogram_TITLE,Histogram_X_AXIS_TITLE,Histogram_Y_AXIS_TITLE,Histogram_SERIES_NAMES,Histogram_TOOL_TIP_FORMATTER} from './redux/Redux'
import styles from './css/LeftHistogram.css'


/**
 * 访问量查询的柱状图
 */
class SsjkViewHistogram extends React.Component {

    render() {
        const {X_AXIS_ARRAY,DATA_ONE,commitParams,data}=this.props;
        let SUB_TITLE= `监控`;
        const baseOptionSet={  Histogram_TITLE,Histogram_X_AXIS_TITLE,Histogram_Y_AXIS_TITLE,Histogram_SERIES_NAMES,Histogram_TOOL_TIP_FORMATTER     } ;
        const DATA=[DATA_ONE];//  一共有3个视图,diff
        const dataOptionSet={X_AXIS_ARRAY,DATA, SUB_TITLE,};

        return (
            <div className={styles.root}>
                <Histogram baseOptionSet={baseOptionSet} dataOptionSet={dataOptionSet}  containerId="SsjkViewLeftHistogram" width="100%" height="30rem"/>
            </div>
        )
    }
}

export default connect (
    (state,ownProps)=>({
        DATA_ONE:queryViewMonInfo(state.ssjk_redux.data,state.ssjk_redux.form.commitParams),
        X_AXIS_ARRAY:getViewXAxisArray(state.scbb_idcard_redux.data),
        commitParams:state.ssjk_redux.form.commitParams,
        data:state.ssjk_redux.data,

    }),
    {

    }
)(SsjkViewHistogram);


