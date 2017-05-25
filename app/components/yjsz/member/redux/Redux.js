import React from 'react';
//1.其他静态字段
//表格字段
//字段中文名
export const TABLE_TITLES = ['ID', '商户名称', '产品名称',   '时间段', '要素', '条件',  '阀值','关系', '预警方式', '级别',  '连接'];
//字段名
export const TABLE_FIELDS = ['ruleId', 'member', 'product',   'timeSlot', 'element', 'condition','limValue', 'relation',  'noticeMethods', 'level'];

//表格的标题
export const TABLE_TOPTITLE = `商户预警规则设置`;


//属性表格的字段
export const PROPERTIES_DISPLAY_NAMES = ['ID','规则预警类型', '商户名称', '产品名称',   '时间段', '要素', '条件', '关系表达式', '阀值', '预警方式','预警通知人员', '级别','检测频率(min)','预警休眠时间(min)','创建者','创建时间','修改者','修改时期'];
export const PROPERTIES_FIELDS = ['ruleId','ruleSetType', 'member', 'product',   'timeSlot', 'element', 'condition', 'relation', 'limValue', 'noticeMethods','noticePersons', 'level','triggerInterval','triggerSleep','createUser','createTime','updateUser','updateTime'];

//2.action静态字段

// 1)表单部分

//下拉列表,三个下拉列表一个接口
export const ACTION_AUTO = 'yjsz/member/ACTION_AUTO';
export const ACTION_AUTO_SUCCESS = 'yjsz/member/ACTION_AUTO_SUCCESS';
export const ACTION_AUTO_ERROR = 'yjsz/member/ACTION_AUTO_ERROR';


export const ACTION_AUTO_WARNING_WAYS='yjsz/member/ACTION_AUTO_WARNING_WAYS'
export const ACTION_AUTO_WARNING_WAYS_SUCCESS='yjsz/member/ACTION_AUTO_WARNING_WAYS_SUCCESS'
export const ACTION_AUTO_WARNING_WAYS_ERROR='yjsz/member/ACTION_AUTO_WARNING_WAYS_ERROR'

export const ACTION_AUTO_RULE_TYPE='yjsz/member/ACTION_AUTO_RULE_TYPE';
export const ACTION_AUTO_RULE_TYPE_SUCCESS='yjsz/member/ACTION_AUTO_RULE_TYPE_SUCCESS';
export const ACTION_AUTO_RULE_TYPE_ERROR='yjsz/member/ACTION_AUTO_RULE_TYPE_ERROR';

export const ACTION_AUTO_ELEMENTS='yjsz/member/ACTION_AUTO_ELEMENTS'
export const ACTION_AUTO_ELEMENTS_SUCCESS='yjsz/member/ACTION_AUTO_ELEMENTS_SUCCESS'
export const ACTION_AUTO_ELEMENTS_ERROR='yjsz/member/ACTION_AUTO_ELEMENTS_ERROR'


export const ACTION_AUTO_PRODUCT_STATUS='yjsz/member/ACTION_AUTO_PRODUCT_STATUS'
export const ACTION_AUTO_PRODUCT_STATUS_SUCCESS='yjsz/member/ACTION_AUTO_PRODUCT_STATUS_SUCCESS'
export const ACTION_AUTO_PRODUCT_STATUS_ERROR='yjsz/member/ACTION_AUTO_PRODUCT_STATUS_ERROR'

export const ACTION_AUTO_WARNING_LEVELS='yjsz/member/ACTION_AUTO_WARNING_LEVELS'
export const ACTION_AUTO_WARNING_LEVELS_SUCCESS='yjsz/member/ACTION_AUTO_WARNING_LEVELS_SUCCESS'
export const ACTION_AUTO_WARNING_LEVELS_ERROR='yjsz/member/ACTION_AUTO_WARNING_LEVELS_ERROR'

export const ACTION_AUTO_CONDITION_TYPES='yjsz/member/ACTION_AUTO_CONDITION_TYPES'
export const ACTION_AUTO_CONDITION_TYPES_SUCCESS='yjsz/member/ACTION_AUTO_CONDITION_TYPES_SUCCESS'
export const ACTION_AUTO_CONDITION_TYPES_ERROR='yjsz/member/ACTION_AUTO_CONDITION_TYPES_ERROR'


