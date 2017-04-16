//1.其他静态字段
export const TABLE_TITLES = ['异常类', '异常内容', '日志ID', '日志发生时间', '操作'];
export const TABLE_FIELDS = ['simpleExceptionClassName', 'exceptionPhrase', 'logId', 'occur_time'];
export const TABLE_TOPTITLE = `BankCard项目异常报表`;

//2.action静态字段
// 1)表单部分
//下拉列表|异常类型
export const ACTION_AUTO_ONE = 'ycbb/bankcard/ACTION_AUTO_ONE';
export const ACTION_AUTO_ONE_SUCCESS = 'ycbb/bankcard/ACTION_AUTO_ONE_SUCCESS';
export const ACTION_AUTO_ONE_ERROR = 'ycbb/bankcard/ACTION_AUTO_ONE_ERROR';

//下拉列表|异常内容
export const ACTION_AUTO_TWO='ycbb/bankcard/ACTION_AUTO_TWO';
export const ACTION_AUTO_TWO_SUCCESS='ycbb/bankcard/ACTION_AUTO_TWO_SUCCESS';
export const ACTION_AUTO_TWO_ERROR='ycbb/bankcard/ACTION_AUTO_TWO_ERROR';

// 2)主要表格|第一个表格
//获取分页数据
export const ACTION_PAGE = 'ycbb/bankcard/ACTION_PAGE';
export const ACTION_PAGE_SUCCESS = 'ycbb/bankcard/ACTION_PAGE_SUCCESS';
export const ACTION_PAGE_ERROR = 'ycbb/bankcard/ACTION_PAGE_ERROR';

//显示详情
export const ACTION_DETAIL = 'ycbb/bankcard/ACTION_DETAIL';
export const ACTION_DETAIL_SUCCESS = 'ycbb/bankcard/ACTION_DETAIL_SUCCESS';
export const ACTION_DETAIL_ERROR = 'ycbb/bankcard/ACTION_DETAIL_ERROR';

// 3)统计表格|第二个表格
//统计数据
export const ACTION_STATISCS='ycbb/bankcard/ACTION_STATISCS';
export const ACTION_STATISCS_SUCCESS='ACTION_STATISCS_SUCCESS';
export const ACTION_STATISCS_ERROR='ACTION_STATISCS_ERROR';

//3.action创建器

//4.初始化数据
const initData = {
    form:{
        commitParams:{
            beginDate: '',//查询参数
            endDate: '',//查询参数
            id: "",//查询参数
            exceptionType: '',//查询参数
            exceptionPhrase:'',//查询参数
            pageSize:10,//分页查询所需参数
            currentNum:1//分页查询所需参数
        },//请求的参数,具体参数名和后端开发协商
        autoExceptionType:[],//下拉列表|异常类型
        autoExceptionContent:[],//下拉列表|异常内容
    },//存放表单信息
    page:{
        currentNum:1,//当前页
        pageSize:10,//每页大小
        totalCount:1,//总条数
        totalPage:1,//总页数
        data:[],//返回数据
    },//返回的数据,具体参数名和后端开发协商
    loading:'hide',//loading状态
    detail:{},//存储单条信息,用于显示详情或者修改时弹窗显示
    cache:{},//存储单条信息,用于缓存,用于修改或者删除前的信息,可以用于撤销这种功能
    statiscs:[]//统计信息
};

//5.reducer
export default function Redux(state = initData, action) {
    switch (action.type) {
        //下拉列表|异常类型
        case ACTION_AUTO_ONE:
            console.log(ACTION_AUTO_ONE);
            return {
                ...state,
            };
        case ACTION_AUTO_ONE_SUCCESS:
            console.log(ACTION_AUTO_ONE_SUCCESS);
            return {
                ...state,
                form:{
                    ...state.form,
                    autoExceptionType:action.payload,
                }
            };
        case ACTION_AUTO_ONE_ERROR:
            console.log(ACTION_AUTO_ONE_ERROR);
            return {
                ...state
            };

        //下拉列表|异常内容
        case ACTION_AUTO_TWO:
            console.log(ACTION_AUTO_TWO);
            return {
                ...state,
            };
        case ACTION_AUTO_TWO_SUCCESS:
            console.log(ACTION_AUTO_TWO_SUCCESS);
            return {
                ...state,
                form:{
                    ...state.form,
                    autoExceptionContent:action.payload,
                }
            };
        case ACTION_AUTO_TWO_ERROR:
            console.log(ACTION_AUTO_TWO_ERROR);
            return {
                ...state
            };

        //分页数据
        case ACTION_PAGE:
            console.log(ACTION_PAGE);
            return {
                ...state,
                loading:action.loading
            };
        case ACTION_PAGE_SUCCESS:
            console.log(ACTION_PAGE_SUCCESS);
            //访问成功后,同时修改提交的表单参数和loading状态
            return {
                ...state,
                form:{
                    ...state.form,
                    commitParams:action.params,
                },
                page:action.payload,
                loading:action.loading
            }  ;
        case ACTION_PAGE_ERROR:
            console.log(ACTION_PAGE_ERROR);
            return {
                ...state,
                loading:action.loading
            };

        //查询详细信息
        case ACTION_DETAIL:
            console.log(ACTION_DETAIL);
            return {
                ...state,
                loading:action.loading
            };
        case ACTION_DETAIL_SUCCESS:
            console.log(ACTION_DETAIL_SUCCESS);
            return {
                ...state,
                loading:action.loading,
                detail:action.payload,
            };
        case ACTION_DETAIL_ERROR:
            console.log(ACTION_DETAIL_ERROR);
            return {
                ...state,
                loading:action.loading,
            };
        //获取统计信息
        case ACTION_STATISCS:
            console.log(ACTION_STATISCS);
            return state;
        case ACTION_STATISCS_SUCCESS:
            console.log(ACTION_STATISCS_SUCCESS);
            return{
                ...state,
                statiscs:action.payload
            }
        case ACTION_STATISCS_ERROR:
            console.log(ACTION_STATISCS_ERROR);
            return state;
        default:
            return state
    }
}






