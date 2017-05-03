import React from "react";
import {Field, reduxForm, getFormValues} from "redux-form";
import {connect} from "react-redux";
import {push} from 'react-router-redux'
import {pageSize} from "../../../consts/TablePageSet";


import {
    FlatButton,
    Dialog,
    RaisedButton,
    FloatingActionButton ,
    MenuItem,
    Checkbox,
    RadioButtonGroup,
    SelectField,
    TextField,
    Toggle,
    DatePicker,
    IconButton
} from 'material-ui'

import {
    AutoComplete,
}from 'redux-form-material-ui'

import {
    URL_PREFIX,
    URL_YJSZ_CHANNEL_PAGE,

    URL_YJSZ_AUTO_ELEMENTS,
    URL_YJSZ_AUTO_PRODUCT_STATUS,
    URL_YJSZ_AUTO_RULE_TYPE,
    URL_YJSZ_AUTO_WARNING_LEVELS,
    URL_YJSZ_AUTO_CONDITION_TYPES,
    URL_YJSZ_AUTO_WARNING_WAYS,
    URL_YHGL_USER_PAGE,

    URL_YCBB_IDCARD_EXCEPTTYPES   ,
    URL_YCBB_IDCARD_EXCEPTCONTENTS,

} from "../../../consts/Urls";
import styles from "./css/SearchForm .css";

import {

    ACTION_PAGE,
    ACTION_PAGE_SUCCESS,
    ACTION_PAGE_ERROR,

    ACTION_DIALOG_OPEN,
    ACTION_ALERT_OPEN,

    ACTION_SNACK_OPEN,

    ACTION_AUTO,
    ACTION_AUTO_SUCCESS,
    ACTION_AUTO_ERROR,

    ACTION_AUTO_WARNING_WAYS,
    ACTION_AUTO_WARNING_WAYS_SUCCESS,
    ACTION_AUTO_WARNING_WAYS_ERROR,

    ACTION_AUTO_RULE_TYPE,
    ACTION_AUTO_RULE_TYPE_SUCCESS,
    ACTION_AUTO_RULE_TYPE_ERROR,

    ACTION_AUTO_ELEMENTS,
    ACTION_AUTO_ELEMENTS_SUCCESS,
    ACTION_AUTO_ELEMENTS_ERROR,

    ACTION_AUTO_PRODUCT_STATUS,
    ACTION_AUTO_PRODUCT_STATUS_SUCCESS,
    ACTION_AUTO_PRODUCT_STATUS_ERROR,

    ACTION_AUTO_WARNING_LEVELS,
    ACTION_AUTO_WARNING_LEVELS_SUCCESS,
    ACTION_AUTO_WARNING_LEVELS_ERROR,

    ACTION_AUTO_CONDITION_TYPES,
    ACTION_AUTO_CONDITION_TYPES_SUCCESS,
    ACTION_AUTO_CONDITION_TYPES_ERROR,

    ACTION_AUTO_ONE,
    ACTION_AUTO_ONE_SUCCESS,
    ACTION_AUTO_ONE_ERROR,

    ACTION_AUTO_TWO,
    ACTION_AUTO_TWO_SUCCESS,
    ACTION_AUTO_TWO_ERROR,

    ACTION_AUTO_USERINFO,
    ACTION_AUTO_USERINFO_SUCCESS,
    ACTION_AUTO_USERINFO_ERROR
} from "./redux/Redux";


/*renderInput|参数效验*/
const renderInput = ({input, label, type, meta: {touched, error, warning}}) => (
    <div className={styles.inlineField}>
        <TextField {...input} floatingLabelText={label}floatingLabelFixed={true} floatingLabelStyle ={{fontSize:'18px'}} errorStyle={{color: 'orange'}}
                   errorText={touched && ((error && {error}) || (warning && {warning}))} style={{'width': '10rem'}}/>
    </div>
)

/*renderSelectField|参数效验*/
const renderSelectField = ({input, label, meta: {touched, error}, children, ...custom}) => (
    <SelectField floatingLabelText={label} floatingLabelFixed={true} floatingLabelStyle ={{fontSize:'18px'}} errorText={touched && error} {...input}
                 onChange={(event, index, value) => input.onChange(value)} children={children}
                 errorStyle={{color: 'orange'}} {...custom}/>
)


/*  下拉列表  */
const FieldSelect = ({name, floatingLabelText, options, ...others}) => (
    <Field {...others} name={name} component={renderSelectField} floatingLabelText={floatingLabelText}>
        <MenuItem value={null} primaryText={'选择全部'}/>
        {
            options.map((item, i) => {
                return (
                    <MenuItem value={item.value} primaryText={item.name} key={i}/>
                )
            })
        }
    </Field>
)