//下拉列表|异常类型
export const ACTION_AUTO_ONE = 'yjsz/member/ACTION_AUTO_ONE';
export const ACTION_AUTO_ONE_SUCCESS = 'yjsz/member/ACTION_AUTO_ONE_SUCCESS';
export const ACTION_AUTO_ONE_ERROR = 'yjsz/member/ACTION_AUTO_ONE_ERROR';

//下拉列表|异常内容
export const ACTION_AUTO_TWO='yjsz/member/ACTION_AUTO_TWO';
export const ACTION_AUTO_TWO_SUCCESS='yjsz/member/ACTION_AUTO_TWO_SUCCESS';
export const ACTION_AUTO_TWO_ERROR='yjsz/member/ACTION_AUTO_TWO_ERROR';

//用户
export const ACTION_AUTO_USERINFO='yjsz/member/ACTION_AUTO_USERINFO';
export const ACTION_AUTO_USERINFO_SUCCESS='yjsz/member/ACTION_AUTO_USERINFO_SUCCESS';
export const ACTION_AUTO_USERINFO_ERROR='yjsz/member/ACTION_AUTO_USERINFO_ERROR'

export const ACTION_AUTO_MEMBER='yjsz/member/ACTION_AUTO_USERINFO'
export const ACTION_AUTO_MEMBER_SUCCESS='yjsz/member/ACTION_AUTO_MEMBER_SUCCESS'
export const ACTION_AUTO_MEMBER_ERROR='yjsz/member/ACTION_AUTO_MEMBER_ERROR'

// 2)表格部分

//增删改查
export const ACTION_PAGE = 'yjsz/member/ACTION_PAGE';
export const ACTION_PAGE_SUCCESS = 'yjsz/member/ACTION_PAGE_SUCCESS';
export const ACTION_PAGE_ERROR = 'yjsz/member/ACTION_PAGE_ERROR';

export const ACTION_ADD = 'yjsz/member/ACTION_ADD';
export const ACTION_ADD_SUCCESS = 'yjsz/member/ACTION_ADD_SUCCESS';
export const ACTION_ADD_ERROR = 'yjsz/member/ACTION_ADD_ERROR';

export const ACTION_UPDATE = 'yjsz/member/ACTION_UPDATE';
export const ACTION_UPDATE_SUCCESS = 'yjsz/member/ACTION_UPDATE_SUCCESS';
export const ACTION_UPDATE_ERROR = 'yjsz/member/ACTION_UPDATE_ERROR';

export const ACTION_DELETE = 'yjsz/member/ACTION_DELETE';
export const ACTION_DELETE_SUCCESS = 'yjsz/member/ACTION_DELETE_SUCCESS';
export const ACTION_DELETE_ERROR = 'yjsz/member/ACTION_DELETE_ERROR';

export const ACTION_SELECTROW='yjsz/member/ACTION_SELECTROW';

//弹窗
export const ACTION_DIALOG_OPEN = 'yjsz/member/ACTION_DIALOG_OPEN';
export const ACTION_DIALOG_CLOSE = 'yjsz/member/ACTION_DIALOG_CLOSE';

//右侧滑动条
export const ACTION_DRAWER_OPEN = 'yjsz/member/ACTION_DRAWER_OPEN';
export const ACTION_DRAWER_CLOSE = 'yjsz/member/ACTION_DRAWER_CLOSE'

//弹出连接窗口
export const ACTION_CONNECT_OPEN = 'yjsz/member/ACTION_CONNECT_OPEN';
export const ACTION_CONNECT_CLOSE = 'yjsz/member/ACTION_CONNECT_CLOSE'

//警示窗
export const ACTION_ALERT_OPEN = 'yjsz/member/ACTION_ALERT_OPEN';
export const ACTION_ALERT_CLOSE = 'yjsz/member/ACTION_ALERT_CLOSE';

//提示条
export const ACTION_SNACK_OPEN='yjsz/member/ACTION_SNACK_OPEN'
export const ACTION_SNACK_CLOSE = 'yjsz/member/ACTION_SNACK_CLOSE';

//详情
export const ACTION_DETAIL = 'yjsz/member/ACTION_DETAIL';


