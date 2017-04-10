/**
 * 本reduce处理身份证表单查询时的商户下拉列表里的数据
 * @type {string}
 */

//1.静态字段
export const REFRESH_YCBB_IDCARD_SEARCH_AUTOCOMPLETE = 'REFRESH_YCBB_IDCARD_SEARCH_AUTOCOMPLETE';
export const  REFRESH_YCBB_IDCARD_SEARCH_AUTOCOMPLETE_SUCCESS = 'REFRESH_YCBB_IDCARD_SEARCH_AUTOCOMPLETE_SUCCESS';
export const  REFRESH_YCBB_IDCARD_SEARCH_AUTOCOMPLETE_ERROR = 'REFRESH_YCBB_IDCARD_SEARCH_AUTOCOMPLETE_ERROR';

const initData = ['NegativeArraySizeException', 'NoSuchElementException', 'NoSuchMechanismException', 'NullPointerException', 'ProfileDataException', 'ProviderException', 'RasterFormatException',];

//4.reducer,这里的state只是一个局部state,在redux的store中,相当于根root.goods
export default function YcbbIdCardAutoComplete(state = initData, action) {
    switch (action.type) {
        case REFRESH_YCBB_IDCARD_SEARCH_AUTOCOMPLETE:
            console.log('REFRESH_YCBB_IDCARD_SEARCH_AUTOCOMPLETE');
            return state;
        case REFRESH_YCBB_IDCARD_SEARCH_AUTOCOMPLETE_SUCCESS:
            console.log('REFRESH_YCBB_IDCARD_SEARCH_AUTOCOMPLETE_SUCCESS');
            return action.payload;
        case REFRESH_YCBB_IDCARD_SEARCH_AUTOCOMPLETE_ERROR:
            console.log('REFRESH_YCBB_IDCARD_SEARCH_AUTOCOMPLETE_ERROR');
            return state;
        default:
            return state
    }
}