/**
 * 查询表单,\
 * 因为控件已经有了很强的参数效验,所以不需要使用redux-form了
 */
class SearchForm extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            expand:false //关闭或者展开
        };
        this.openDeleteWindow=this.openDeleteWindow.bind(this);
        this.openAddDialog=this.openAddDialog.bind(this);
        this.openUpdateDialog=this.openUpdateDialog.bind(this);
    }


    //打开添加窗口
    openAddDialog() {
        let dialog = {
            status: true,
            title: '添加',
            content: {},
            buttonName: '添加'
        };
        this.props.openDialog(dialog);
    }

    //打开修改窗口
    openUpdateDialog() {
        if(!this.props.selectedRow || !this.props.selectedRow.rule){
            this.props.openSnack({status:true,message:'需要选中一行才能操作',color: '#FF4081'})
            return
        }
        let sr=this.props.selectedRow;
        let row={...sr.data,...sr.rule};
        let dialog = {
            status: true,
            title: '修改',
            content: row,
            buttonName: '修改'
        };
        this.props.openDialog(dialog);
    }

    //打开删除窗口
    openDeleteWindow() {
        if(!this.props.selectedRow || !this.props.selectedRow.rule){
            this.props.openSnack({status:true,message:'需要选中一行才能操作',color: '#FF4081'})
            return
        }
        this.props.openAlert();
    }

    //提交查询
    handleSubmit(values) {
        //设置参数
        let params = {
            ...values,
            ruleSetType:'异常预警',
            pageSize: pageSize,
            currentNum: 1//默认查询第一页
        };

        this.props.reqData(params);//请求URL的数据
    }

    //组件渲染结束
    componentDidMount() {
        //设置参数
        let params = {
            ruleSetType:'异常预警',
            pageSize: pageSize,
            currentNum: 1//默认查询第一页
        };
        this.props.reqData(params);//请求URL的数据

        //获取下拉列表的数据
        this.props.reqWarningWays();
        this.props.reqRuleTypes();
        this.props.reqElements();
        this.props.reqProductStatus();
        this.props.reqWarningLevels();
        this.props.reqConditionTypes();
        this.props.reqExceptionType();
        this.props.reqExceptionContent();
        this.props.reqUserInfo();
    }

    render() {
        //react-reudux提供的props
        const { auto}=this.props;
        //redux-form提供的props
        const {error, handleSubmit, reset, submitting, pristine}=this.props;

        //AutoComplete的过滤规则
        const filter = (searchText, key) => searchText == '' || key.indexOf(searchText) !== -1;
        return (
            <div className={styles.root}>
                <form className={styles.form} onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
                    <div>
                        <Field name="exceptionType" component={renderInput} type="text" label="异常类型" style={{'width': '10rem'}}/>
                        <Field name="exceptionContent" component={renderInput} type="text" label="异常名称" style={{'width': '10rem'}}/>
                        <Field name="productName" component={renderInput} type="text" label="产品名称" style={{'width': '10rem'}}/>
                        <FieldSelect name="productStatus" floatingLabelText="产品状态" options={auto.autoProductStatus} style={{'top': '.9rem', 'marginRight': '2rem', 'width': '12rem'}}/>
                        <span>
                            <RaisedButton label="重置" primary={true} disabled={pristine || submitting} style={{margin: 12}} onClick={reset}/>
                            <RaisedButton type="submit" label={'查询'} primary={true} disabled={submitting}/>
                            <FlatButton  label={this.state.expand?'关闭':'展开'} primary={true} style={{'marginLeft':'3rem'}} onClick={()=>this.setState({expand:!this.state.expand})} />
                        </span>
                    </div>
                    <div style={{display:this.state.expand?'block':'none'}}>
                        <FieldSelect name="element" floatingLabelText="预警要素" options={auto.autoElements} style={{'top': '.9rem', 'marginRight': '2rem', 'width': '12rem'}}/>
                        <FieldSelect name="noticeMethods" floatingLabelText="预警方式" options={auto.autoWarningWays} style={{'top': '.9rem', 'marginRight': '2rem', 'width': '12rem'}}/>
                        <FieldSelect name="level" floatingLabelText="预警级别" options={auto.autoWarningLevels} style={{'top': '.9rem', 'marginRight': '2rem', 'width': '12rem'}}/>
                        <FieldSelect name="rule" floatingLabelText="预警规则" options={auto.autoRuleTypes} style={{'top': '.9rem', 'marginRight': '2rem', 'width': '12rem'}}/>
                        <Field name="timeSlot" component={renderInput} type="text" label="时间段" style={{'width': '10rem'}}/>
                    </div>

                    <div className={styles.right} style={{'top': '2.2rem'}}>
                        <RaisedButton label="添加" primary={true} style={{margin: 12}} onClick={this.openAddDialog}/>
                        <RaisedButton label="修改" primary={true} style={{margin: 12}} onClick={this.openUpdateDialog}/>,
                        <RaisedButton label="删除" secondary={true} onClick={this.openDeleteWindow}/>,
                    </div>
                </form>

            </div>
        );
    }
}