//4.初始化数据
const initData = {
    form: {
        commitParams1: {
            search: {},
            add: {},
            update: {},
            delete: {},
            recordId:{},
        },//请求的参数,具体参数名和后端开发协商,如果使用redux-form,则可以不用保存本项参数
    },//存放表单信息
    auto:{
        autoWarningWays: [],
        autoWarningMembers: [],
        autoRuleTypes: [],
        autoElements: [],
        autoProductStatus:[],
        autoWarningLevels:[],
        autoConditionTypes:[],
        autoExceptionType:[],//下拉列表|异常类型
        autoExceptionContent:[],//下拉列表|异常内容
        autoUserInfo:[],//下拉列表|用户
        autoMember:[],//商户
    },
    page: {
        currentNum: 1,//当前页
        pageSize: 10,//每页大小
        totalCount: 1,//总条数
        data: [],//返回数据
    },//前端分页
    loading: 'hide',//loading状态
    dialog: {
        status: false,//弹窗的状态,打开或者关闭
        title: '',//弹窗的标题
        content: {},//弹窗的内容,如果不需要再调用接口,则直接将显示详情存储在这里
        buttonName: '',//按钮名称
    },//弹窗,大窗口,用于修改操作或者添加操作时弹出
    drawer: {
        status: false,//右侧滑动条
        title: '详情',//滑动条的标题
        content: {
            triggerInterval:1
        },//滑动条的内容
    },
    connect: {
        status: false,//弹窗的状态,打开或者关闭
        title: '',//弹窗的标题
        content: {},//弹窗的内容,如果不需要再调用接口,则直接将显示详情存储在这里
        buttonName: '',//按钮名称
    },//弹窗,大窗口,用于修改操作或者添加操作时弹出
    alert: {
        status: false,
        title: '确定删除吗?',
    },//警示窗,小窗口,用于警告提示,主要用于删除,添加,修改
    snack: {
        status: false,//是否显示
        message: '测试信息',//显示的信息
        color: '#FF4081',//快餐条的颜色
    },//提示条,用于添加,修改,删除操作成功或者失败时自动弹出
    detail: {},//存储要展示的信息,用于显示详情,修改时弹窗显示,需要调用才显示详情的存储在这里,和dialog.content使用类似
    cache: {},//存储单条信息,用于缓存,用于修改或者删除前的信息,可以用于撤销这种功能
    selectedRow:{
    },//存储用于要删除或者修改的行,数据格式为{num,data,rule}
};

