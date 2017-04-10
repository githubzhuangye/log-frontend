/**
 * 存放本项目调用的外部URL前缀,和各种URL
 * @type {string}
 */

//所有URL前缀,测试环境
// export const URL_PREFIX='http://127.0.0.1:8080/log-statiscs';

//所有URL前缀,生产环境
export const URL_PREFIX='http://192.168.31.45:21102/log-statiscs';

//------------------------------时长报表-----------------------------------------------

//时长报表-身份证
export const GET_IDCARD_TIME_STATISCS_INFO='/idcard/getIdCardTimeStatiscsInfo.do';
//获取所有商户的名字
export const GET_ALL_MEMBER_NAMES='/idcard/getAllMemberNames.do';

//------------------------------异常报表-----------------------------------------------

//异常报表-身份证
export const URL_YCBB_IDCARD='/idcarderror/queryErrors.do';
export const URL_YCBB_IDCARD_EXCEPTYPES='/idcarderror/exceptionTypes.do';

//------------------------------今日头条-----------------------------------------------
