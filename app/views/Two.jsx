import React from 'react';
import SimpleTable from '../components/common/SimpleTable.jsx';
import {Link} from 'react-router';
import {connect} from 'react-redux'

import {deleteGoodsType }from './redux/TwoRedux'
import {FIELD_GOODS_TYPE,TITLE_GOODS_TYPE} from './redux/TwoRedux'
import { browserHistory} from 'react-router';

class Two extends React.Component {

    render() {
        const {goodstype, handleDelete,handleDetail}=this.props;
        return (
            <div>
                Hello,第二个页面!!!<br />
                <SimpleTable titles={TITLE_GOODS_TYPE} datas={goodstype} fieldNames={FIELD_GOODS_TYPE} detail={handleDetail} delete={handleDelete}/>
                <div><Link to="/two/detail/0">添加</Link></div>
                {this.props.children}
            </div>
        );
    }
}

//定义组件用到的属性,保证组件的稳定性,也可以不定义
Two.propTypes = {
    goodstype: React.PropTypes.array.isRequired,
    handleDelete:React.PropTypes.func.isRequired,
    handleDetail:React.PropTypes.func.isRequired
}


//1.mapStateToProps
// 返回的是UI组件需要用到的props,可以在UI组件中用this.props.goodstype获取
const mapStateToProps= (state,ownProps) => {
    return {
        goodstype: state.goodstype
    }
}

//2.mapDispatchToProps
//函数写法
// 返回的是UI组件需要用到的事件函数,可以在UI组件中用this.props.handleDelete来调用
const mapDispatchToProps = ( dispatch, ownProps )=>{
    return{
        handleDelete: (goodsType) => {
            dispatch(deleteGoodsType(goodsType))
        } ,
        handleDetail: (goodsType) => {
            var path=`/two/detail/${goodsType.id}`;
            browserHistory.push(path);
        }
    }
}

//对象写法
//特别注意这里不能自定义函数,只能是action,否则报错Actions must be plain objects. Use custom middleware for async actions.
/*
 const mapDispatchToProps = {
 handleAdd: (goodsType) => addGoodsType(goodsType)
 }
 */

//connect将UI组件包装一层变成容器组件,此处容器组件能获取redux中的数据
export default connect(mapStateToProps, mapDispatchToProps)(Two)

