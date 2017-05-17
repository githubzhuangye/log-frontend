import React from 'react';
import {connect} from 'react-redux'
import {push} from 'react-router-redux'

import {getFormValues} from "redux-form";
import {
    Dialog,
    Snackbar,
    RaisedButton,
    FlatButton,
    Chip
}from 'material-ui'

import {pageSize, getDataByPage} from '../../../consts/TablePageSet'

import {
    getNameFromEnumByValue,
}from '../../../consts/Enums'


import RuleTable from '../common/RuleTable.jsx'
import  MaterialPager from '../../common/MaterialPager.jsx'

import {
    URL_PREFIX,
    URL_YJSZ_CHANNEL_DELETE,
    URL_YJSZ_CHANNEL_PAGE
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

    ACTION_SELECTROW,

    ACTION_DIALOG_OPEN,
    ACTION_DIALOG_CLOSE,

    ACTION_CONNECT_OPEN,
    ACTION_CONNECT_CLOSE,

    ACTION_DRAWER_OPEN,
    ACTION_DRAWER_CLOSE,

    ACTION_ALERT_CLOSE,
    ACTION_ALERT_OPEN,

    ACTION_SNACK_CLOSE,
    ACTION_SNACK_OPEN

} from './redux/Redux'

import {
   getRowAndDataByNum
}from './redux/Redux'


/**
 * 身份证查询的表格
 */
class YjszTable extends React.Component {

    constructor(props) {
        super(props);
        this.clickPager = this.clickPager.bind(this);
        this.openConnectAndShowData = this.openConnectAndShowData.bind(this);
        this.openDrawerAndShowData = this.openDrawerAndShowData.bind(this);
        this.selectRow=this.selectRow.bind(this);
        this.delete=this.delete.bind(this);
    }


    /**
     * 维护当前页码,该页码本组件用于提取数据,传入分页器用于显示页码
     * @param i
     */
    clickPager(i) {
        //旧方法
        // this.props.updatePageNum(i);//请求URL的数据

        //设置参数
        let params = {
            ...this.props.from_select_values,
            ruleSetType:'通道预警',
            pageSize: pageSize,
            currentNum: i//默认查询第一页
        };
        this.props.reqData(params);//请求URL的数据

    }

    //记录或者撤销选中行
    selectRow(rowNum){
        //选择的行数应该是一个数组
        if( ! rowNum instanceof  Array)return;
        let selectedRow={}
        if(rowNum.length<1){
            //置空
            this.props.selectRow(selectedRow)
        }
        //记录row
        selectedRow=getRowAndDataByNum(this.props.page.data,rowNum);
        this.props.selectRow(selectedRow);
    }

    //真实删除数据
    delete() {
        let {data,rule,num}= this.props.selectedRow;
        let param = {
            id: data.id,
            ruleList: [
                {
                    ruleId: rule.ruleId
                }
            ]
        }
        this.props.reqDelete(param);

        //不管删除是否成功,都应该撤销选中效果

        //清除selecedRow
        this.props.selectRow({});

        //延迟重新请求数据
        setTimeout(this.refresh.bind(this),800);
        this.props.closeAlert();

    }

    //重新请求数据
    refresh() {
        let params = {
            ...this.props.from_select_values,
            ruleSetType:'通道预警',
            pageSize: pageSize,
            currentNum: 1//默认查询第一页
        };

        this.props.reqData(params);//请求URL的数据
    }


    //弹窗显示连接窗口
    openConnectAndShowData(row) {
        let connect = {
            status: true,
            title: '添加连接',
            content: row,
            buttonName: '确定'
        };
        this.props.openConnect(connect);
    }

    //显示或者关闭右侧滑动条
    openDrawerAndShowData(context) {
        //如果drawer状态是关的,打开
        if (this.props.drawer.status) {
            this.props.closeDrawer();
        } else {
            let data = {...context.row,...context.rule};
            let drawer = {
                status: true,
                title: '规则详情',
                content: data
            }
            this.props.openDrawer(drawer);
        }
    }


