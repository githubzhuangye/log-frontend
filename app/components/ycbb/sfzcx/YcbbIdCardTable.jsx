import React from 'react';
import {connect} from 'react-redux'

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

import {pageSize, getDataByPage} from '../../../consts/TablePageSet'
import MaterialTable from '../../common/MaterialTable.jsx'
import  MaterialPager from '../../common/MaterialPager.jsx'

import {topTitle, titleNames, fieldAttributes} from './redux/YcbbIdCardRedux'


/**
 * 身份证查询的表格
 */
class YcbbIdCardTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentNumber: 1,//当前页码
            dialogOpen: false,//弹窗显隐
            dialogContent:''//弹窗中的内容
        };
        this.clickPager = this.clickPager.bind(this);
        this.handleDialogClose=this.handleDialogClose.bind(this);
        this.handleDialogOpen=this.handleDialogOpen.bind(this);
    }

    /**
     * 维护当前页码,该页码本组件用于提取数据,传入分页器用于显示页码
     * @param i
     */
    clickPager(i) {
        this.setState({currentNumber: i});
    }

    /**
     * 弹窗显示
     */
    handleDialogOpen = (row) => {
        this.setState({dialogOpen: true,dialogContent:row});
    };

    /**
     * 弹窗关闭
     */
    handleDialogClose = () => {
        this.setState({dialogOpen: false});
    };

    render() {
        const {YcbbIdCardReducer} =this.props;
        //获取当前页的数据
        let TABLE_PAGE_DATA = getDataByPage(YcbbIdCardReducer, this.state.currentNumber, pageSize);

        //截取com.xinyan.gateway.common.exception.CreditServiceException  为简单类名
        TABLE_PAGE_DATA = TABLE_PAGE_DATA.map((item) => {
            let newitem = JSON.parse(JSON.stringify(item));
            let s = newitem.exceptionClassName;
            s = s.slice(s.lastIndexOf('.') + 1, s.length);
            newitem.simpleExceptionClassName = s;
            return newitem;
        });

        let totalCount = YcbbIdCardReducer.length;
        const pager = <MaterialPager pageSize={pageSize} totalCount={totalCount}
                                     currentNumber={this.state.currentNumber} active={this.clickPager}/>
        return (
            <div>
                <MaterialTable topTitle={topTitle} titleNames={titleNames} data={TABLE_PAGE_DATA}
                               fieldAttributes={fieldAttributes} pagerComponent={pager}
                               rowTailComponents={[
                                   <RaisedButton label="查看详情" primary={true} action={this.handleDialogOpen}/>
                               ]}
                />
                <Dialog
                    title="异常详情"
                    actions={[
                        <FlatButton label="关闭" primary={true} keyboardFocused={true} onTouchTap={this.handleDialogClose} />,
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
        YcbbIdCardReducer: state.YcbbIdCardRedux,
    }),
    {}
)(YcbbIdCardTable);




