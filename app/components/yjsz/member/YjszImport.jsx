import React from 'react';
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import { formValueSelector, getFormValues,Field, reduxForm} from "redux-form";

import {pageSize} from '../../../consts/TablePageSet'

import * as V from '../../../consts/ValidateReduxForm'

import {
    FlatButton,
    Dialog,
    RaisedButton,
    MenuItem,
    Checkbox,
    RadioButtonGroup,
    SelectField,
    TextField,
    Toggle,
    DatePicker
} from 'material-ui'

import {
    URL_PREFIX,
    URL_YJSZ_RULE_UPDATE,
    URL_YJSZ_RULE_PAGE,
    URL_YJSZ_RULE_MEMBER_IMPORT
} from '../../../consts/Urls'


import {
    ACTION_PAGE,
    ACTION_PAGE_SUCCESS,
    ACTION_PAGE_ERROR,

    ACTION_ADD,
    ACTION_ADD_SUCCESS,
    ACTION_ADD_ERROR,

    ACTION_UPDATE,
    ACTION_UPDATE_SUCCESS,
    ACTION_UPDATE_ERROR,

    ACTION_IMPORT_CLOSE,
} from './redux/Redux'


/*renderInput|参数效验*/
const renderInput = ({input, label, floatingLabelText, type, disabled, meta: {touched, error, warning}, ...others}) => (
    <div >
        <TextField {...input} {...others} disabled={disabled} floatingLabelText={floatingLabelText} errorStyle={{color: 'orange'}} errorText={touched && error || warning}/>
    </div>
)

/*renderSelectField|参数效验*/
const renderSelectField = ({ input, label, meta: { touched, error }, children, ...custom }) => (
  <SelectField floatingLabelText={label} errorText={touched && error} {...input} onChange={(event, index, value) => input.onChange(value)} children={children} errorStyle={{color: 'orange'}} {...custom}/>
)


/*  下拉列表  */
const FieldSelect = ({name, floatingLabelText, options, ...others}) => (
    <Field {...others} name={name} component={renderSelectField} floatingLabelText={floatingLabelText}>
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
 * 详细表单
 */
class YjszImport extends React.Component {

    handleSubmit(values) {

        this.props.reqImport(values);

        //延迟重新请求数据
        setTimeout(this.refresh.bind(this),800);

        //重新跳回上一级
        this.props.closeImport();
    }

    //重新请求数据
    refresh(){
        console.log(this.props.from_select_values);
        let params = {
            ...this.props.from_select_values,
            ruleSetType:'商户预警',
            pageSize: pageSize,
            currentNum: this.props.page.currentNum//默认查询第一页
        };
        this.props.reqData(params);//请求URL的数据
    }


    render() {
        const {closeConnect, importDialog, autoform} =this.props;
        //获取下拉列表
        const {autoCacheItem, autoCounterName, autoCacheType}=autoform;
        //redux-form提供的props
        const {error, handleSubmit, reset, submitting, pristine}=this.props;

        //控制表单的使用
        let disabledAtUpdate = importDialog.title == '修改' ?true :false;//弹出修改窗口时不能修改

        //控制表单的显隐
        let hide_in_addmode = importDialog.title== '添加' ?'none' :'inline-block';//创建时间之类的字段在添加时不显示

        return (
            <div>
                <Dialog
                    title={importDialog.title}
                    actions={[
                        <FlatButton label="关闭" primary={true} keyboardFocused={true} onTouchTap={closeConnect}/>,
                    ]}
                    modal={false}
                    open={importDialog.status}
                    onRequestClose={closeConnect}
                    autoScrollBodyContent={true}
                >
                    <div style={{padding: '2.5rem 3.5rem 2.5rem 3.5rem'}}>
                        <form onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
                            <Field name={'ruleId'} component={renderInput} hintText="填写规则ID"  type="text" floatingLabelText={'连接对象'} fullWidth={true}  />
                            {error && <strong>{error}</strong>}
                            <div style={{'textAlign':'right','marginTop':'1rem'}}>
                                <RaisedButton label="重置" primary={true} disabled={pristine || submitting} style={{margin: 12}} onClick={reset}/>
                                <RaisedButton type="submit" label={importDialog.buttonName} primary={true} disabled={submitting}/>
                            </div>
                        </form>
                    </div>
                </Dialog>

            </div>
        );
    }
}


//验证
const validate = values => {
    const errors = {}
    if(!values.ruleId){
        errors.ruleId=`必须填写规则ID`
    }else if (isNaN(Number(values.ruleId))){
        errors.ruleId=`缓存时间必须为数字`
    }else if(values.ruleId.length != 4) {
        errors.ruleId = `只能是4位数字`;
    }
    return errors;
}


const form = reduxForm({
    form: 'form-yjsz/member/import',
    validate
})(YjszImport)

export default connect(
    (state, ownProps) => ({
        autoform: state.yjsz_member_redux.auto,
        importDialog: state.yjsz_member_redux.importDialog,
        initialValues: state.yjsz_member_redux.dialog.content,//初始值
        from_select_values:getFormValues('form-yjsz/member/select')(state),   //获取search表单的所有values
        page:state.yjsz_member_redux.page,
    }),
    (dispatch, ownProps) => ({
        reqData: (params) => dispatch(
            {
                url: URL_PREFIX + URL_YJSZ_RULE_PAGE,
                params: params,
                types: [ACTION_PAGE, ACTION_PAGE_SUCCESS, ACTION_PAGE_ERROR]
            }
        ),
        reqImport: (params) => dispatch(
            {
                url: URL_PREFIX + URL_YJSZ_RULE_MEMBER_IMPORT ,
                params: params,
                types: [ACTION_UPDATE, ACTION_UPDATE_SUCCESS, ACTION_UPDATE_ERROR]
            }
        ),
        closeImport: () => {
            dispatch({type: ACTION_IMPORT_CLOSE});
            dispatch(push('/log-frontend/yjsz/member'));
        }
    })
)(form);


