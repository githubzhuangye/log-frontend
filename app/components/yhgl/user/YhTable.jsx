import React from 'react';
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import {timeStampToStringHHmmss} from '../../../utils/DateUtils'
import RaisedButton from 'material-ui/RaisedButton';

import { getFormValues} from "redux-form";

import Snackbar from 'material-ui/Snackbar'

import {pageSize, getDataByPage} from '../../../consts/TablePageSet'


import MaterialTable from '../../common/MaterialTable.jsx'
import  MaterialPager from '../../common/MaterialPager.jsx'

import {
    URL_PREFIX,
    URL_YHGL_USER_PAGE
} from '../../../consts/Urls'

import {
    TABLE_FIELDS,
    TABLE_TITLES,
    TABLE_TOPTITLE,

    ACTION_PAGE,
    ACTION_PAGE_SUCCESS,
    ACTION_PAGE_ERROR,

    ACTION_ADD,
    ACTION_ADD_SUCCESS,
    ACTION_ADD_ERROR,

    ACTION_UPDATE,
    ACTION_UPDATE_SUCCESS,
    ACTION_UPDATE_ERROR,

    ACTION_DELETE,
    ACTION_DELETE_SUCCESS,
    ACTION_DELETE_ERROR,

    ACTION_DIALOG_OPEN,
    ACTION_DIALOG_CLOSE,

    ACTION_ALERT_CLOSE,
    ACTION_ALERT_OPEN,

    ACTION_SNACK_CLOSE,
    ACTION_SNACK_OPEN

} from './redux/Redux'
import RefreshIndicator from "material-ui/RefreshIndicator";

/**
 * 身份证查询的表格
 */
class YhTable extends React.Component {

    constructor(props) {
        super(props);
        this.clickPager = this.clickPager.bind(this);
        this.delete = this.delete.bind(this);
        this.openDialogAndShowData = this.openDialogAndShowData.bind(this);
    }


    /**
     * 维护当前页码,该页码本组件用于提取数据,传入分页器用于显示页码
     * @param i
     */
    clickPager(i) {
        //设置参数
        let params = {
            ...this.props.form_select_values,
            pageSize: pageSize,
            currentNum: i//默认查询第一页
        };
        this.props.reqPage(params);//请求URL的数据
    }

    //删除数据
    delete(row) {
        let params = row;
        console.log('row');
        console.log(row);
        this.props.reqDelete(params);
        this.props.closeAlert();
    }

    //弹窗显示数据
    openDialogAndShowData(row) {
        let content={...row,...row.roleInfo};

        let dialog = {
            status: true,
            title: '修改',
            content: content,
            buttonName: '修改'
        };
        this.props.openDialog(dialog);
    }


    render() {
        const {page, } =this.props;
        console.log(page);
        const pager = <MaterialPager pageSize={page.pageSize} totalCount={page.totalCount} totalCountShow={true} totalPageShow={true} currentNumber={page.currentNum} active={this.clickPager}/>

        //获取分页数据
        let TABLE_PAGE_DATA = getDataByPage(page.data, page.currentNum, pageSize);

        let mydata=TABLE_PAGE_DATA.map(t=>({
            ...t,
            ...t.roleInfo
        }))

        //时间格式化
        return (
            <div style={{'position':'relative'}}>
                <MaterialTable topTitle={TABLE_TOPTITLE} titleNames={TABLE_TITLES} data={mydata}
                               fieldAttributes={TABLE_FIELDS} pagerComponent={pager}
                               rowTailComponents={[
                                   <RaisedButton label="显示详情" primary={true} action={this.openDialogAndShowData} style={{'marginRight': '1rem'}}/>,
                               ]}
                />

            </div>
        );
    }
}

export default connect(
    (state, ownProps) => ({
        page: state.yhgl_user_redux.page,
        alert: state.yhgl_user_redux.alert,
        form_select_values: getFormValues('form-yhgl/user/select')(state),   //获取表单的所有values
    }),
    (dispatch, ownProps) => ({
        reqPage: (params) => dispatch(
            {
                url: URL_PREFIX +URL_YHGL_USER_PAGE ,
                params: params,
                types: [ACTION_PAGE, ACTION_PAGE_SUCCESS, ACTION_PAGE_ERROR]
            }
        ),
        openDialog: (dialog) => {
            dispatch({type: ACTION_DIALOG_OPEN, dialog});
            dispatch(push('/log-frontend/yhgl/user/dialog'));
        },
        openAlert: (row) => dispatch({type: ACTION_ALERT_OPEN, row}),
        closeAlert: () => dispatch({type: ACTION_ALERT_CLOSE}),
        closeSnack: () => dispatch({type: ACTION_SNACK_CLOSE}),
    })
)(YhTable);




