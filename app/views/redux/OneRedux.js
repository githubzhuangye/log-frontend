
/*  1.constants  */
/*  constants-table  */
export const FIELD_GOODS= ['id', 'name','type','price'];
export const TITLE_GOODS= ['商品ID', '商品名称','商品类型','价格'];

/*  constants-action  */
export const ADD_GOODS = 'ADD_GOODS';
export const DELETE_GOODS = 'DELETE_GOODS';
export const UPDATE_GOODS = 'UPDATE_GOODS';

/*  2.actionCreator  */
export function addGoods(text) {
    return {
        type: ADD_GOODS,
        text
    }
}

export function deleteGoods(text) {
    return {
        type: DELETE_GOODS,
        text
    }
}

export function updateGoods(text) {
    return {
        type: UPDATE_GOODS,
        text
    }
}



const initgoods= [
    {
        id:1,
        name:'黄金5M',
        type:1,
        price:'20'
    },
    {
        id:2,
        name:'黄金8M',
        type:2,
        price:'10'
    },
    {
        id:3,
        name:'白银10M',
        type:1,
        price:'80'
    }
];

/*  3.reducer  */

//这里的state只是一个局部state,在redux的store中,相当于根root.goods
function goods(state = initgoods, action) {
    switch (action.type) {
        case ADD_GOODS:
            return [
                ...state,
                action.text
            ];
        case DELETE_GOODS:
            return state.filter(goods =>
                goods.id != action.text.id
            );
        case UPDATE_GOODS:
            return state.map(goods =>
                goods.id == action.text.id ? action.text : goods
            );
        default:
            return state
    }

}

/*  4.reselect  */
//mapStateToProps用到的辅助方法
export function getOne(goods, id) {
    for (var i = 0; i < goods.length; i++) {
        if (goods[i].id == id) {
            return goods[i];
        }
    }
}


export default goods;
