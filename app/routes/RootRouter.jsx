import React from "react";
import {Router, Route, IndexRoute} from "react-router";
import {connect} from 'react-redux'
import App from "../App.jsx";

import Jrgc from "../views/Jrgc.jsx";
import {
   ACTION_SNACK_OPEN
}from '../components/global/redux/Redux'

//时长报表
import Scbb from "../views/Scbb.jsx";
import ScbbIdcard from "../components/scbb/idcard/Main.jsx";
import ScbbBankcard from '../components/scbb/bankcard/Main.jsx';
import ScbbMember from '../components/scbb/member/Main.jsx';

//异常报表
import Ycbb from "../views/Ycbb.jsx";
import YcbbIdCard from "../components/ycbb/idcard/Main.jsx"
import YcbbBankCard from "../components/ycbb/bankcard/Main.jsx"
import YcbbMember from "../components/ycbb/member/Main.jsx"

/** 预警设置 */
import Yjsz from '../views/Yjsz.jsx'
//通道预警
import YjszChannel from '../components/yjsz/channel/Main.jsx'
import YjszChannelDialog from '../components/yjsz/channel/YjszDialog.jsx'
import YjszChannelConnect from '../components/yjsz/channel/YjszConnect.jsx'
//商户预警
import YjszMember from '../components/yjsz/member/Main.jsx'
//异常预警
import YjszException from '../components/yjsz/exception/Main.jsx'
import YjszExceptionDialog from '../components/yjsz/exception/YjszDialog.jsx'
import YjszExceptionConnect from '../components/yjsz/exception/YjszConnect.jsx'
//系统预警
import YjszSystem from '../components/yjsz/system/Main.jsx'

/** 系统设置 */
import Yhgl from '../views/Yhgl.jsx'
//用户管理
import YhglUser from '../components/yhgl/user/Main.jsx'
import YhglUserDialog from '../components/yhgl/user/YhDialog.jsx'
//权限管理
import YhglAction from '../components/yhgl/action/Main.jsx'



class RootRouter extends React.Component {

    constructor(props) {
        super(props);
        this.authManager=this.authManager.bind(this);
    }


    //需要管理员级别的验证
    authManager({params}, replace){
        if(!this.props.userInfo || ! this.props.userInfo.name || !this.props.userInfo.roleInfo || !this.props.userInfo.roleInfo.roleName){
            this.props.openSnack('请先登录再访问');
            replace(this.props.path)
            return;
        }
        if(this.props.userInfo.roleInfo.roleName == '管理员' ){
            return
        }else if( this.props.userInfo.roleInfo.roleName == '超级管理员' ){
            return
        }else{
            this.props.openSnack('您的账号不是管理员以上级别')
            replace(this.props.path)
            return;
        }
    }

    render() {
        return (
            <Router {...this.props} >
                {/*  此处设置成和项目文件夹一个名字,保证发布到服务器时URL路径一致  */}
                <Route path="/log-frontend" component={App}>
                    <IndexRoute component={Jrgc}/>

                    {/*  今日观察  */}
                    <Route path="jrgc" component={Jrgc}/>
                    {/*  日志报表  */}
                    <Route path="rzbb">
                        {/*  商户返回时长报表  */}
                        <Route path="scbb" component={Scbb}>
                            <Route path="idcard" component={ScbbIdcard}/>
                            <Route path="bankcard" component={ScbbBankcard}/>
                            <Route path="member" component={ScbbMember}/>
                        </Route>
                        {/*  异常报表  */}
                        <Route path="ycbb" component={Ycbb}>
                            <Route path="idcard" component={YcbbIdCard}/>
                            <Route path="bankcard" component={YcbbBankCard}/>
                            <Route path="member" component={YcbbMember}/>
                        </Route>
                    </Route>
                    {/*  预警设置 */}
                    <Route path="yjsz" component={Yjsz} onEnter={this.authManager}   >
                        {/*  通道预警  */}
                        <Route path="channel" component={YjszChannel}>
                            <Route path="dialog" component={YjszChannelDialog}/>
                            <Route path="connect" component={YjszChannelConnect}/>
                        </Route>
                        {/*  商户预警  */}
                        <Route path="member" component={YjszMember}>
                            <Route path="dialog" />
                            <Route path="connect" />
                        </Route>
                        <Route path="exception" component={YjszException}>
                            <Route path="dialog" components={YjszExceptionDialog}/>
                            <Route path="connect" components={YjszExceptionConnect} />
                        </Route>
                        <Route path="system" component={YjszSystem}>
                        </Route>
                    </Route>

                    {/*  用户管理  */}
                    <Route path="yhgl" component={Yhgl}>
                        {/*  用户管理  */}
                        <Route path="user" component={YhglUser} onEnter={this.authManager}>
                            <Route path="dialog" components={YhglUserDialog} />
                        </Route>
                        <Route path="action" component={YhglAction}>
                        </Route>
                    </Route>
                </Route>
            </Router>
        );
    }
}

export default connect (
    (state,ownProps)=>({
        userInfo: state.global_redux.userInfo,
        path:state.routing.locationBeforeTransitions.pathname
    }),
    (dispatch, ownProps) => ({
        openSnack: (message) => dispatch({type: ACTION_SNACK_OPEN,message})
    })
)(RootRouter);


