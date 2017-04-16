import {LevelToStr, IdCardProductToStr} from '../../../../consts/Enums'
import {groupSum, selectFieldArray} from '../../../../utils/ArrayUtils'
import {getLastMonth, dateToString}  from '../../../../utils/DateUtils'

/**
 * 身份证统计数据的redux
 * 目前是柱状图和扇形图公用一个redux
 * @type {[*]}
 */

//1.其他静态字段
//1.1扇形图所用到的常量
export const FanChart_TITLE = '银行卡查询访问时长总百分比';
export const FanChart_TOOL_TIP_FORMATTER = "{a} <br/>在{b}之间 共 {c}笔 <br/>占比: {d}%";
export const FanChart_LEGEND_DATA = ['0-200', '200-400', '400-600', '600-800', '800-1000', '1000-1300', '1300-1500', '1500-2000', '2000-4000', '4000-6000', '>6000'];

//1.2柱状图所用到的常量
export const Histogram_TITLE = '银行卡查询每日访问量';
export const Histogram_X_AXIS_TITLE = '日期';
export const Histogram_Y_AXIS_TITLE = '访问量';
export const Histogram_TOOL_TIP_FORMATTER = "在{b} 共 访问<span style='color:deeppink'>{c}</span>次";
export const Histogram_SERIES_NAMES = ['全部'];

//1.3表格所用到的常量
export const TABLE_TITLES = ['商户名称', '产品名称', '返回时长', '数量'];
export const TABLE_FIELDS = ['member', 'productStr', 'responseLevelStr', 'count'];

//2.action静态字段

export const ACTION_AUTO = 'scbb/bankcard/ACTION_AUTO';
export const ACTION_AUTO_SUCCESS = 'scbb/bankcard/ACTION_AUTO_SUCCESS';
export const ACTION_AUTO_ERROR = 'scbb/bankcard/ACTION_AUTO_ERROR';

export const ACTION_DATA = 'scbb/bankcard/ACTION_PAGE';
export const ACTION_DATA_SUCCESS = 'scbb/bankcard/ACTION_PAGE_SUCCESS';
export const ACTION_DATA_ERROR = 'scbb/bankcard/ACTION_PAGE_ERROR';


//3.action创建器


//4.初始化数据
//IdCard 2个图表和一个表格公用这个数据仓库

const initIdCardData = {
    form: {
        commitParams: {
            beginDateStr: dateToString(getLastMonth(new Date())),          //开始时间
            beginDate: getLastMonth(new Date()),
            memberName: '所有商户',        //商户名称
            endDate: new Date(),
            endDateStr: dateToString(new Date()),       //结束时间
        },
        auto: []
    },
    data: [],
    loading:'hide',//loading状态
};

//5.reducer,这里的state只是一个局部state,在redux的store中,相当于根root.goods
export default function Redux(state = initIdCardData, action) {
    switch (action.type) {
        //下拉列表
        case ACTION_AUTO:
            console.log(ACTION_AUTO);
            return state;
        case ACTION_AUTO_SUCCESS:
            console.log(ACTION_AUTO_SUCCESS);
            return {
                ...state,
                form: {
                    ...state.form,
                    auto: action.payload
                }
            }
        case ACTION_AUTO_ERROR:
            console.log(ACTION_AUTO_ERROR);
            return state;

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
                        beginDateStr: dateToString(action.params.beginDate),
                        endDateStr: dateToString(action.params.endDate),
                        memberName: action.params.member == '' ? '所有商户' : action.params.member,
                        beginDate: action.params.beginDate,
                        endDate: action.params.endDate
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

//6.查询方法
//6.1查询指定member柱状图所有产品的数据
//结果需要name,value的结构
//member为'',product==0,查询所有
/**
 return[
 {
     name:'2017-03-01',
     value:3225
 },
 {
     name:'2017-03-02',
     value:225
 },
 {
     name:'2017-03-03',
     value:2125
 }
 ]
 */
export function getBankCardHistogramData(state, param, product) {

    let {beginDateStr:beginDate, endDateStr:endDate, memberName:member}=param;

    if (state.length == 0) {
        return [];
    }

    let filterResult = [];//第一次过滤的结果变量
    let finalResult = [];//最终结果,只存放date,count

    //1.过滤条件
    //如果product=0,则聚合所有product数据
    //如果member='',则聚合所有member数据
    filterResult = state.filter((item) => {
        if (product == 0) {
            if (!member || member == '' || member == '所有商户') {
                return beginDate <= item.date && endDate >= item.date;
            } else {
                return item.member == member && beginDate <= item.date && endDate >= item.date;
            }
        } else {
            if (!member || member == '' || member == '所有商户') {
                return beginDate <= item.date && endDate >= item.date && item.product == product;
            } else {
                return item.member == member && beginDate <= item.date && endDate >= item.date && item.product == product;
            }
        }
    });

    //2.聚合数据,以字段date聚合累加到count字段
    finalResult = groupSum(filterResult, 'count', 'date');

    //3.构造成name,value的结构
    finalResult = finalResult.map((item) => {
        let newitem = {};
        newitem.name = item.date;
        newitem.value = item.count;
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
export function getBankCardHistogramXAxisArray(sourceArray) {
    return selectFieldArray(sourceArray, 'date');
}


//6.2查询扇形图产品的数据
//目前没有区分product
//结果需要name,value的结构
/**
 const DATA_TOTAL = [
 {value: 335, name: '0-200'},
 {value: 2310, name: '200-400'},
 {value: 1234, name: '400-600'},
 {value: 135, name: '600-800'},
 {value: 1548, name: '1000-1300'},
 {value: 848, name: '1300-1500'},
 {value: 98, name: '1500-2000'},
 {value: 548, name: '2000-4000'},
 {value: 548, name: '4000-6000'},
 {value: 0, name: '>6000'},
 ];

 */
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




