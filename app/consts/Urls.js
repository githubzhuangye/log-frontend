/**
 * 存放本项目调用的外部URL前缀,和各种URL
 * @type {string}
 */

//所有URL前缀,测试环境
// export const URL_PREFIX='http://127.0.0.1:8080/log-statiscs';

//所有URL前缀,付刚_测试环境
// export const URL_PREFIX='http://10.0.70.248:8080/log-statiscs';

//所有URL前缀,生产环境
export const URL_PREFIX='http://192.168.31.45:21102/log-statiscs';






//------------------------------时长报表-----------------------------------------------

//时长报表-身份证
export const URL_GET_IDCARD_TIME_STATISCS_INFO='/idcard/getIdCardTimeStatiscsInfo.do';
//时长报表-银行卡
export const URL_GET_BANKCARD_TIME_STATISCS_INFO='/bankcard/getbankCardTimeStatiscsInfo.do';
//获取所有商户的名字
export const URL_GET_ALL_MEMBER_NAMES='/idcard/getAllMemberNames.do';

//------------------------------异常报表-----------------------------------------------
//根据LogId查询idcard的历史记录
export const URL_IDCARD_DETAIL='';//从完整日志里搜寻
//根据LogId查询bankcard的历史记录
export const URL_BANKCARD_DETAIL=''//从完整日志里搜寻

//异常报表-身份证
export const URL_YCBB_IDCARD='/idcarderror/queryErrors.do';//非分页模式
export const URL_YCBB_IDCARD_PAGE='/idcarderror/queryPageErrors.do';//分页模式查询数据
export const URL_YCBB_IDCARD_EXCEPTTYPES='/idcarderror/exceptionTypes.do';
export const URL_YCBB_IDCARD_EXCEPTCONTENTS='/idcarderror/exceptionPhrases.do';

//异常报表-银行卡
export const URL_YCBB_BANKCARD='/bankcarderror/queryErrors.do';//非分页模式
export const URL_YCBB_BANKCARD_PAGE='/bankcarderror/queryPageErrors.do';//分页模式
export const URL_YCBB_BANKCARD_EXCEPTTYPES='/bankcarderror/exceptionTypes.do';
export const URL_YCBB_BANKCARD_EXCEPTCONTENTS='/bankcarderror/exceptionPhrases.do';

//------------------------------今日头条-----------------------------------------------
export const URL_JRTT='/important/getTopImportantMessage.do';
export const URL_LEFT_GAUGE='/idcarderror/countNowErrors.do';//身份证项目异常数
