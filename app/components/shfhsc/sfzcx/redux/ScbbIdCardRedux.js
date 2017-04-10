import {LevelToStr,ProductToStr} from '../../../../consts/Enums'
import {groupSum,selectFieldArray} from '../../../../utils/ArrayUtils'

/**
 * 身份证统计数据的redux
 * 目前是柱状图和扇形图公用一个redux,以后有机会再拆分
 * @type {[*]}
 */

//IdCard 2个图表和一个表格公用这个数据仓库
const initIdCardData = [

];

//2.刷新商户放回时长的统计数据
export const REFRESH_IDCARD_RES_TIME_DATA = 'REFRESH_IDCARD_RES_TIME_DATA';
export const REFRESH_IDCARD_RES_TIME_DATA_SUCCESS = 'REFRESH_IDCARD_RES_TIME_DATA_SUCCESS';
export const REFRESH_IDCARD_RES_TIME_DATA_ERROR = 'REFRESH_IDCARD_RES_TIME_DATA_ERROR';



//4.reducer,这里的state只是一个局部state,在redux的store中,相当于根root.goods
export default function ScbbIdCardRedux(state = initIdCardData, action) {
    switch (action.type) {
        case REFRESH_IDCARD_RES_TIME_DATA:
            // console.log('加载loading');
            console.log('REFRESH_IDCARD_RES_TIME_DATA');
            return state;
        case REFRESH_IDCARD_RES_TIME_DATA_SUCCESS:
            console.log('REFRESH_IDCARD_RES_TIME_DATA_SUCCESS');
            //MyEcharts组件会自动检测数据的变化,数据发生变化会自动setOption
            // console.log(action.payload);
            return action.payload;
        case REFRESH_IDCARD_RES_TIME_DATA_ERROR:
            console.log('REFRESH_IDCARD_RES_TIME_DATA_ERROR');
            return state;
        default:
            return state
    }
}

//5.查询方法
//5.1查询指定member柱状图所有产品的数据
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
export function getIdCardHistogramData(state, param, product) {

    let {beginDateStr:beginDate,endDateStr:endDate,memberName:member}=param;

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
            if (!member || member == '' || member=='所有商户') {
                return beginDate <= item.date && endDate >= item.date;
            } else {
                return item.member == member && beginDate <= item.date && endDate >= item.date;
            }
        } else {
            if (!member || member == '' || member=='所有商户') {
                return beginDate <= item.date && endDate >= item.date && item.product == product;
            } else {
                return item.member == member && beginDate <= item.date && endDate >= item.date && item.product == product;
            }
        }
    });

    //2.聚合数据,以字段date聚合累加到count字段
    finalResult=groupSum(filterResult,'count','date');

    //3.构造成name,value的结构
    finalResult = finalResult.map((item) => {
        let newitem={};
        newitem.name = item.date;
        newitem.value = item.count;
        return newitem;
    });


    return finalResult;

}


/**
 * 5.1.1获取数据源中的date组成的x轴,供柱状图使用
 * @param sourceArray
 * @returns {*}
 */
export function getIdCardHistogramXAxisArray(sourceArray ) {
    return selectFieldArray(sourceArray,'date');
}


//5.2查询扇形图产品的数据
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
export function getIdCardFanChartData(state, param) {
    let {beginDateStr:beginDate,endDateStr:endDate,memberName:member}=param;

    if (state.length == 0) {
        return [];
    }

    let filterResult = [];//第一次过滤的结果变量
    let finalResult = [];//最终结果,只存放date,count

    //1.过滤条件
    //如果member='',则聚合所有member数据
    filterResult = state.filter((item) => {
        if (!member || member == '' || member=='所有商户') {
            return beginDate <= item.date && endDate >= item.date;
        } else {
            return item.member == member && beginDate <= item.date && endDate >= item.date;
        }
    });


    //2.聚合数据,以字段response_level聚合累加到count字段
    finalResult=groupSum(filterResult,'count','response_level');

    //3.构造成name,value的结构
    finalResult = finalResult.map((item) => {
        let newitem={};
        newitem.name = LevelToStr[item.response_level];
        newitem.value = item.count;
        return newitem;
    });


    return finalResult;


}

/**
 * 5.3表格所需要的所有数据
 *
 * @param state
 * @param beginDate
 * @param endDate
 * @param member
 */
export function getIdCardTableData(state, param) {

    let {beginDateStr:beginDate,endDateStr:endDate,memberName:member}=param;

    if (state.length == 0) {
        return [];
    }

    let filterResult = [];//第一次过滤的结果变量
    let finalResult = [];//最终结果,只存放date,count

    //1.过滤条件
    //如果member='',则聚合所有member数据
    filterResult = state.filter((item) => {
        if (!member || member == '' || member=='所有商户') {
            return beginDate <= item.date && endDate >= item.date;
        } else {
            return item.member == member && beginDate <= item.date && endDate >= item.date;
        }
    });

    //2.聚合运算
    finalResult=groupSum(filterResult,'count','member','product','response_level');

    //3.构造成对应的格式
    finalResult = finalResult.map((item) => {
        item.productStr=ProductToStr[item.product];
        item.responseLevelStr=LevelToStr[item.response_level];
        return item;
    });

    return finalResult;

}




