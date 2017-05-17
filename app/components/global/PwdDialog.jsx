import React from 'react';
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import { formValueSelector, getFormValues,Field, reduxForm} from "redux-form";

import {pageSize} from '../../consts/TablePageSet'

import * as V from '../../consts/ValidateReduxForm'

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
    URL_YHGL_USER_SETPWD,

} from '../../consts/Urls'



import {
    renderInput,
}from '../common/MaterialForm'

import {

    ACTION_SETPWD,
    ACTION_SETPWD_SUCCESS,
    ACTION_SETPWD_ERROR,

    ACTION_DIALOG_SETPWD_CLOSE
} from './redux/Redux'


/**
 * 修改密码框
 */
class PwdDialog extends React.Component {

    handleSubmit(values) {

        this.props.reqSetPwd({
            ...this.props.userInfo,
            ...values,
            pwd:values.oldpwd+','+values.twopwd
        });

        this.props. closeSetPwd();
    }

    render() {
        const { closeSetPwd,setpwd,} =this.props;
        //获取下拉列表
        //redux-form提供的props
        const {error, handleSubmit, reset, submitting, pristine}=this.props;

        return (
            <div>
                <Dialog title={setpwd.title} actions={[ <FlatButton label="关闭" primary={true} keyboardFocused={true} onTouchTap={closeSetPwd}/>,
                    ]} modal={false} open={setpwd.status} onRequestClose={closeSetPwd} autoScrollBodyContent={true}
                >
                    <div style={{padding: '2.5rem 3.5rem 2.5rem 3.5rem'}}>
                        <form onSubmit={handleSubmit(this.handleSubmit.bind(this))}>

                            <Field name={'oldpwd'} component={renderInput} type="password" floatingLabelText={'原密码'} fullWidth={true} validate={V.REQUIRED} />
                            <Field name={'onepwd'} component={renderInput} type="password" floatingLabelText={'新密码'} fullWidth={true} validate={V.REQUIRED} />
                            <Field name={'twopwd'} component={renderInput} type="password"  floatingLabelText={'再次输入新密码'} fullWidth={true} validate={V.REQUIRED}  />

                            {error && <strong>{error}</strong>}

                            <div style={{'textAlign':'right','marginTop':'1rem'}}>
                                <RaisedButton label="重置" primary={true} disabled={pristine || submitting} style={{margin: 12}} onClick={reset}/>
                                <RaisedButton type="submit" label={setpwd.buttonName} primary={true} disabled={submitting}/>
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
    if(values.onepwd != values.twopwd){
        errors.twopwd=`两次输入密码必须一样`
    }
    return errors;
}


const form = reduxForm({
    form: 'form-global/pwd',
    validate
})(PwdDialog)

export default connect(
    (state, ownProps) => ({
        setpwd:state.global_redux.setpwd,
        userInfo: state.global_redux.userInfo,//初始值
    }),
    (dispatch, ownProps) => ({
        reqSetPwd: (params) => dispatch(
            {
                url: URL_PREFIX + URL_YHGL_USER_SETPWD,
                params: params,
                types: [ACTION_SETPWD,ACTION_SETPWD_SUCCESS,ACTION_SETPWD_ERROR]
            }
        ),
        closeSetPwd: () => {
            dispatch({type: ACTION_DIALOG_SETPWD_CLOSE});
        }
    })
)(form);


