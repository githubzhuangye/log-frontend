import React from 'react';
import {connect} from 'react-redux'

import FanChart from '../../common/FanChart.jsx'
import {getIdCardFanChartData,FanChart_TITLE,  FanChart_LEGEND_DATA, FanChart_TOOL_TIP_FORMATTER, }from './redux/Redux'
import styles from './css/RightFanChart.css'


/**
 * 身份证查询的扇形图
 */
class IdCardFanChart extends React.Component {

    render() {
        const {commitParams,DATA_TOTAL,}=this.props;

        let SUB_TITLE= `时间:${commitParams.beginDateStr} -- ${commitParams.endDateStr}\n商户:${commitParams.memberName} `;
        const baseOptionSet = {FanChart_TITLE,  FanChart_LEGEND_DATA, FanChart_TOOL_TIP_FORMATTER,};
        const dataOptionSet = {DATA_TOTAL,SUB_TITLE};

        return (
            <div className={styles.root}>
                <FanChart baseOptionSet={baseOptionSet} dataOptionSet={dataOptionSet} containerId="ScbbIdCardRightFanChart" width="100%" height="30rem"/>
            </div>
        )
    }
}

export default connect(
    (state, ownProps) => ({
        DATA_TOTAL: getIdCardFanChartData(state.scbb_idcard_redux.data,state.scbb_idcard_redux.form.commitParams),
        commitParams:state.scbb_idcard_redux.form.commitParams
    }),
    {
    }
)(IdCardFanChart);


