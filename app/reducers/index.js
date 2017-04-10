import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import {reducer as form} from 'redux-form'

//以下是reducer
import goods from '../views/redux/OneRedux'
import goodstype from '../views/redux/TwoRedux'

//时长报表
import ScbbIdCardRedux from '../components/shfhsc/sfzcx/redux/ScbbIdCardRedux'
import ScbbIdCardAutoCompleteRedux from '../components/shfhsc/sfzcx/redux/ScbbIdCardAutoCompleteRedux'
import ScbbIdcardFormParam from '../components/shfhsc/sfzcx/redux/IdCardFormRedux'

//异常报表
import YcbbIdCardAutoCompleteRedux from '../components/ycbb/sfzcx/redux/YcbbIdCardAutoCompleteRedux'
import YcbbIdCardRedux from '../components/ycbb/sfzcx/redux/YcbbIdCardRedux'


const rootReducer =combineReducers({
    goodstype,
    goods,
    routing:routerReducer,
    form,
    ScbbIdCardRedux,
    ScbbIdCardAutoCompleteRedux,
    ScbbIdcardFormParam,
    YcbbIdCardRedux,
    YcbbIdCardAutoCompleteRedux,
});

export default rootReducer;
