/**
 * 在redux-form中用到的参数效验
 * @param value
 */

//必填
export const REQUIRED = value => value ? undefined : '必填项'

//数字效验
export const NUMBER = value => value && /\d+/.test(value) ?  undefined :'必须是数字'

//最大位数效验,有一个参数
export const MAXLENGTH = max => value => value && value.length > max ? `字符长度不能大于${max}` : undefined

//最小位数效验,有一个参数
export const MINLENGTH = min => value => value && value.length < min ? `字符长度不能小于${min}` : undefined

//位数限制,有一个参数
export const LENGTH =  length => value => value && value.length != length ? `字符长度必须为${length}位` : undefined

//是否email效验
export const EMAIL = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Email格式错误' : undefined

//是否手机号码
export const MOBILE = value => value && !/^1\d{10}$/i.test(value) ? '手机格式错误' : undefined

//最小值效验,有一个参数
export const MINVALUE = min => value => value && value < min ? `不能小于 ${min}` : undefined

//最大值效验,有一个参数
export const MAXVALUE = max => value => value && value > max ? `不能大于 ${max}` : undefined

