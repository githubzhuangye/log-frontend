//1.其他静态字段
export const titleNames = ['异常类', '异常内容', '日志ID', '日志发生时间', '操作'];
export const fieldAttributes = ['simpleExceptionClassName', 'exceptionPhrase', 'logId', 'occur_time'];
export const topTitle = `IdCard项目异常报表`;

//2.action静态字段
export const YCBB_IDCARD_DATA = 'YCBB_IDCARD_DATA';
export const YCBB_IDCARD_DATA_SUCCESS = 'YCBB_IDCARD_DATA_SUCCESS';
export const YCBB_IDCARD_DATA_ERROR = 'YCBB_IDCARD_DATA_ERROR';

//3.action创建器

//4.初始化数据
const initData = [

];

//5.reducer
export default function YcbbIdCardReducer(state = initData, action) {
    switch (action.type) {
        case YCBB_IDCARD_DATA:
            console.log('加载loading');
            console.log('YCBB_IDCARD_DATA');
            return state;
        case YCBB_IDCARD_DATA_SUCCESS:
            console.log('loading状态' + action.loading);
            console.log('YCBB_IDCARD_DATA_SUCCESS');
            return action.payload;
        case YCBB_IDCARD_DATA_ERROR:
            console.log('YCBB_IDCARD_DATA_ERROR');
            return state;
        default:
            return state
    }
}






