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


//------------------------------预警设置-----------------------------------------------

//通用
export const URL_YJSZ_AUTO_WARNING_WAYS='/ruleInfo/warningWays.do'
export const URL_YJSZ_AUTO_RULE_TYPE='/ruleInfo/ruleTypes.do';
export const URL_YJSZ_AUTO_ELEMENTS='/ruleInfo/elements.do'
export const URL_YJSZ_AUTO_PRODUCT_STATUS='/ruleInfo/productStatus.do'
export const URL_YJSZ_AUTO_WARNING_LEVELS='/ruleInfo/warningLevels.do'
export const URL_YJSZ_AUTO_CONDITION_TYPES='/ruleInfo/conditionTypes.do'

//通道预警
export const URL_YJSZ_CHANNEL_PAGE='/ruleInfo/listRuleInfo.do'
export const URL_YJSZ_CHANNEL_UPDATE='/ruleInfo/updateRuleInfo.do'
export const URL_YJSZ_CHANNEL_DELETE='/ruleInfo/deleteRuleInfo.do'
export const URL_YJSZ_CHANNEL_INSERT='/ruleInfo/insertRuleInfo.do'

//------------------------------用户管理-----------------------------------------------

//用户管理
export const URL_YHGL_USER_PAGE='/userInfo/listUserInfo.do'
export const URL_YHGL_USER_UPDATE='/userInfo/updateUserInfo.do'
export const URL_YHGL_USER_DELETE='/userInfo/deleteUserInfo.do'
export const URL_YHGL_USER_INSERT='/userInfo/insertUserInfo.do'

//登陆
export const URL_YHGL_USER_LOGIN='/userInfo/login.do'
//修改密码
export const URL_YHGL_USER_SETPWD='/userInfo/setpwd.do'
