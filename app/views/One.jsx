import React from 'react';
import SimpleTable from '../components/common/SimpleTable.jsx';
import {Link} from 'react-router';
import {connect} from 'react-redux'

import {FIELD_GOODS,TITLE_GOODS,deleteGoods} from './redux/OneRedux'
import { browserHistory} from 'react-router';

class One extends React.Component {

    render() {
        const {goods, handleDelete,handleDetail}=this.props;
        return (
            <div>
                Hello,第二个页面!!!<br />
                <SimpleTable titles={TITLE_GOODS} datas={goods} fieldNames={FIELD_GOODS} detail={handleDetail} delete={handleDelete}/>
                <div><Link to="/one/detail/0">添加</Link></div>
                {this.props.children}
            </div>
        );
    }
}

//定义组件用到的属性,保证组件的稳定性,也可以不定义
One.propTypes = {
    goods: React.PropTypes.array.isRequired,
    handleDelete:React.PropTypes.func.isRequired,
    handleDetail:React.PropTypes.func.isRequired
}


//1.mapStateToProps
// 返回的是UI组件需要用到的props,可以在UI组件中用this.props.goods获取
const  mapStateToProps= (state,ownProps) => {
    return {
        goods: selectGoods(state)
    }
}

//mapStateToProps用到的辅助方法
//根据商品类型ID获取实际商品类型名
function selectGoods(state) {
    var cloneGoods = JSON.parse(JSON.stringify(state.goods));
    const goodstype=state.goodstype;
    for (var i = 0; i < cloneGoods.length; i++) {
        for(var j=0;j<goodstype.length;j++){
            if(cloneGoods[i].type==goodstype[j].id){
                cloneGoods[i].type=goodstype[j].name;
            }
        }
    }
    return cloneGoods;
}

//2.mapDispatchToProps
//函数写法
//此处建议使用redux-thunk中间件取代这种写法
// 返回的是UI组件需要用到的事件函数,可以在UI组件中用this.props.handleDelete来调用
const mapDispatchToProps = ( dispatch, ownProps )=>{
    return{
        handleDelete: (goods) => {
            dispatch(deleteGoods(goods))
        } ,
        handleDetail: (goods) => {
            var path=`/one/detail/${goods.id}`;
            browserHistory.push(path);
        }
    }
}

//对象写法
//特别注意这里不能自定义函数,只能是action,否则报错Actions must be plain objects. Use custom middleware for async actions.
/*
 const mapDispatchToProps = {
 handleAdd: (goods) => addGoods(goods)
 }
 */

//connect将UI组件包装一层变成容器组件,此处容器组件能获取redux中的数据
export default connect(mapStateToProps, mapDispatchToProps)(One)

