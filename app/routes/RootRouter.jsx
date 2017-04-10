import React from "react";
import {Router, Route, IndexRoute} from "react-router";
import App from "../App.jsx";
import One from "../views/One.jsx";
import OneDetail from "../views/OneDetail.jsx";

import Jrgc from "../views/Jrgc.jsx";

import Shfhsc from "../views/Shfhsc.jsx";
import ShfhscSfzcx from "../components/shfhsc/sfzcx/SfzcxContent.jsx";
import Shcx from "../components/shfhsc/shcx/ShcxContent.jsx";
import Yhqcx from "../components/shfhsc/yhqcx/YhqcxContent.jsx";

import Ycbb from "../views/Ycbb.jsx";
import YcbbSfzcx from "../components/ycbb/sfzcx/YcbbIdCardContent.jsx"


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
                        <Route path="shfhsc" component={Shfhsc}>
                            <Route path="sfzcx" component={ShfhscSfzcx}/>
                            <Route path="shcx" component={Shcx}/>
                            <Route path="yhqcx" component={Yhqcx}/>
                        </Route>
                        {/*  异常报表  */}
                        <Route path="ycbb" component={Ycbb}>
                            <Route path="sfzcx" component={YcbbSfzcx}/>
                            <Route path="shcx" component={Shcx}/>
                            <Route path="yhqcx" component={Yhqcx}/>
                        </Route>
                    </Route>
                    {/*  系统设置  */}
                    <Route path="xtsz" component={One}>
                        <Route path="yhgl" component={OneDetail}/>
                    </Route>
                </Route>
            </Router>
        );
    }
}



