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
    URL_PREFIX,
    URL_YJSZ_RULE_SEARCH,
    URL_YJSZ_RULE_PAGE,

    URL_YJSZ_AUTO_ELEMENTS,
    URL_YJSZ_AUTO_PRODUCT_STATUS,
    URL_YJSZ_AUTO_RULE_TYPE,
    URL_YJSZ_AUTO_WARNING_LEVELS,
    URL_YJSZ_AUTO_CONDITION_TYPES,
    URL_YJSZ_AUTO_WARNING_WAYS,

    URL_YHGL_USER_PAGE,

    URL_YJSZ_RULE_CHANNEL_EXPORT


} from "../../../consts/Urls";
import styles from "./css/SearchForm .css";

import {

    ACTION_PAGE,
    ACTION_PAGE_SUCCESS,
    ACTION_PAGE_ERROR,

    ACTION_SEARCH,
    ACTION_SEARCH_SUCCESS,
    ACTION_SEARCH_ERROR,

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

    ACTION_AUTO_USERINFO,
    ACTION_AUTO_USERINFO_SUCCESS,
    ACTION_AUTO_USERINFO_ERROR

} from "./redux/Redux";

import {
    AutoComplete,
}from 'redux-form-material-ui'

import {
    ProductArray,
    ChannelArray,
    CounterArray
}from '../../../consts/Enums'

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
            ruleSetType:'通道预警',
            pageSize: pageSize,
            currentNum: 1,//默认查询第一页
            ruleList:[
                {
                    ...values
                }
            ],
        };

        this.props.reqSearch(params);//请求URL的数据
    }

    //组件渲染结束
    componentDidMount() {
        //设置参数
        let params = {
            ruleSetType:'通道预警',
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
        this.props.reqUserInfo();
    }

    //导出按钮
    handleExportButton() {
        //this.props.exportData(params);//请求URL的数据
        window.location.href=URL_PREFIX+URL_YJSZ_RULE_CHANNEL_EXPORT+'?ruleSetType=通道预警';
    }

    render() {
        //react-reudux提供的props
        const { autoform}=this.props;
        //redux-form提供的props
        const {error, handleSubmit, reset, submitting, pristine}=this.props;

        //AutoComplete的过滤规则
        const filter = (searchText, key) => searchText == '' || key.indexOf(searchText) !== -1;
        return (
            <div className={styles.root}>

                <div style={{width:'100%',float:'left'}}>
                    <form className={styles.form} style={{float:'left'}} onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
                        <div>
                            <Field name={'ruleId'} component={renderInput} type="text" label={'ID'}   style={{width:'8rem'} } />
                            <Field name={'channel'} component={AutoComplete} filter={filter} openOnFocus={true} dataSource={ChannelArray} floatingLabelText ={'通道名称'} floatingLabelFixed={true}  style={{'marginRight': '2rem','width':'10rem'}} textFieldStyle={{'width':'10rem'}}  fullWidth={false}  menuProps={{maxHeight:300}}  />
                            <Field name={'counter'} component={AutoComplete} filter={filter} openOnFocus={true} dataSource={CounterArray}  floatingLabelText={'柜台名称'}  floatingLabelFixed={true}  style={{'marginRight': '2rem','width':'10rem'}} textFieldStyle={{'width':'10rem'}}  fullWidth={false}  menuProps={{maxHeight:300}} />
                            <Field name={'product'} component={AutoComplete} filter={filter} openOnFocus={true} dataSource={ProductArray}  floatingLabelText={'产品名称'}floatingLabelFixed={true}  style={{'marginRight': '2rem','width':'10rem'}} textFieldStyle={{'width':'10rem'}}  fullWidth={false}  menuProps={{maxHeight:300}}   />
                            <span>
                                <RaisedButton label="重置" primary={true} disabled={pristine || submitting} style={{margin: 12}} onClick={reset}/>
                                <RaisedButton type="submit" label={'查询'} primary={true} disabled={submitting}/>
                                <FlatButton  label={this.state.expand?'关闭':'展开'} primary={true} style={{'marginLeft':'3rem'}} onClick={()=>this.setState({expand:!this.state.expand})} />
                            </span>
                        </div>
                        <div style={{display:this.state.expand?'block':'none'}}>
                            <FieldSelect name="element" floatingLabelText="预警要素" options={this.props.autoform.autoElements} style={{'top': '.9rem', 'marginRight': '2rem', 'width': '12rem'}}/>
                            <FieldSelect name="noticeMethods" floatingLabelText="预警方式" options={this.props.autoform.autoWarningWays} style={{'top': '.9rem', 'marginRight': '2rem', 'width': '12rem'}}/>
                            <FieldSelect name="level" floatingLabelText="预警级别" options={this.props.autoform.autoWarningLevels} style={{'top': '.9rem', 'marginRight': '2rem', 'width': '12rem'}}/>
                            <FieldSelect name="rule" floatingLabelText="预警规则" options={this.props.autoform.autoRuleTypes} style={{'top': '.9rem', 'marginRight': '2rem', 'width': '12rem'}}/>
                            <Field name="timeSlot" component={renderInput} type="text" label="时间段" style={{'width': '10rem'}}/>
                        </div>
                    </form>

                    <div style={{'marginTop': '1rem','textAlign':'right','float':'right'}}>
                        <RaisedButton label="导入" primary={true} style={{margin: 12}} onClick={()=>console.log(1)}/>
                        <RaisedButton label="导出" primary={true} onClick={this.handleExportButton.bind(this)}/>,
                    </div>

                </div>

                <div style={{clear:'both'}}></div>

                <div style={{'marginTop': '1rem',width:'100%', float:'left',}}>
                    <RaisedButton label="添加" primary={true} style={{margin: 12,'float':'left'}} onClick={this.openAddDialog}/>
                    <span style={{float:'right'}}>
                        <RaisedButton label="修改" primary={true} style={{margin: 12}} onClick={this.openUpdateDialog}/>,
                        <RaisedButton label="删除" secondary={true}  onClick={this.openDeleteWindow}/>,
                    </span>
                </div>
                <div style={{clear:'both'}}></div>

            </div>
        );
    }
}

