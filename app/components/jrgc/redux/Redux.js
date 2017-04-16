
//1.其他静态字段
//2.action静态字段
export const ACTION_JRTT='jrgc/ACTION_JRTT';
export const ACTION_JRTT_SUCCESS='jrgc/ACTION_JRTT_SUCCESS';
export const ACTION_JRTT_ERROR='jrgc/ACTION_JRTT_ERROR';

export const ACTION_YCZS='jrgc/ACTION_YCZS';
export const ACTION_YCZS_SUCCESS='jrgc/ACTION_YCZS_SUCCESS';
export const ACTION_YCZS_ERROR='jrgc/ACTION_YCZS_ERROR';

//3.action创建器
//4.初始化数据
const initData = {
    jrttData:[],//今日头条的列表数据
    yczs:0,//异常指数
};

//5.reducer
export default function Redux(state = initData, action) {
    switch (action.type) {
        //今日头条的列表数据
        case ACTION_JRTT:
            console.log(ACTION_JRTT);
            return state;
        case ACTION_JRTT_SUCCESS:
            console.log(ACTION_JRTT_SUCCESS);
            return {
                ...state,
                jrttData:action.payload,
            }
        case ACTION_JRTT_ERROR:
            console.log(ACTION_JRTT_ERROR);
            return state;
        //异常指数
        case ACTION_YCZS:
            console.log(ACTION_YCZS);
            return state;
        case ACTION_YCZS_SUCCESS:
            console.log('loading状态'+action.loading);
            console.log(ACTION_YCZS_SUCCESS);
            return {
                ...state,
                yczs:action.payload
            }
        case ACTION_YCZS_ERROR:
            console.log(ACTION_YCZS_ERROR);
            return state;
        default:
            return state
    }
}
//6.get函数
