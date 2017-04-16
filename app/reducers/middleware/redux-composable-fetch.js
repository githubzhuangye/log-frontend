import 'whatwg-fetch'
/**
 * fetch调用接口|redux中间件
 *  默认使用post请求
 *  支持cors跨域,不支持传输cookie
 * action有types属性才被认定为要执行此中间件

 1.LOADING用于调用fetch前,显示LOADING状态,
 2.SUCCESS用于调用成功后,
 3.ERROR用于调用失败后

 注意:
 1.结果封装在action.payload里
 2.如果要支持cookie,需要设置  credentials: 'include'  ,并且服务器的Access-Control-Allow-Origin不能设置为 *
 3.接口返回的结果是被Result<T>包裹的结构,所以获取的数据是result.data

 * @param store
 */
const reduxComposableFetch = store => next => action => {
    if (!action.url || !Array.isArray(action.types)) {
        return next(action);
    }
    const [LOADING, SUCCESS, ERROR]=action.types;
    next({
        type: LOADING,
        loading: 'loading',
        ...action
    });

    console.log('url:' + action.url);
//
    //headers: {'Access-Control-Allow-Origin':'http://127.0.0.1:8080/log-statiscs','Accept': 'application/json', 'Content-Type': 'application/json' },
    let myHeaders = {
        // 'Accept': 'application/json',
        'Access-Control-Allow-Origin':'http:127.0.0.1:8080/log-statiscs',
        'Content-Type': 'application/json',
    };
    fetch(action.url, {method: 'POST', body: JSON.stringify(action.params), mode: 'cors'})
        .then((res) => {
            if (res.status != 200) {
                console.log('Looks like there was a problem. Status Code: ' + res.status);
                return;
            }
            return res;
        })
        .then(res => res.json())
        .then(result => {
            next({
                type: SUCCESS,
                loading: 'hide',
                payload: result.data,
                params: action.params   //请求成功会附带上参数
            });
        })
        .catch(err => {
            next({
                type: ERROR,
                loading: 'hide',
                payload: err,
                params: action.params    //请求失败会附带上参数
            });
        });

}

export default reduxComposableFetch;


