import React from 'react';
import {connect} from 'react-redux'

import FanChart from '../../common/FanChart.jsx'
import {TITLE,  LEGEND_DATA, TOOL_TIP_FORMATTER, } from './redux/IdCardFanChartConst'
import {getIdCardFanChartData}from './redux/ScbbIdCardRedux'
import styles from './css/RightFanChart.css'


/**
 * 身份证查询的扇形图
 */
class IdCardFanChart extends React.Component {

    render() {
        const {dateAndMember,DATA_TOTAL,}=this.props;

        let SUB_TITLE= `时间:${dateAndMember.beginDateStr} -- ${dateAndMember.endDateStr}\n商户:${dateAndMember.memberName} `;
        const baseOptionSet = {TITLE,  LEGEND_DATA, TOOL_TIP_FORMATTER,};
        const dataOptionSet = {DATA_TOTAL,SUB_TITLE};

        return (
            <div className={styles.root}>
                <FanChart baseOptionSet={baseOptionSet} dataOptionSet={dataOptionSet} containerId="RightFanChart" width="100%" height="30rem"/>
            </div>
        )
    }
}

export default connect(
    (state, ownProps) => ({
        DATA_TOTAL: getIdCardFanChartData(state.ScbbIdCardRedux,state.ScbbIdcardFormParam),
        dateAndMember:state.ScbbIdcardFormParam
    }),
    {
    }
)(IdCardFanChart);


