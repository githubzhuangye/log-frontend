import { SubmissionError } from 'redux-form'

//1.其他静态字段
//表格字段
export const TABLE_TITLES = ['用户名','邮箱','手机','部门','最后修改时间','操作'];
export const TABLE_FIELDS = ['name','email','mobile','departMentName','modifyTime'];
export const TABLE_TOPTITLE = `用户管理`;



//2.action静态字段

// 1)表单部分

//下拉列表,三个下拉列表一个接口
export const ACTION_AUTO = 'global/ACTION_AUTO';
export const ACTION_AUTO_SUCCESS = 'global/ACTION_AUTO_SUCCESS';
export const ACTION_AUTO_ERROR = 'global/ACTION_AUTO_ERROR';

// 2)表格部分

//增删改查
export const ACTION_PAGE = 'global/ACTION_PAGE';
export const ACTION_PAGE_SUCCESS = 'global/ACTION_PAGE_SUCCESS';
export const ACTION_PAGE_ERROR = 'global/ACTION_PAGE_ERROR';

export const ACTION_ADD = 'global/ACTION_ADD';
export const ACTION_ADD_SUCCESS = 'global/ACTION_ADD_SUCCESS';
export const ACTION_ADD_ERROR = 'global/ACTION_ADD_ERROR';

export const ACTION_UPDATE = 'global/ACTION_UPDATE';
export const ACTION_UPDATE_SUCCESS = 'global/ACTION_UPDATE_SUCCESS';
export const ACTION_UPDATE_ERROR = 'global/ACTION_UPDATE_ERROR';

export const ACTION_DELETE = 'global/ACTION_DELETE';
export const ACTION_DELETE_SUCCESS = 'global/ACTION_DELETE_SUCCESS';
export const ACTION_DELETE_ERROR = 'global/ACTION_DELETE_ERROR';

//弹窗
export const ACTION_DIALOG_OPEN = 'global/ACTION_DIALOG_OPEN';
export const ACTION_DIALOG_CLOSE = 'global/ACTION_DIALOG_CLOSE';

//弹出修改密码窗口
export const ACTION_DIALOG_SETPWD_OPEN='global/ACTION_DIALOG_SETPWD_OPEN';
export const ACTION_DIALOG_SETPWD_CLOSE='global/ACTION_DIALOG_SETPWD_CLOSE';



//警示窗
export const ACTION_ALERT_OPEN = 'global/ACTION_ALERT_OPEN';
export const ACTION_ALERT_CLOSE = 'global/ACTION_ALERT_CLOSE';

//提示条
export const ACTION_SNACK_CLOSE = 'global/ACTION_SNACK_CLOSE';
export const ACTION_SNACK_OPEN='global/ACTION_SNACK_OPEN'

//详情
export const ACTION_DETAIL = 'global/ACTION_DETAIL';

//登陆
export const ACTION_LOGIN='global/ACTION_LOGIN'
export const ACTION_LOGIN_SUCCESS='global/ACTION_LOGIN_SUCCESS'
export const ACTION_LOGIN_ERROR='global/ACTION_LOGIN_ERROR'

//修改密码
export const ACTION_SETPWD='global/ACTION_SETPWD';
export const ACTION_SETPWD_SUCCESS='global/ACTION_SETPWD_SUCCESS';
export const ACTION_SETPWD_ERROR='global/ACTION_SETPWD_ERROR';

//登出
export const ACTION_LOGIN_OUT='global/ACTION_LOGIN_OUT';