const form = reduxForm({
    form: 'form-yjsz/channel/select',
})(SearchForm)

export default connect(
    (state, ownProps) => ({
        autoform: state.yjsz_channel_redux.auto,
        selectedRow:state.yjsz_channel_redux.selectedRow,//获取表格选中的行
        values: getFormValues('form-yjsz/channel/select')(state),   //获取表单的所有values
    }),
    (dispatch, ownProps) => ({
        reqData: (params) => dispatch(
            {
                url: URL_PREFIX + URL_YJSZ_RULE_PAGE,
                params: params,
                types: [ACTION_PAGE, ACTION_PAGE_SUCCESS, ACTION_PAGE_ERROR]
            }
        ),
        reqSearch: (params) => dispatch(
            {
                url: URL_PREFIX + URL_YJSZ_RULE_SEARCH,
                params: params,
                types: [ACTION_SEARCH,ACTION_SEARCH_SUCCESS,ACTION_SEARCH_ERROR]
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
        reqUserInfo: (params) => dispatch(
            {
                url: URL_PREFIX + URL_YHGL_USER_PAGE,
                params: params,
                types: [ACTION_AUTO_USERINFO,ACTION_AUTO_USERINFO_SUCCESS,ACTION_AUTO_USERINFO_ERROR]
            }
        ),
        openDialog: (dialog) => {
            dispatch({type: ACTION_DIALOG_OPEN, dialog});
            dispatch(push('/log-frontend/yjsz/channel/dialog'));
        },
        openAlert: () => dispatch({type: ACTION_ALERT_OPEN }),
        openSnack:(snack)=>dispatch({type:ACTION_SNACK_OPEN,snack})
    })
)(form);




