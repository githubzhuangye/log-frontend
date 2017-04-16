import React from 'react';
import {connect} from 'react-redux'

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

import {pageSize, getDataByPage} from '../../../consts/TablePageSet'
import MaterialTable from '../../common/MaterialTable.jsx'
import  MaterialPager from '../../common/MaterialPager.jsx'

import {TABLE_TOPTITLE, TABLE_TITLES, TABLE_FIELDS} from './redux/Redux'


import {
    URL_PREFIX,
    URL_YCBB_IDCARD_PAGE,//分页模式
} from '../../../consts/Urls'


import {
    ACTION_PAGE,
    ACTION_PAGE_SUCCESS,
    ACTION_PAGE_ERROR,
}from './redux/Redux'

/**
 * 身份证查询的表格
 */
class YcbbIdCardTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dialogOpen: false,//弹窗显隐
            dialogContent: ''//弹窗中的内容
        };
        this.clickPager = this.clickPager.bind(this);
        this.handleDialogClose = this.handleDialogClose.bind(this);
        this.handleDialogOpen = this.handleDialogOpen.bind(this);
    }

    /**
     * 维护当前页码,该页码本组件用于提取数据,传入分页器用于显示页码
     * @param i
     */
    clickPager(i) {

        let commitParams = {...this.props.commitParams, currentNum: i};
        this.props.reqData(commitParams);//请求URL的数据

    }

    /**
     * 弹窗显示
     */
    handleDialogOpen = (row) => {
        this.setState({dialogOpen: true, dialogContent: row});

    };

    /**
     * 弹窗关闭
     */
    handleDialogClose = () => {
        this.setState({dialogOpen: false});
    };

    render() {
        const {page, commitParams} =this.props;
        //获取当前页的数据
        let TABLE_PAGE_DATA = getDataByPage(page.data, commitParams.currentNum, pageSize);

        //截取com.xinyan.gateway.common.exception.CreditServiceException  为简单类名
        TABLE_PAGE_DATA = TABLE_PAGE_DATA.map((item) => {
            let newitem = JSON.parse(JSON.stringify(item));
            let s = newitem.exceptionClassName;
            s = s.slice(s.lastIndexOf('.') + 1, s.length);
            newitem.simpleExceptionClassName = s;
            return newitem;
        });

        let totalCount = page.totalCount;
        const pager = <MaterialPager pageSize={pageSize} totalCount={totalCount} totalCountShow={true}
                                     totalPageShow={true} currentNumber={commitParams.currentNum} active={this.clickPager}/>
        return (
            <div>
                <MaterialTable topTitle={TABLE_TOPTITLE} titleNames={TABLE_TITLES} data={TABLE_PAGE_DATA}
                               fieldAttributes={TABLE_FIELDS} pagerComponent={pager}
                               rowTailComponents={[
                                   <RaisedButton label="查看详情" primary={true} action={this.handleDialogOpen}/>
                               ]}
                />
                <Dialog
                    title="异常详情"
                    actions={[
                        <FlatButton label="关闭" primary={true} keyboardFocused={true}
                                    onTouchTap={this.handleDialogClose}/>,
                    ]}
                    modal={false}
                    open={this.state.dialogOpen}
                    onRequestClose={this.handleDialogClose}
                    autoScrollBodyContent={true}
                >
                    <div>
                        <h3>异常内容:</h3>
                        异常类型:{this.state.dialogContent.exceptionClassName}
                        <br/>
                        异常内容:{this.state.dialogContent.exceptionPhrase}
                        <br/>
                        日志ID:{this.state.dialogContent.logId}
                        <br/>
                        发生时间:{this.state.dialogContent.occur_time}
                        <h3>完整异常日志:</h3>
                        {this.state.dialogContent.message}
                        <h3>日志追溯:</h3>
                        <h3>商户请求时日志:</h3>
                        正在施工中...请耐心等待下次版本

                    </div>
                </Dialog>

            </div>
        );
    }
}

export default connect(
    (state, ownProps) => ({
        page: state.ycbb_idcard_redux.page,
        commitParams: state.ycbb_idcard_redux.form.commitParams,//表单信息
    }),
    (dispatch, ownProps) => ({
        reqData: (params) => dispatch(
            {
                url: URL_PREFIX + URL_YCBB_IDCARD_PAGE,
                params: params,
                types: [ACTION_PAGE, ACTION_PAGE_SUCCESS, ACTION_PAGE_ERROR]
            }
        ),
    })
)(YcbbIdCardTable);




