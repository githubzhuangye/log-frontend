import React from "react";
import {Router, Route, IndexRoute} from "react-router";
import App from "../App.jsx";

import Jrgc from "../views/Jrgc.jsx";

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


export default class RootRouter extends React.Component {

    render() {
        return (
            <Router {...this.props} >
                {/*  此处设置成和项目文件夹一个名字,保证发布到服务器时URL路径一致  */}
                <Route path="/log-frontend" component={App}>
                    <IndexRoute component={Jrgc}/>
                    {/*  今日观察  */}
                    <Route path="jrgc" component={Jrgc}/>
                    {/*  日志报表  */}
                    <Route path="rzbb" >
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
                    {/*  系统设置  */}
                    <Route path="xtsz" component={Ycbb}>
                        {/*<Route path="yhgl" component={YcbbSfzcx}/>*/}
                    </Route>
                </Route>
            </Router>
        );
    }
}