    render() {
        const { page, form,alert } =this.props;
        const pager = <MaterialPager pageSize={page.pageSize} totalCount={page.totalCount} totalCountShow={true} totalPageShow={true} currentNumber={page.currentNum} active={this.clickPager}/>

        const {autoConditionTypes,autoWarningLevels,autoProductStatus,autoElements,autoRuleTypes,autoWarningWays}=this.props.form;
        //获取分页数据
        let TABLE_PAGE_DATA = getDataByPage(page.data, page.currentNum, pageSize);

        //字段样式器
        const TABLE_STYLES = [
            {
                field: 'timeSlot',
                style: (value) => value == 1 ? {color: 'red',} : {}
            },
            {
                field: 'level',
                style: (value) => value == 'urgent' ? {'width':'2rem',height:'0.6rem','padding':'0.5rem','backgroundColor':'#FFC0CB ','borderRadius':'0.5rem'} : {}
            },
        ]

        //字段Enum翻译器
        const TABLE_ENUMS=[
            {
                field:'condition',
                enum:autoConditionTypes
            },
            {
                field:'element',
                enum:autoElements
            },
            {
                field:'level',
                enum:autoWarningLevels
            }
        ]

        //字段格式化器
        const TABLE_FORMATERS = [
            {
                field: 'relation',
                format: (rv,fv,dataObj) => dataObj.row.ruleList.length==1?'无':'且'
            },
            {
                field: 'timeSlot',
                format: (rv,fv,dataObj) => fv + '小时'
            },
        ];

        //字段组件器
        const TABLE_COMPONENTS=[
           {
               field:'noticeMethods',
               component:(value,formatValue,context)=> (
                   value && value.map((v,i)=>
                       <Chip   onClick={()=>{console.log(v);}} key={i}>{  getNameFromEnumByValue(autoWarningWays, v) }</Chip>
                   ))
           },
           {
               field:'ruleId',
               component:(value,formatValue,context)=>
                   <FlatButton  title={formatValue}  secondary={true} onClick={this.openDrawerAndShowData.bind(this,context)} keyboardFocused={true} >{formatValue}</FlatButton>
           },
       ];

        //字段合并器
        const TABLE_MERGES=['relation','noticeMethods','level'];

        return (
            <div style={{'position': 'relative'}}>
                <RuleTable topTitle={TABLE_TOPTITLE} titleNames={TABLE_TITLES} data={TABLE_PAGE_DATA}  fieldAttributes={TABLE_FIELDS}
                           fieldStyles={TABLE_STYLES} fieldEnums={TABLE_ENUMS}  fieldFormats={TABLE_FORMATERS} fieldComponents={TABLE_COMPONENTS}  fieldMerges={TABLE_MERGES}
                           pagerComponent={pager} rowSelection={this.selectRow}
                           rowTailComponents={[
                               <RaisedButton label="关联" primary={true} action={this.openConnectAndShowData} style={{'marginRight': '1rem'}}/>,
                           ]}
                />

                {/*  删除时的alert  */}
                <Dialog actions={[
                    <FlatButton label="取消" primary={true} onTouchTap={this.props.closeAlert}/>,
                    <FlatButton label="确定" primary={true} onTouchTap={this.delete}/>,
                ]} modal={false} open={alert.status} onRequestClose={this.props.closeAlert}>
                    {alert.title}
                </Dialog>
            </div>
        );
    }
}

export default connect(
    (state, ownProps) => ({
        page: state.yjsz_channel_redux.page,
        form: state.yjsz_channel_redux.auto,
        drawer: state.yjsz_channel_redux.drawer,
        alert: state.yjsz_channel_redux.alert,
        selectedRow:state.yjsz_channel_redux.selectedRow,//获取表格选中的行
        from_select_values: getFormValues('form-yjsz/channel/select')(state),   //获取表单的所有values
    }),
    (dispatch, ownProps) => ({
        reqData: (params) => dispatch(
            {
                url: URL_PREFIX + URL_YJSZ_CHANNEL_PAGE,
                params: params,
                types: [ACTION_PAGE, ACTION_PAGE_SUCCESS, ACTION_PAGE_ERROR]
            }
        ),
        reqDelete: (params) => dispatch(
            {
                url: URL_PREFIX + URL_YJSZ_CHANNEL_DELETE,
                params: params,
                types: [ACTION_DELETE, ACTION_DELETE_SUCCESS, ACTION_DELETE_ERROR]
            }
        ),
        openDialog: (dialog) => {
            dispatch({type: ACTION_DIALOG_OPEN, dialog});
            dispatch(push('/log-frontend/yjsz/channel/dialog'));
        },
        openConnect: (connect) => {
            dispatch({type: ACTION_CONNECT_OPEN, connect});
            dispatch(push('/log-frontend/yjsz/channel/connect'));
        },
        openDrawer: (drawer) => {
            dispatch({type: ACTION_DRAWER_OPEN, drawer});
        },
        closeDrawer: () => {
            dispatch({type: ACTION_DRAWER_CLOSE});
        },
        closeAlert: () => dispatch({type: ACTION_ALERT_CLOSE}),
        selectRow:(selectedRow)=>dispatch({type:ACTION_SELECTROW,selectedRow})
    })
)(YjszTable);




