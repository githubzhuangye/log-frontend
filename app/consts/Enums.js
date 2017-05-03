/**
 * 存放本项目用到的enum映射
 * @type {{0: string, 1: string, 2: string, 3: string, 4: string, 5: string, 6: string, 7: string, 8: string, 9: string, 10: string, 11: string}}
 */
//返回时长等级与字符串的转换
export const LevelToStr={
    0:'<0',
    1:'0-200',
    2:'200-400',
    3:'400-600',
    4:'600-800',
    5:'800-1000',
    6:'1000-1300',
    7:'1300-1500',
    8:'1500-2000',
    9:'2000-4000',
    10:'4000-6000',
    11:'>6000',
}

//身份证的产品
export const IdCardProductToStr={
    '0.0':'默认产品',
    '1.0':'身份证返照片',
    '2.0':'身份证不返照片'
};

//银行卡的产品
export const BankCardProductToStr={
    '0.0':'默认产品',
}

/**  规则预警部分  */

//时间段,单位:小时
export const TimeSlotEnum=[
    {
        name:'1小时',
        value:1
    },
    {
        name:'2小时',
        value:2
    },
    {
        name:'4小时',
        value:4
    },
    {
        name:'8小时',
        value:8
    },
    {
        name:'12小时',
        value:12
    },
    {
        name:'24小时',
        value:24
    },
    {
        name:'48小时',
        value:48
    },
    {
        name:'72小时',
        value:72
    },
]

//触发间隔时间,单位:分钟
export const TriggerIntervalEnum=[
    {
        name:'30秒',
        value:0.5
    },
    {
        name:'1分钟',
        value:1
    },
    {
        name:'2分钟',
        value:2
    },
    {
        name:'5分钟',
        value:5
    },
    {
        name:'10分钟',
        value:10
    },
    {
        name:'30分钟',
        value:30
    },
]

//触发休眠时间,单位:分钟
export const TriggerSleepEnum=[
    {
        name:'1分钟',
        value:1
    },
    {
        name:'5分钟',
        value:5
    },
    {
        name:'10分钟',
        value:10
    },
    {
        name:'30分钟',
        value:30
    },
    {
        name:'1小时',
        value:60
    },
    {
        name:'3小时',
        value:180
    },
    {
        name:'6小时',
        value:360
    },
    {
        name:'12小时',
        value:720
    },
    {
        name:'24小时',
        value:1440
    },

]

//预警名单
export const NoticeMembersEnum =[

    {
        name:'冯莹',
        value:'0023',
    },
    {
        name:'叶国剑',
        value:'0081',
    },
    {
        name:'涂泽',
        value:'0021',
    },
]

//通道
export const ChannelArray=[
    'NCIIC','通道2'
]

//柜台名
export const CounterArray=[
    'NCIIC-身份证认证','NCIIC-身份证认证3'
]
//产品名
export const ProductArray=[
    '征信-身份证认证-两要素'
]

//部门
export const departMentArray=[
    '技术部',
    '支持部',
    '营销部',
    '市场部',
    '领导',
    '其他部门'
]

//角色
export const RoleEnum=[
    {
        name:'普通人员',
        value:'普通人员'
    },
    {
        name:'管理员',
        value:'管理员'
    },
    {
        name:'超级管理员',
        value:'超级管理员'
    },
]


/**
 * 从enum中获取指定value的name
 * @param enums
 * @param value
 * @returns {string}
 */
export const getNameFromEnumByValue=(enums ,value)=>{

    if (enums && enums.findIndex(e => e.value == value) != -1) {
        return enums.find(e=>e.value==value).name;
    }
    return '';

}