//4.初始化数据
const initData = {
    form: {
        commitParams1: {
            search: {},
            add: {},
            update: {},
            delete: {}
        },//请求的参数,具体参数名和后端开发协商,如果使用redux-form,则可以不用保存本项参数
    },//存放表单信息
    auto:[],
    userInfo:{},//登陆后的用户信息
    page: {
        currentNum: 1,//当前页
        pageSize: 10,//每页大小
        totalCount: 0,//总条数
        data: [],//返回数据
    },//返回的数据,具体参数名和后端开发协商
    loading: 'hide',//loading状态
    dialog: {
        status: false,//弹窗的状态,打开或者关闭
        title: '登陆',//弹窗的标题
        content: {},//弹窗的内容,如果不需要再调用接口,则直接将显示详情存储在这里
        buttonName: '登陆',//按钮名称
    },//弹窗,大窗口,用于修改操作或者添加操作时弹出
    setpwd: {
        status: false,//弹窗的状态,打开或者关闭
        title: '修改密码',//弹窗的标题
        content: {},//弹窗的内容,如果不需要再调用接口,则直接将显示详情存储在这里
        buttonName: '修改密码',//按钮名称
    },//弹窗,大窗口,用于修改操作或者添加操作时弹出
    alert: {
        status: false,
        title: '确定删除吗?',
        cache: {},//在弹出警示窗的时候,缓存要操作的内容
    },//警示窗,小窗口,用于警告提示,主要用于删除,添加,修改
    snack: {
        status: false,//是否显示
        message: '测试信息',//显示的信息
        color: 'black',//快餐条的颜色
    },//提示条,用于添加,修改,删除操作成功或者失败时自动弹出
    detail: {},//存储要展示的信息,用于显示详情,修改时弹窗显示,需要调用才显示详情的存储在这里,和dialog.content使用类似
    cache: {},//存储单条信息,用于缓存,用于修改或者删除前的信息,可以用于撤销这种功能
};

//5.reducer
export default function Redux(state = initData, action) {
    switch (action.type) {

        //登陆
        case ACTION_LOGIN:
            console.log(ACTION_LOGIN);
            return {
                ...state,
                loading: action.loading
            }
        case ACTION_LOGIN_SUCCESS:
            console.log(ACTION_LOGIN_SUCCESS);
            if (!action.success) {
                try{
                    // throw new SubmissionError({ username: 'User does not exist', _error: action.result.errorMsg })
                }finally {
                    return {
                        ...state,
                        loading: action.loading,
                        snack: {
                            status: true,
                            message: action.result.errorMsg,
                            color: '#FF4081'
                        }
                    };
                }
            }
            return {
                ...state,
                userInfo:action.payload,
                loading: action.loading,
                snack: {
                    status: true,
                    message: '登录成功',
                    color: 'rgb(0, 188, 212)'
                }
            };
        case ACTION_LOGIN_ERROR:
            return {
                ...state,
                loading: action.loading,
                snack: {
                    status: true,
                    message: '登陆失败,服务器异常',
                    color: '#FF4081'
                }
            };

        //登出
        case ACTION_LOGIN_OUT:
            return{
                ...state,
                userInfo:{},
                snack:{
                    status:true,
                    message:'您已经成功登出',
                    color:'rgb(0, 188, 212)'
                }
            }

        //打开修改密码弹窗
        case ACTION_DIALOG_SETPWD_OPEN:
            return {
                ...state,
                setpwd: {...action.setpwd},
            }
        //关闭修改密码弹窗
        case ACTION_DIALOG_SETPWD_CLOSE:
            return {
                ...state,
                setpwd: {
                    ...state.setpwd,
                    content: {},
                    status: false
                }
            }

         //修改密码
        case ACTION_SETPWD:
            console.log(ACTION_SETPWD);
            return{
                ...state,
                loading:action.loading
            }
        case ACTION_SETPWD_SUCCESS:
            console.log(ACTION_SETPWD_SUCCESS);
            if (!action.success) {
                return {
                    ...state,
                    loading: action.loading,
                    snack: {
                        status: true,
                        message: '修改密码失败'+','+action.result.errorMsg,
                        color: '#FF4081'
                    }
                }
            }
            return {
                ...state,
                loading: action.loading,
                snack: {
                    status: true,
                    message: '修改密码成功',
                    color: 'rgb(0, 188, 212)'
                }
            }
        case ACTION_SETPWD_ERROR:
            console.log(ACTION_SETPWD_ERROR);
            return {
                ...state,
                loading: action.loading,
                snack: {
                    status: true,
                    message: '修改密码失败',
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

        //打开警示窗
        case ACTION_ALERT_OPEN:
            console.log(ACTION_ALERT_OPEN);
            console.log(action.row);
            return {
                ...state,
                alert: {
                    ...state.alert,
                    status: true,
                    cache: action.row
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

        //刻意开启snack
        case ACTION_SNACK_OPEN:
            console.log(ACTION_SNACK_OPEN);
            return{
                ...state,
                snack: {
                    status: true,
                    message: action.message,
                    color: '#FF4081'
                }
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







