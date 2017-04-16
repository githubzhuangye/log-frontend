import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import {reducer as form} from 'redux-form'

//今日观察
import jrgc_redux from '../components/jrgc/redux/Redux'

//时长报表|身份证
import scbb_idcard_redux from '../components/scbb/idcard/redux/Redux'

//时长报表|银行卡
import scbb_bankcard_redux from '../components/scbb/bankcard/redux/Redux'

//异常报表|身份证
import ycbb_idcard_redux from '../components/ycbb/idcard/redux/Redux'

//异常报表|银行卡
import ycbb_bankcard_redux from '../components/ycbb/bankcard/redux/Redux'


const rootReducer = combineReducers({
    routing: routerReducer,
    form,
    //今日观察
    jrgc_redux,

    //时长报表|身份证
    scbb_idcard_redux,

    //时长报表|银行卡
    scbb_bankcard_redux,

    //异常报表|身份证
    ycbb_idcard_redux,

    //异常报表|银行卡
    ycbb_bankcard_redux
});

export default rootReducer;
