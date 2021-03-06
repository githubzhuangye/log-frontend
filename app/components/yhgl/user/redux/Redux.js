//1.其他静态字段
//表格字段
export const TABLE_TITLES = ['用户名','邮箱','手机','微信','部门','角色','最后修改时间','操作'];
export const TABLE_FIELDS = ['name','email','mobile','weixin','departMentName','roleName','modifyTime'];
export const TABLE_TOPTITLE = `用户管理`;



//2.action静态字段

// 1)表单部分

//下拉列表,三个下拉列表一个接口
export const ACTION_AUTO = 'yhgl/user/ACTION_AUTO';
export const ACTION_AUTO_SUCCESS = 'yhgl/user/ACTION_AUTO_SUCCESS';
export const ACTION_AUTO_ERROR = 'yhgl/user/ACTION_AUTO_ERROR';

// 2)表格部分

//增删改查
export const ACTION_PAGE = 'yhgl/user/ACTION_PAGE';
export const ACTION_PAGE_SUCCESS = 'yhgl/user/ACTION_PAGE_SUCCESS';
export const ACTION_PAGE_ERROR = 'yhgl/user/ACTION_PAGE_ERROR';

export const ACTION_ADD = 'yhgl/user/ACTION_ADD';
export const ACTION_ADD_SUCCESS = 'yhgl/user/ACTION_ADD_SUCCESS';
export const ACTION_ADD_ERROR = 'yhgl/user/ACTION_ADD_ERROR';

export const ACTION_UPDATE = 'yhgl/user/ACTION_UPDATE';
export const ACTION_UPDATE_SUCCESS = 'yhgl/user/ACTION_UPDATE_SUCCESS';
export const ACTION_UPDATE_ERROR = 'yhgl/user/ACTION_UPDATE_ERROR';

export const ACTION_DELETE = 'yhgl/user/ACTION_DELETE';
export const ACTION_DELETE_SUCCESS = 'yhgl/user/ACTION_DELETE_SUCCESS';
export const ACTION_DELETE_ERROR = 'yhgl/user/ACTION_DELETE_ERROR';

//弹窗
export const ACTION_DIALOG_OPEN = 'yhgl/user/ACTION_DIALOG_OPEN';
export const ACTION_DIALOG_CLOSE = 'yhgl/user/ACTION_DIALOG_CLOSE';


//警示窗
export const ACTION_ALERT_OPEN = 'yhgl/user/ACTION_ALERT_OPEN';
export const ACTION_ALERT_CLOSE = 'yhgl/user/ACTION_ALERT_CLOSE';

//提示条
export const ACTION_SNACK_CLOSE = 'yhgl/user/ACTION_SNACK_CLOSE';

//详情
export const ACTION_DETAIL = 'yhgl/user/ACTION_DETAIL';



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
    page: {
        currentNum: 1,//当前页
        pageSize: 10,//每页大小
        totalCount: 0,//总条数
        data: [],//返回数据
    },//返回的数据,具体参数名和后端开发协商
    loading: 'hide',//loading状态
    dialog: {
        status: false,//弹窗的状态,打开或者关闭
        title: '',//弹窗的标题
        content: {},//弹窗的内容,如果不需要再调用接口,则直接将显示详情存储在这里
        buttonName: '',//按钮名称
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
            let dls = state.page.list;
            //删除替换
            dls = dls.filter((item) => item != action.params);
            if (!action.success) {
                return {
                    ...state,
                    loading: action.loading,
                    snack: {
                        status: true,
                        message: '删除失败',
                        color: '#FF4081'
                    }
                }
            }
            return {
                ...state,
                page: {
                    ...state.page,
                    list: dls
                },
                loading: action.loading,
                snack: {
                    status: true,
                    message: '删除成功',
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
                    message: '添加成功',
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


        //修改
        case ACTION_UPDATE:
            console.log(ACTION_UPDATE);
            return {
                ...state,
                loading: action.loading,
            }
        case ACTION_UPDATE_SUCCESS:
            console.log(ACTION_UPDATE_SUCCESS);
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
                    message: '修改成功',
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