//5.reducer
export default function Redux(state = initData, action) {
    switch (action.type) {

        //分页查询
        case ACTION_PAGE:
            console.log(ACTION_PAGE);
            return {
                ...state,
                loading: action.loading
            };
        case ACTION_PAGE_SUCCESS:
            console.log(ACTION_PAGE_SUCCESS);
            //访问成功后,同时修改提交的表单参数和loading状态
            if (!action.success) {
                return {
                    ...state,
                    loading: action.loading,
                    snack: {
                        status: true,
                        message: '数据加载失败',
                        color: '#FF4081'
                    }
                };
            }
            return {
                ...state,
                form: {
                    ...state.form,
                    commitParams: action.params,
                },
                page: {
                    data: action.payload,
                    pageSize: action.params.pageSize,
                    currentNum: action.params.currentNum,
                    totalCount: action.payload.length
                },
                loading: action.loading
            };
        case ACTION_PAGE_ERROR:
            console.log(ACTION_PAGE_ERROR);
            return {
                ...state,
                loading: action.loading,
                snack: {
                    status: true,
                    message: '数据加载失败',
                    color: '#FF4081'
                }

            };

        //删除
        case ACTION_DELETE:
            console.log(ACTION_DELETE);
            return {
                ...state,
                loading: action.loading
            };
        case ACTION_DELETE_SUCCESS:
            console.log(ACTION_DELETE_ERROR);
            let dls = state.page.data;
            //删除替换
            dls = dls.filter((item) => item != action.params);
            if (!action.success) {
                return {
                    ...state,
                    loading: action.loading,
                    snack: {
                        status: true,
                        message: '删除失败'+","+action.result.errorMsg,
                        color: '#FF4081'
                    }
                }
            }
            return {
                ...state,
                page: {
                    ...state.page,
                    data: dls
                },
                loading: action.loading,
                snack: {
                    status: true,
                    message: '删除成功,规则一分钟后生效',
                    color: 'rgb(0, 188, 212)'
                }
            }
        case ACTION_DELETE_ERROR:
            console.log(ACTION_DELETE_ERROR);
            return {
                ...state,
                loading: action.loading,
                snack: {
                    status: true,
                    message: '删除失败',
                    color: '#FF4081'
                }
            }
        //修改
        case ACTION_UPDATE:
            console.log(ACTION_UPDATE);
            return {
                ...state,
                loading: action.loading,
            }
        case ACTION_UPDATE_SUCCESS:
            console.log(ACTION_UPDATE_SUCCESS);
            let uls = state.page.data;
            //修改替换
            uls = uls.map(item => item.id == action.params.id ? action.params : item);
            if (!action.success) {
                return {
                    ...state,
                    loading: action.loading,
                    snack: {
                        status: true,
                        message: '修改失败'+','+action.result.errorMsg,
                        color: '#FF4081'
                    }
                }
            }
            return {
                ...state,
                loading: action.loading,
                dialog: {
                    ...state.dialog,
                    content: {},
                    status: false
                },
                snack: {
                    status: true,
                    message: '修改成功,规则一分钟后生效',
                    color: 'rgb(0, 188, 212)'
                }
            }
        case ACTION_UPDATE_ERROR:
            console.log(ACTION_UPDATE_ERROR);
            return {
                ...state,
                loading: action.loading,
                snack: {
                    status: true,
                    message: '修改失败',
                    color: '#FF4081'
                }
            }

        //存储选中的行
        case ACTION_SELECTROW:
            console.log(ACTION_SELECTROW);
            return{
                ...state,
                selectedRow:action.selectedRow
            }

            //条件类型下拉列表
        case ACTION_AUTO_CONDITION_TYPES:
            console.log(ACTION_AUTO_CONDITION_TYPES);
            return{
                ...state,
            }
        case ACTION_AUTO_CONDITION_TYPES_SUCCESS:
            console.log(ACTION_AUTO_CONDITION_TYPES_SUCCESS);

            if (!action.success) {
                return {
                    ...state,
                    snack: {
                        status: true,
                        message: '下拉列表加载失败',
                        color: '#FF4081'
                    }
                }
            }
            return {
                ...state,
                auto: {
                    ...state.auto,
                    autoConditionTypes:action.payload.map((item)=>({name:item.chnname,value:item.engname}))
                }
            }

        case ACTION_AUTO_CONDITION_TYPES_ERROR:
            console.log(ACTION_AUTO_CONDITION_TYPES_ERROR);
            return{
                ...state,
                snack: {
                    status: true,
                    message: '下拉列表加载失败',
                    color: '#FF4081'
                }
            }

        //下拉列表|异常类型
        case ACTION_AUTO_ONE:
            console.log(ACTION_AUTO_ONE);
            return {
                ...state,
            };
        case ACTION_AUTO_ONE_SUCCESS:
            console.log(ACTION_AUTO_ONE_SUCCESS);
            if (!action.success) {
                return {
                    ...state,
                    snack: {
                        status: true,
                        message: '下拉列表加载失败',
                        color: '#FF4081'
                    }
                }
            }
            return {
                ...state,
                auto: {
                    ...state.auto,
                    autoExceptionType:action.payload,
                }
            }

        case ACTION_AUTO_ONE_ERROR:
            console.log(ACTION_AUTO_ONE_ERROR);
            return{
                ...state,
                snack: {
                    status: true,
                    message: '下拉列表加载失败',
                    color: '#FF4081'
                }
            }

        //下拉列表|异常内容
        case ACTION_AUTO_TWO:
            console.log(ACTION_AUTO_TWO);
            return {
                ...state,
            };
        case ACTION_AUTO_TWO_SUCCESS:
            console.log(ACTION_AUTO_TWO_SUCCESS);
            if (!action.success) {
                return {
                    ...state,
                    snack: {
                        status: true,
                        message: '下拉列表加载失败',
                        color: '#FF4081'
                    }
                }
            }
            return {
                ...state,
                auto: {
                    ...state.auto,
                    autoExceptionContent:action.payload,
                }
            }
        case ACTION_AUTO_TWO_ERROR:
            console.log(ACTION_AUTO_TWO_ERROR);
            return {
                ...state
            };


        //用户列表
        case ACTION_AUTO_USERINFO:
            console.log(ACTION_AUTO_USERINFO);return{
                ...state,
            }
        case ACTION_AUTO_USERINFO_SUCCESS:
            console.log(ACTION_AUTO_USERINFO_SUCCESS);
            return {
                ...state,
                auto: {
                    ...state.auto,
                    autoUserInfo:action.payload.map(e=>({name:e.name,value:e.id}))
                }
            }
        case ACTION_AUTO_USERINFO_ERROR:
            console.log(ACTION_AUTO_USERINFO_ERROR);
            return{
                ...state,
            }

            //商户列表
        case ACTION_AUTO_MEMBER:
            return{
                ...state
            }
        case ACTION_AUTO_MEMBER_SUCCESS:
            return{
                ...state,
                auto:{
                    ...state.auto,
                    autoMember:[{orgCode:"所有商户",customerName:"所有商户"},...action.result.result.resultList]
                }
            }
        case ACTION_AUTO_MEMBER_ERROR:
            return{
                ...state,
            }


            //报警级别
        case ACTION_AUTO_WARNING_LEVELS:
            console.log(ACTION_AUTO_WARNING_LEVELS);
            return{
                ...state,
            }
        case ACTION_AUTO_WARNING_LEVELS_SUCCESS:
            console.log(ACTION_AUTO_WARNING_LEVELS_SUCCESS);
            return {
                ...state,
                auto: {
                    ...state.auto,
                    autoWarningLevels:action.payload.map(wl=>({name:wl.desc,value:wl.type}))
                }
            }
        case ACTION_AUTO_WARNING_LEVELS_ERROR:
            console.log(ACTION_AUTO_WARNING_LEVELS_ERROR);
            return{
                ...state,
            }



        //报警级别
        case ACTION_AUTO_PRODUCT_STATUS:
            console.log(ACTION_AUTO_PRODUCT_STATUS);
            return{
                ...state,
            }
        case ACTION_AUTO_PRODUCT_STATUS_SUCCESS:
            console.log(ACTION_AUTO_PRODUCT_STATUS_SUCCESS);
            return {
                ...state,
                auto: {
                    ...state.auto,
                    autoProductStatus:action.payload.map(st=>({name:st.desc,value:st.type}))
                }
            }


        case ACTION_AUTO_PRODUCT_STATUS_ERROR:
            console.log(ACTION_AUTO_PRODUCT_STATUS_ERROR);
            return{
                ...state,
            }


        //要素
        case ACTION_AUTO_ELEMENTS:
            console.log(ACTION_AUTO_ELEMENTS);
            return{
                ...state,
            }
        case ACTION_AUTO_ELEMENTS_SUCCESS:
            console.log(ACTION_AUTO_ELEMENTS_SUCCESS);
            return {
                ...state,
                auto: {
                    ...state.auto,
                    autoElements:action.payload.map(e=>({name:e.name,value:e.type}))
                }
            }
        case ACTION_AUTO_ELEMENTS_ERROR:
            console.log(ACTION_AUTO_ELEMENTS_ERROR);
            return{
                ...state,
            }

            //规则类型
        case ACTION_AUTO_RULE_TYPE:
            console.log(ACTION_AUTO_RULE_TYPE);
            return{
                ...state,
            }
        case ACTION_AUTO_RULE_TYPE_SUCCESS:
            console.log(ACTION_AUTO_RULE_TYPE_SUCCESS);
            return {
                ...state,
                auto: {
                    ...state.auto,
                    autoRuleTypes:action.payload.map(ru=>({name:ru.name,value:ru.type}))
                }
            }
        case ACTION_AUTO_RULE_TYPE_ERROR:
            console.log(ACTION_AUTO_RULE_TYPE_ERROR);
            return{
                ...state,
            }


            //报警方式
        case ACTION_AUTO_WARNING_WAYS:
            console.log(ACTION_AUTO_WARNING_WAYS);
            return{
                ...state,
            }
        case ACTION_AUTO_WARNING_WAYS_SUCCESS:
            console.log(ACTION_AUTO_WARNING_WAYS_SUCCESS);
            return {
                ...state,
                auto: {
                    ...state.auto,
                    autoWarningWays: action.payload.map(w=>({ name:w.desc, value:w.way })) }
            }
        case ACTION_AUTO_WARNING_WAYS_ERROR:
            console.log(ACTION_AUTO_WARNING_WAYS_ERROR);
            return{
                ...state,
            }

















        //添加
        case ACTION_ADD:
            console.log(ACTION_ADD);
            return {
                ...state,
                loading: action.loading,
            }
        case ACTION_ADD_SUCCESS:
            console.log(ACTION_ADD_SUCCESS);
            if (!action.success) {

                return {
                    ...state,
                    loading: action.loading,
                    snack: {
                        status: true,
                        message: '添加失败'+','+action.result.errorMsg,
                        color: '#FF4081'
                    }
                }
            }
            return {
                ...state,
                loading: action.loading,
                dialog: {
                    ...state.dialog,
                    content: {},
                    status: false
                },
                snack: {
                    status: true,
                    message: '添加成功,规则一分钟后生效',
                    color: 'rgb(0, 188, 212)'
                }
            }
        case ACTION_ADD_ERROR:
            console.log(ACTION_ADD_ERROR);
            return {
                ...state,
                loading: action.loading,
                snack: {
                    status: true,
                    message: '添加失败',
                    color: '#FF4081'
                }
            }

        //显示详情
        case ACTION_DETAIL:
            console.log(ACTION_DETAIL);
            return {
                ...state,
                detail: action.detail
            }

        //打开弹窗
        case ACTION_DIALOG_OPEN:
            console.log(ACTION_DIALOG_OPEN);
            return {
                ...state,
                dialog: {...action.dialog},
            }

        //关闭弹窗
        case ACTION_DIALOG_CLOSE:
            console.log(ACTION_DIALOG_CLOSE);
            return {
                ...state,
                dialog: {
                    ...state.dialog,
                    content: {},
                    status: false
                }
            }

        //打开右侧滑动条
        case ACTION_DRAWER_OPEN:
            console.log(ACTION_DRAWER_OPEN);
            return {
                ...state,
                drawer: {...action.drawer}
            }

        //关闭右侧滑动条
        case ACTION_DRAWER_CLOSE:
            console.log(ACTION_DRAWER_CLOSE);
            return {
                ...state,
                drawer: {
                    ...state.drawer,
                    content: {},
                    status: false
                }
            }

        //打开连接窗口
        case ACTION_CONNECT_OPEN:
            console.log(ACTION_CONNECT_OPEN);
            return {
                ...state,
                connect: {...action.connect}
            }
        case ACTION_CONNECT_CLOSE:
            console.log(ACTION_CONNECT_CLOSE);
            return {
                ...state,
                connect: {
                    ...state.connect,
                    content: {},
                    status: false
                }
            }

        //打开警示窗
        case ACTION_ALERT_OPEN:
            console.log(ACTION_ALERT_OPEN);
            console.log(action.row);
            return {
                ...state,
                alert: {
                    ...state.alert,
                    status: true,
                }
            }

        //关闭警示窗
        case ACTION_ALERT_CLOSE:
            console.log(ACTION_ALERT_CLOSE);
            return {
                ...state,
                alert: {
                    ...state.alert,
                    status: false
                }
            }

         //打开snack
        case ACTION_SNACK_OPEN:
            console.log(ACTION_SNACK_OPEN);
            return{
                ...state,
                snack:action.snack
            }

        //关闭snack
        case ACTION_SNACK_CLOSE:
            console.log(ACTION_SNACK_CLOSE);
            return {
                ...state,
                snack: {
                    ...state.snack,
                    status: false,
                }
            }
        default:
            return state
    }
}


//根据id查询数据
export function getDetail(data, id) {
    return data.filter((item) => {
            return item.id == id
        }
    );
}

//根据行号查询第几行的数据,解构每一个d下面的ruleList
export function getRowAndDataByNum(data, rowNum) {
    let list=[];
    let num=0;
    data.map(d=>{
        d.ruleList.map(r=>{
            list.push({data:d,rule:r,num:num});
            num=num+1;
        })
    });
    if(rowNum>num) return undefined;
    if(list.length<1) return undefined;
    return list[rowNum];
}






