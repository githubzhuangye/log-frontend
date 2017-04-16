import React from 'react';

import Histogram from '../../common/Histogram.jsx'

import {connect} from 'react-redux'

import {getBankCardHistogramData,getBankCardHistogramXAxisArray,Histogram_TITLE,Histogram_X_AXIS_TITLE,Histogram_Y_AXIS_TITLE,Histogram_SERIES_NAMES,Histogram_TOOL_TIP_FORMATTER} from './redux/Redux'
import styles from './css/LeftHistogram.css'




/**
 * 身份证查询的柱状图
 */
class BankCardHistogram extends React.Component {

    render() {
        const {X_AXIS_ARRAY,DATA_ONE,commitParams}=this.props;

        let SUB_TITLE= `时间:${commitParams.beginDateStr} -- ${commitParams.endDateStr}\n商户:${commitParams.memberName} `;
        const baseOptionSet={  Histogram_TITLE,Histogram_X_AXIS_TITLE,Histogram_Y_AXIS_TITLE,Histogram_SERIES_NAMES,Histogram_TOOL_TIP_FORMATTER     } ;
        const DATA=[DATA_ONE,];//一共有3个视图
        const dataOptionSet={X_AXIS_ARRAY,DATA, SUB_TITLE, };

        return (
            <div className={styles.root}>
                <Histogram baseOptionSet={baseOptionSet} dataOptionSet={dataOptionSet}  containerId="ScbbBankCardLeftHistogram" width="100%" height="30rem"/>
            </div>
        )
    }
}

export default connect (
    (state,ownProps)=>({
        DATA_ONE:getBankCardHistogramData(state.scbb_bankcard_redux.data,state.scbb_bankcard_redux.form.commitParams,0),
        X_AXIS_ARRAY:getBankCardHistogramXAxisArray(state.scbb_bankcard_redux.data),
        commitParams:state.scbb_bankcard_redux.form.commitParams
    }),
    {

    }
)(BankCardHistogram);


