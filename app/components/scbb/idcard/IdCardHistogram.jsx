import React from 'react';

import Histogram from '../../common/Histogram.jsx'

import {connect} from 'react-redux'

import {getIdCardHistogramData,getIdCardHistogramXAxisArray,Histogram_TITLE,Histogram_X_AXIS_TITLE,Histogram_Y_AXIS_TITLE,Histogram_SERIES_NAMES,Histogram_TOOL_TIP_FORMATTER} from './redux/Redux'
import styles from './css/LeftHistogram.css'




/**
 * 身份证查询的柱状图
 */
class IdCardHistogram extends React.Component {

    render() {
        const {X_AXIS_ARRAY,DATA_ONE,DATA_TWO,DATA_THREE,commitParams}=this.props;

        let SUB_TITLE= `时间:${commitParams.beginDateStr} -- ${commitParams.endDateStr}\n商户:${commitParams.memberName} `;
        const baseOptionSet={  Histogram_TITLE,Histogram_X_AXIS_TITLE,Histogram_Y_AXIS_TITLE,Histogram_SERIES_NAMES,Histogram_TOOL_TIP_FORMATTER     } ;
        const DATA=[DATA_ONE,DATA_TWO,DATA_THREE,];//一共有3个视图
        const dataOptionSet={X_AXIS_ARRAY,DATA, SUB_TITLE, };

        return (
            <div className={styles.root}>
                <Histogram baseOptionSet={baseOptionSet} dataOptionSet={dataOptionSet}  containerId="ScbbIdCardLeftHistogram" width="100%" height="30rem"/>
            </div>
        )
    }
}

export default connect (
    (state,ownProps)=>({
        DATA_ONE:getIdCardHistogramData(state.scbb_idcard_redux.data,state.scbb_idcard_redux.form.commitParams,0),
        DATA_TWO:getIdCardHistogramData(state.scbb_idcard_redux.data,state.scbb_idcard_redux.form.commitParams,1),
        DATA_THREE:getIdCardHistogramData(state.scbb_idcard_redux.data,state.scbb_idcard_redux.form.commitParams,2),
        X_AXIS_ARRAY:getIdCardHistogramXAxisArray(state.scbb_idcard_redux.data),
        commitParams:state.scbb_idcard_redux.form.commitParams
    }),
    {

    }
)(IdCardHistogram);


