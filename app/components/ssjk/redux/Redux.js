import {LevelToStr, IdCardProductToStr} from '../../../consts/Enums'
import {groupSum, selectFieldArray} from '../../../utils/ArrayUtils'

/**
 * 身份证统计数据的redux
 * 目前是柱状图和扇形图公用一个redux
 * @type {[*]}
 */


//1.2柱状图所用到的常量
export const Histogram_TITLE = '每日访问量';
export const Histogram_X_AXIS_TITLE = '日期';
export const Histogram_Y_AXIS_TITLE = '访问量';
export const Histogram_TOOL_TIP_FORMATTER = "在{b} 共 访问<span style='color:deeppink'>{c}</span>次";
export const Histogram_SERIES_NAMES = ['全部'];

//2.action静态字段

export const ACTION_AUTO = 'ssjk/auto/ACTION_AUTO';
export const ACTION_AUTO_SUCCESS = 'ssjk/auto/ACTION_AUTO_SUCCESS';
export const ACTION_AUTO_ERROR = 'ssjk/auto/ACTION_AUTO_ERROR';

export const ACTION_DATA = 'ssjk/data/ACTION_PAGE';
export const ACTION_DATA_SUCCESS = 'ssjk/data/ACTION_PAGE_SUCCESS';
export const ACTION_DATA_ERROR = 'ssjk/data/ACTION_PAGE_ERROR';


//3.action创建器


//4.初始化数据

const initViewData = {
    form: {
        commitParams: {
            // 监控对象（All, 身份证, 银行卡）
            monType: '',
            // 数据类型（All, 正常, 异常）
            dataType: '',
            // 全量or增量
            flag: '1'

        },
        auto: {

        }
    },
    data: [],
    loading:'hide',//loading状态
};

//5.reducer,这里的state只是一个局部state,在redux的store中,相当于根root.goods
export default function Redux(state = initViewData, action) {
    switch (action.type) {
        //主体数据
        case ACTION_DATA:
            console.log(ACTION_DATA);
            return{
                ...state,
                loading:action.loading
            }
        case ACTION_DATA_SUCCESS:
            console.log(ACTION_DATA_SUCCESS);
            return {
                ...state,
                form: {
                    ...state.form,
                    commitParams: {
                        // 监控对象（All, 身份证, 银行卡）
                        monType: action.params.monType,
                        // 数据类型（All, 正常, 异常）
                        dataType: action.params.dataType,
                        // 增量or全量
                        flag:action.params.flag,
                    }
                },
                data: action.payload,
                loading:action.loading
            }
        case ACTION_DATA_ERROR:
            console.log(ACTION_DATA_ERROR);
            return{
                ...state,
                loading:action.loading
            }
        default:
            return state
    }
}

export function queryViewMonInfo(state, param) {

    if (state.length == 0) {
        return [];
    }

    let finalResult = [];//最终结果,只存放date,count


    //3.构造成name,value的结构
    finalResult = state.filter((item) => {
        let newitem = {};
        //newitem.name = item.monTime;
        newitem.value = item.num;
        return newitem;
    });
    return finalResult;
}


/**
 * 6.1.1获取柱状图的X轴数据
 *
 * @param sourceArray
 * @returns {*}
 */
export function getViewXAxisArray(sourceArray) {
    let finalResult=[];

    //对数据进行聚合求和操作,只保留...groupField,countField
    for (let i = 0; i < sourceArray.length; i++) {
        let r = sourceArray[i];
        finalResult.push(r['monTime']);//如果是空,直接先放进去
    }
    return finalResult;
}

export function getBankCardFanChartData(state, param) {
    let {beginDateStr:beginDate, endDateStr:endDate, memberName:member}=param;

    if (state.length == 0) {
        return [];
    }

    let filterResult = [];//第一次过滤的结果变量
    let finalResult = [];//最终结果,只存放date,count

    //1.过滤条件
    //如果member='',则聚合所有member数据
    filterResult = state.filter((item) => {
        if (!member || member == '' || member == '所有商户') {
            return beginDate <= item.date && endDate >= item.date;
        } else {
            return item.member == member && beginDate <= item.date && endDate >= item.date;
        }
    });


    //2.聚合数据,以字段response_level聚合累加到count字段
    finalResult = groupSum(filterResult, 'count', 'response_level');

    //3.构造成name,value的结构
    finalResult = finalResult.map((item) => {
        let newitem = {};
        newitem.name = LevelToStr[item.response_level];
        newitem.value = item.count;
        return newitem;
    });


    return finalResult;


}

/**
 * 6.3表格所需要的所有数据
 *
 * @param state
 * @param beginDate
 * @param endDate
 * @param member
 */
export function getBankCardTableData(state, param) {

    let {beginDateStr:beginDate, endDateStr:endDate, memberName:member}=param;

    if (state.length == 0) {
        return [];
    }

    let filterResult = [];//第一次过滤的结果变量
    let finalResult = [];//最终结果,只存放date,count

    //1.过滤条件
    //如果member='',则聚合所有member数据
    filterResult = state.filter((item) => {
        if (!member || member == '' || member == '所有商户') {
            return beginDate <= item.date && endDate >= item.date;
        } else {
            return item.member == member && beginDate <= item.date && endDate >= item.date;
        }
    });

    //2.聚合运算
    finalResult = groupSum(filterResult, 'count', 'member', 'product', 'response_level');

    //3.构造成对应的格式
    finalResult = finalResult.map((item) => {
        item.productStr = IdCardProductToStr[item.product];
        item.responseLevelStr = LevelToStr[item.response_level];
        return item;
    });

    return finalResult;

}


