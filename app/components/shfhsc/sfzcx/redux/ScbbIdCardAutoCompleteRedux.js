/**
 * 本reduce处理身份证表单查询时的商户下拉列表里的数据
 * @type {string}
 */

//1.静态字段
export const REFRESH_SCBB_IDCARD_SEARCH_AUTOCOMPLETE = 'REFRESH_SCBB_IDCARD_SEARCH_AUTOCOMPLETE';
export const  REFRESH_IDCARD_SEARCH_AUTOCOMPLETE_SUCCESS = 'REFRESH_IDCARD_SEARCH_AUTOCOMPLETE_SUCCESS';
export const  REFRESH_IDCARD_SEARCH_AUTOCOMPLETE_ERROR = 'REFRESH_IDCARD_SEARCH_AUTOCOMPLETE_ERROR';

const initData = ['鹏元征信', '前海征信', '新颜征信','宝付支付','abc','cse','sgga','hello','world','safe','douck','double'];

//4.reducer,这里的state只是一个局部state,在redux的store中,相当于根root.goods
export default function ScbbIdCardAutoCompleteRedux(state = initData, action) {
    switch (action.type) {
        case REFRESH_SCBB_IDCARD_SEARCH_AUTOCOMPLETE:
            console.log('REFRESH_SCBB_IDCARD_SEARCH_AUTOCOMPLETE');
            return state;
        case REFRESH_IDCARD_SEARCH_AUTOCOMPLETE_SUCCESS:
            console.log('REFRESH_IDCARD_SEARCH_AUTOCOMPLETE_SUCCESS');
            return action.payload;
        case REFRESH_IDCARD_SEARCH_AUTOCOMPLETE_ERROR:
            console.log('REFRESH_IDCARD_SEARCH_AUTOCOMPLETE_ERROR');
            return state;
        default:
            return state
    }
}







