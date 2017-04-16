import React from "react";
import {connect} from "react-redux";
import {pageSize, getDataByPage} from "../../../consts/TablePageSet";
import MaterialTable from "../../common/MaterialTable.jsx";
import MaterialPager from "../../common/MaterialPager.jsx";

import {getIdCardTableData ,TABLE_FIELDS,TABLE_TITLES} from "./redux/Redux";


/**
 * 身份证查询的表格
 */
class IdCardTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentNumber: 1,
        };
        this.clickPager = this.clickPager.bind(this);
    }

    /**
     * 维护当前页码,该页码本组件用于提取数据,传入分页器用于显示页码
     * @param i
     */
    clickPager(i) {
        this.setState({currentNumber: i});
    }

    render() {
        const {commitParams, ALL_TABLE_DATA  } =this.props;
        //获取当前页的数据
        let TABLE_PAGE_DATA = getDataByPage(ALL_TABLE_DATA, this.state.currentNumber, pageSize);
        let totalCount=ALL_TABLE_DATA.length;
        let topTitle = `${commitParams.beginDateStr} -- ${commitParams.endDateStr} ${commitParams.memberName} 身份证查询商户返回时长报表`;
        let pager = <MaterialPager pageSize={pageSize} totalCount={totalCount} currentNumber={this.state.currentNumber} active={this.clickPager}/>
        return (
            <div>
                <MaterialTable topTitle={topTitle} titleNames={TABLE_TITLES} data={TABLE_PAGE_DATA}
                               fieldAttributes={TABLE_FIELDS} pagerComponent={pager}
                />
            </div>
        );
    }
}

export default connect(
    (state, ownProps) => ({
        ALL_TABLE_DATA: getIdCardTableData(state.scbb_idcard_redux.data, state.scbb_idcard_redux.form.commitParams),
        commitParams: state.scbb_idcard_redux.form.commitParams
    }),
    {}
)(IdCardTable);