const form = reduxForm({
    form: 'form-yjsz/exception/select',
})(SearchForm)

export default connect(
    (state, ownProps) => ({
        auto: state.yjsz_exception_redux.auto,
        selectedRow:state.yjsz_exception_redux.selectedRow,//获取表格选中的行
        values: getFormValues('form-yjsz/exception/select')(state),   //获取表单的所有values
    }),
    (dispatch, ownProps) => ({
        reqData: (params) => dispatch(
            {
                url: URL_PREFIX + URL_YJSZ_CHANNEL_PAGE,
                params: params,
                types: [ACTION_PAGE, ACTION_PAGE_SUCCESS, ACTION_PAGE_ERROR]
            }
        ),
        reqWarningWays: (params) => dispatch(
            {
                url: URL_PREFIX + URL_YJSZ_AUTO_WARNING_WAYS,
                params: params,
                types: [ACTION_AUTO_WARNING_WAYS,ACTION_AUTO_WARNING_WAYS_SUCCESS,ACTION_AUTO_WARNING_WAYS_ERROR]
            }
        ),
        reqRuleTypes: (params) => dispatch(
            {
                url: URL_PREFIX + URL_YJSZ_AUTO_RULE_TYPE,
                params: params,
                types: [ACTION_AUTO_RULE_TYPE,ACTION_AUTO_RULE_TYPE_SUCCESS,ACTION_AUTO_RULE_TYPE_ERROR]
            }
        ),
        reqElements: (params) => dispatch(
            {
                url: URL_PREFIX + URL_YJSZ_AUTO_ELEMENTS,
                params: params,
                types: [ACTION_AUTO_ELEMENTS,ACTION_AUTO_ELEMENTS_SUCCESS,ACTION_AUTO_ELEMENTS_ERROR]
            }
        ),
        reqProductStatus: (params) => dispatch(
            {
                url: URL_PREFIX + URL_YJSZ_AUTO_PRODUCT_STATUS,
                params: params,
                types: [ACTION_AUTO_PRODUCT_STATUS,ACTION_AUTO_PRODUCT_STATUS_SUCCESS,ACTION_AUTO_PRODUCT_STATUS_ERROR]
            }
        ),
        reqWarningLevels: (params) => dispatch(
            {
                url: URL_PREFIX + URL_YJSZ_AUTO_WARNING_LEVELS,
                params: params,
                types: [ACTION_AUTO_WARNING_LEVELS,ACTION_AUTO_WARNING_LEVELS_SUCCESS,ACTION_AUTO_WARNING_LEVELS_ERROR]
            }
        ),
        reqConditionTypes: (params) => dispatch(
            {
                url: URL_PREFIX + URL_YJSZ_AUTO_CONDITION_TYPES,
                params: params,
                types: [ACTION_AUTO_CONDITION_TYPES,ACTION_AUTO_CONDITION_TYPES_SUCCESS,ACTION_AUTO_CONDITION_TYPES_ERROR]
            }
        ),
        reqExceptionType: (params) => dispatch(
            {
                url: URL_PREFIX + URL_YCBB_IDCARD_EXCEPTTYPES,
                params: params,
                types: [ACTION_AUTO_ONE,ACTION_AUTO_ONE_SUCCESS,ACTION_AUTO_ONE_ERROR]
            }
        ),
        reqExceptionContent: (params) => dispatch(
            {
                url: URL_PREFIX + URL_YCBB_IDCARD_EXCEPTCONTENTS,
                params: params,
                types: [ACTION_AUTO_TWO,ACTION_AUTO_TWO_SUCCESS,ACTION_AUTO_TWO_ERROR]
            }
        ),
        reqUserInfo: (params) => dispatch(
            {
                url: URL_PREFIX + URL_YHGL_USER_PAGE,
                params: params,
                types: [ACTION_AUTO_USERINFO,ACTION_AUTO_USERINFO_SUCCESS,ACTION_AUTO_USERINFO_ERROR]
            }
        ),
        openDialog: (dialog) => {
            dispatch({type: ACTION_DIALOG_OPEN, dialog});
            dispatch(push('/log-frontend/yjsz/exception/dialog'));
        },
        openAlert: () => dispatch({type: ACTION_ALERT_OPEN }),
        openSnack:(snack)=>dispatch({type:ACTION_SNACK_OPEN,snack})
    })
)(form);




