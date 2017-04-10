import {REFRESH_IDCARD_RES_TIME_DATA_SUCCESS} from './ScbbIdCardRedux'
import {getLastMonth,dateToString}  from '../../../../utils/DateUtils'
/**
 * 本reduce临时存储身份证的表单数据
 * @type {string}
 */

/**
 * 表格的分页信息
 */
const initData={
    beginDateStr:dateToString(getLastMonth(new Date())),          //开始时间
    beginDate:getLastMonth(new Date()),
    memberName:'所有商户',        //商户名称
    endDate:new Date(),
    endDateStr:dateToString(new Date()),       //结束时间
};

//3.reducer
//这里的state只是一个局部state,在redux的store中,相当于根root.goods
export default function IdcardFormParam(state = initData, action) {
    switch (action.type) {
        //接口调用成功后重置form仓库的数据
        case REFRESH_IDCARD_RES_TIME_DATA_SUCCESS:
            return {
                beginDateStr:dateToString(action.params.beginDate),
                endDateStr:dateToString(action.params.endDate),
                memberName:action.params.member==''?'所有商户':action.params.member,
                beginDate:action.params.beginDate,
                endDate:action.params.endDate
            }
            return state;
        default:
            return state
    }
}


