import React from 'react';

import Histogram from '../../common/Histogram.jsx'

import {connect} from 'react-redux'

import {getIdCardHistogramData,getIdCardHistogramXAxisArray} from './redux/ScbbIdCardRedux'
import styles from './css/LeftHistogram.css'


import {TITLE,   X_AXIS_TITLE, Y_AXIS_TITLE, SERIES_NAME, TOOL_TIP_FORMATTER, }  from './redux/IdCardHistogramConst'


/**
 * 身份证查询的柱状图
 */
class IdCardHistogram extends React.Component {

    render() {
        const {X_AXIS_ARRAY,DATA_TOTAL,DATA_ONE,DATA_TWO,dateAndMember}=this.props;

        let SUB_TITLE= `时间:${dateAndMember.beginDateStr} -- ${dateAndMember.endDateStr}\n商户:${dateAndMember.memberName} `;
        const baseOptionSet={TITLE, X_AXIS_TITLE, Y_AXIS_TITLE, SERIES_NAME, TOOL_TIP_FORMATTER,   } ;
        const dataOptionSet={DATA_TOTAL,DATA_TWO,DATA_ONE, SUB_TITLE, X_AXIS_ARRAY};

        return (
            <div className={styles.root}>
                <Histogram baseOptionSet={baseOptionSet} dataOptionSet={dataOptionSet}  containerId="LeftHistogram" width="100%" height="30rem"/>
            </div>
        )
    }
}

export default connect (
    (state,ownProps)=>({
        DATA_TOTAL:getIdCardHistogramData(state.ScbbIdCardRedux,state.ScbbIdcardFormParam,0),
        DATA_ONE:getIdCardHistogramData(state.ScbbIdCardRedux,state.ScbbIdcardFormParam,1),
        DATA_TWO:getIdCardHistogramData(state.ScbbIdCardRedux,state.ScbbIdcardFormParam,2),
        X_AXIS_ARRAY:getIdCardHistogramXAxisArray(state.ScbbIdCardRedux),
        dateAndMember:state.ScbbIdcardFormParam
    }),
    {

    }
)(IdCardHistogram);


