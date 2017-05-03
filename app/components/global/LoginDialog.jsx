import React from 'react';
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import { formValueSelector, getFormValues,Field, reduxForm} from "redux-form";


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
    URL_YHGL_USER_LOGIN,

} from '../../consts/Urls'

import {
    AutoComplete
}from 'redux-form-material-ui'
import {
    departMentArray
}from '../../consts/Enums'


import {
    renderInput,
}from '../common/MaterialForm'

import {


    ACTION_LOGIN,
    ACTION_LOGIN_SUCCESS,
    ACTION_LOGIN_ERROR,

    ACTION_DIALOG_CLOSE
} from './redux/Redux'


/**
 * 详细表单
 */
class LoginDialog extends React.Component {

    handleSubmit(values) {
        this.props.reqLogin(values);
        this.props.closeDialog();
    }
    closeDialog(){
        this.props.closeDialog();
        //清除窗口原有数据
    }

    render() {
        const {closeDialog, dialog,} =this.props;
        //获取下拉列表
        //redux-form提供的props
        const {error, handleSubmit, reset, submitting, pristine}=this.props;

        return (
            <div>
                <Dialog title={dialog.title} actions={[ <FlatButton label="关闭" primary={true} keyboardFocused={true} onTouchTap={closeDialog}/>,
                    ]} modal={false} open={dialog.status} onRequestClose={closeDialog} autoScrollBodyContent={true}
                >
                    <div style={{padding: '2.5rem 3.5rem 2.5rem 3.5rem'}}>
                        <form onSubmit={handleSubmit(this.handleSubmit.bind(this))} >

                            <Field name={'name'} component={renderInput} type="text" floatingLabelText={'用户名'} fullWidth={true} validate={V.REQUIRED} />
                            <Field name={'pwd'} component={renderInput} type="password"  floatingLabelText={'密码'} fullWidth={true} validate={V.REQUIRED}  />

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
    form: 'form-global/login',
})(LoginDialog)

export default connect(
    (state, ownProps) => ({
        dialog:state.global_redux.dialog
    }),
    (dispatch, ownProps) => ({
        reqLogin: (params) => dispatch(
            {
                url: URL_PREFIX + URL_YHGL_USER_LOGIN,
                params: params,
                types: [ACTION_LOGIN,ACTION_LOGIN_SUCCESS,ACTION_LOGIN_ERROR]
            }
        ),
        closeDialog: () => {
            dispatch({type: ACTION_DIALOG_CLOSE});
        }
    })
)(form);


