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
    URL_YHGL_USER_INSERT,
    URL_YHGL_USER_PAGE,
    URL_YHGL_USER_UPDATE
} from '../../../consts/Urls'

import {
    AutoComplete
}from 'redux-form-material-ui'
import {
    departMentArray
}from '../../../consts/Enums'


import {
    renderInput,
    FieldSelect
}from '../../common/MaterialForm'

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

    ACTION_DIALOG_CLOSE
} from './redux/Redux'


import {
   RoleEnum
} from '../../../consts/Enums'


/**
 * 详细表单
 */
class YhDialog extends React.Component {

    handleSubmit(values) {
        let params={
            ...values,
            roleInfo:{
                roleName:values.roleName
            }
        }
        if (this.props.dialog.title == '添加') {
            this.props.reqAdd({...params,pwd:'123456'});
        } else {
            this.props.reqUpdate(params);
        }

        //延迟重新请求数据
        setTimeout(this.refresh.bind(this),800);
        this.props.closeDialog();

    }

    //重新请求数据
    refresh(){
        let params = {
            ...this.props. form_select_values,
            pageSize: pageSize,
            currentNum: 1//默认查询第一页
        };
        this.props.reqPage(params);//请求URL的数据
    }


    render() {
        const {closeDialog, dialog,} =this.props;
        //获取下拉列表
        //redux-form提供的props
        const {error, handleSubmit, reset, submitting, pristine}=this.props;

        //控制表单的使用
        let disabledAtUpdate = dialog.title == '修改' ?true :false;//弹出修改窗口时不能修改

        //控制表单的显隐
        let hide_in_addmode = dialog.title== '添加' ?'none' :'inline-block';//创建时间之类的字段在添加时不显示

        //AutoComplete的过滤规则
        const filter = (searchText, key) => searchText == '' || key.indexOf(searchText) !== -1;
        return (
            <div>
                <Dialog title={dialog.title} actions={[ <FlatButton label="关闭" primary={true} keyboardFocused={true} onTouchTap={closeDialog}/>,
                    ]} modal={false} open={true} onRequestClose={closeDialog} autoScrollBodyContent={true}
                >
                    <div style={{padding: '2.5rem 3.5rem 2.5rem 3.5rem'}}>
                        <form onSubmit={handleSubmit(this.handleSubmit.bind(this))}>

                            <Field name={'name'} component={renderInput} type="text" floatingLabelText={'用户名'} fullWidth={true} validate={[V.REQUIRED]} />
                            <Field name={'email'} component={renderInput} type="text"  floatingLabelText={'邮箱'} validate={[V.REQUIRED,V.EMAIL]} fullWidth={true}  />
                            <Field name={'mobile'} component={renderInput} type="text" floatingLabelText={'手机'} validate={[V.REQUIRED,V.MOBILE]} fullWidth={true}  />
                            <Field name={'departMentName'} component={AutoComplete} filter={filter} openOnFocus={true} dataSource={departMentArray} floatingLabelText ={'部门名称'}  floatingLabelFixed={false} fullWidth={true}/>
                            <FieldSelect name="roleName" label="角色" options={RoleEnum} fullWidth={true}  />

                            {error && <strong>{error}</strong>}

                            <div style={{'textAlign':'right','marginTop':'1rem'}}>
                                <RaisedButton label="重置" primary={true} disabled={pristine || submitting} style={{margin: 12}} onClick={reset}/>
                                <RaisedButton type="submit" label={dialog.buttonName} primary={true} disabled={submitting}/>
                            </div>
                        </form>
                    </div>
                </Dialog>

            </div>
        );
    }
}



const form = reduxForm({
    form: 'form-yhgl/user/dialog',
})(YhDialog)

export default connect(
    (state, ownProps) => ({
        dialog: state.yhgl_user_redux.dialog,
        initialValues: state.yhgl_user_redux.dialog.content,//初始值
        form_select_values:getFormValues('form-yhgl/user/select')(state),   //获取search表单的所有values
        page:state.yhgl_user_redux.page,
    }),
    (dispatch, ownProps) => ({
        reqPage: (params) => dispatch(
            {
                url: URL_PREFIX + URL_YHGL_USER_PAGE,
                params: params,
                types: [ACTION_PAGE, ACTION_PAGE_SUCCESS, ACTION_PAGE_ERROR]
            }
        ),
        reqAdd: (params) => dispatch(
            {
                url: URL_PREFIX + URL_YHGL_USER_INSERT,
                params: params,
                types: [ACTION_ADD, ACTION_ADD_SUCCESS, ACTION_ADD_ERROR]
            }
        ),
        reqUpdate: (params) => dispatch(
            {
                url: URL_PREFIX + URL_YHGL_USER_UPDATE,
                params: params,
                types: [ACTION_UPDATE, ACTION_UPDATE_SUCCESS, ACTION_UPDATE_ERROR]
            }
        ),
        closeDialog: () => {
            dispatch({type: ACTION_DIALOG_CLOSE});
            dispatch(push('/log-frontend/yhgl/user'));
        }
    })
)(form);


