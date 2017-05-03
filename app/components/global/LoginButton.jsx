import React from 'react';
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {
    FlatButton,
    IconMenu,
    IconButton,
    MenuItem
}from 'material-ui'

import {
    ACTION_DIALOG_OPEN,
    ACTION_DIALOG_SETPWD_OPEN,
    ACTION_LOGIN_OUT
}from './redux/Redux'


/**
 * 简单react组件
 */
class LoginButton extends React.Component {


    //打开登陆窗口
    openLoginDialog() {
        let dialog = {
            status: true,
            title: '登录',
            content: {},
            buttonName: '登录'
        };
        this.props.openDialog(dialog);
    }

    //打开修改喵喵窗口
    openSetPwdDialog() {
        let setpwd = {
            status: true,
            title: '修改密码',
            content: {},
            buttonName: '修改密码'
        };
        this.props.openSetPwdDialog(setpwd);

    }

    //登出
    loginout(){
        this.props.loginout();
    }


    render() {
        const {userInfo}=this.props;
        return (
            userInfo && userInfo.id && userInfo.name ?
                <span><span>欢迎, {userInfo.name}</span>
                    <IconMenu  iconButtonElement={ <IconButton><MoreVertIcon /></IconButton> }
                              targetOrigin={{horizontal: 'right', vertical: 'top'}}
                              anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                    >
                        <MenuItem primaryText="修改密码" onClick={this.openSetPwdDialog.bind(this)}/>
                        <MenuItem primaryText="登出" onClick={this.loginout.bind(this)} />
                    </IconMenu>
                </span>
                :
                <FlatButton label="登录" onClick={this.openLoginDialog.bind(this)}/>
        );
    }
}

export default connect(
    (state, ownProps) => ({
        userInfo: state.global_redux.userInfo
    }),
    (dispatch, ownProps) => ({
        openDialog: (dialog) => {
            dispatch({type: ACTION_DIALOG_OPEN, dialog});
        },
        openSetPwdDialog: (setpwd) => {
            dispatch({type: ACTION_DIALOG_SETPWD_OPEN, setpwd});
        },
        loginout:()=>{
            dispatch({type:ACTION_LOGIN_OUT})
        }
    })
)(LoginButton);







