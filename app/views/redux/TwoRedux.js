

/*  商品类型  */
export const FIELD_GOODS_TYPE = ['id', 'name'];
export const TITLE_GOODS_TYPE = ['商品类型ID', '商品类型名称'];

/*  商品类型  */
export const ADD_GOODS_TYPE = 'ADD_GOODS_TYPE';
export const DELETE_GOODS_TYPE = 'DELETE_GOODS_TYPE';
export const UPDATE_GOODS_TYPE = 'UPDATE_GOODS_TYPE';

export function addGoodsType(text) {
    return {
        type: ADD_GOODS_TYPE,
        text
    }
}

export function deleteGoodsType(text) {
    return {
        type: DELETE_GOODS_TYPE,
        text
    }
}

export function updateGoodsType(text) {
    return {
        type: UPDATE_GOODS_TYPE,
        text
    }
}


const initgoodstype= [
    {
        id:1,
        name:'黄金'
    },
    {
        id:2,
        name:'白银'
    },
    {
        id:3,
        name:'黄铜'
    }
];


//这里的state只是一个局部state,在redux的store中,相当于根root.goodstype
function goodstype(state = initgoodstype, action) {
    switch (action.type) {
        case ADD_GOODS_TYPE:
            return [
                ...state,
                action.text
            ];
        case DELETE_GOODS_TYPE:
            return state.filter(goodstype =>
                goodstype.id != action.text.id
            );
        case UPDATE_GOODS_TYPE:
            return state.map(goodstype =>
                goodstype.id == action.text.id ? action.text : goodstype
            );
        default:
            return state
    }

}

export default goodstype;
