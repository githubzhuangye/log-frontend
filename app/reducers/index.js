import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import {reducer as form} from 'redux-form'

//全局数据,比如用户数据,放在这里
import global_redux from '../components/global/redux/Redux'

//今日观察
import jrgc_redux from '../components/jrgc/redux/Redux'

//实时监控
import ssjk_redux from '../components/ssjk/redux/Redux'

//时长报表|身份证
import scbb_idcard_redux from '../components/scbb/idcard/redux/Redux'

//时长报表|银行卡
import scbb_bankcard_redux from '../components/scbb/bankcard/redux/Redux'

//异常报表|身份证
import ycbb_idcard_redux from '../components/ycbb/idcard/redux/Redux'

//异常报表|银行卡
import ycbb_bankcard_redux from '../components/ycbb/bankcard/redux/Redux'

//预警设置
import yjsz_channel_redux from '../components/yjsz/channel/redux/Redux'
import yjsz_member_redux from '../components/yjsz/member/redux/Redux'
import yjsz_exception_redux from '../components/yjsz/exception/redux/Redux'

//用户管理
import yhgl_user_redux from '../components/yhgl/user/redux/Redux'

const rootReducer = combineReducers({
    routing: routerReducer,
    form,

    //全局数据
    global_redux,

    //今日观察
    jrgc_redux,

    //实时监控
    ssjk_redux,

    //时长报表|身份证
    scbb_idcard_redux,

    //时长报表|银行卡
    scbb_bankcard_redux,

    //异常报表|身份证
    ycbb_idcard_redux,

    //异常报表|银行卡
    ycbb_bankcard_redux,

    //预警设置
    //渠道预警设置
    yjsz_channel_redux,
    //商户预警设置
    yjsz_member_redux,
    //异常预警设置
    yjsz_exception_redux,

    //用户管理
    yhgl_user_redux,


});

export default rootReducer;
