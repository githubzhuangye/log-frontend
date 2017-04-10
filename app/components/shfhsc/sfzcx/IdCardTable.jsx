import React from "react";
import {connect} from "react-redux";
import {pageSize, getDataByPage} from "../../../consts/TablePageSet";
import MaterialTable from "../../common/MaterialTable.jsx";
import MaterialPager from "../../common/MaterialPager.jsx";

import {titleNames, fieldAttributes} from "./redux/IdCardTableConst";
import {getIdCardTableData } from "./redux/ScbbIdCardRedux";


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
        const {dateAndMember, ALL_TABLE_DATA  } =this.props;
        //获取当前页的数据
        let TABLE_PAGE_DATA = getDataByPage(ALL_TABLE_DATA, this.state.currentNumber, pageSize);
        let totalCount=ALL_TABLE_DATA.length;
        let topTitle = `${dateAndMember.beginDateStr} -- ${dateAndMember.endDateStr} ${dateAndMember.memberName} 身份证查询商户返回时长报表`;
        let pager = <MaterialPager pageSize={pageSize} totalCount={totalCount} currentNumber={this.state.currentNumber} active={this.clickPager}/>
        return (
            <div>
                <MaterialTable topTitle={topTitle} titleNames={titleNames} data={TABLE_PAGE_DATA}
                               fieldAttributes={fieldAttributes} pagerComponent={pager}
                />
            </div>
        );
    }
}

export default connect(
    (state, ownProps) => ({
        ALL_TABLE_DATA: getIdCardTableData(state.ScbbIdCardRedux, state.ScbbIdcardFormParam),
        dateAndMember: state.ScbbIdcardFormParam
    }),
    {}
)(IdCardTable);

