import {updateGoodsType, addGoodsType}from './redux/TwoRedux'
import React from 'react';
import {connect} from 'react-redux'
import {updateGoods, addGoods }from './redux/OneRedux'
import {browserHistory} from 'react-router';

import {Field, reduxForm, formValueSelector} from 'redux-form'


/*renderInput|参数效验*/
const renderInput = ({input, label, type, meta: {touched, error, warning}}) => (
    <div>
        <label>{label}</label>
        <div>
            <input {...input} placeholder={label} type={type}/>
            {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
        </div>
    </div>
)


class TwoDetail extends React.Component {

    handleSubmit(values) {
        if (this.props.params.id == 0) {
            this.props.handleAdd(values);
        } else {
            this.props.handleUpdate(values);
        }
        browserHistory.push('/two');
    }


    render() {

        const {error, handleSubmit, reset, submitting, pristine}=this.props;

        return (
            <div>
                <form onSubmit={handleSubmit(this.handleSubmit.bind(this))}>

                    <Field name="id" component={renderInput} type="text"  label="商品类型ID"/>
                    <Field name="name" component={renderInput} type="text"  label="商品类型名称"/>
                    <div>
                        <button type="button" disabled={pristine || submitting} onClick={reset}>重置</button>
                        <input type="submit" disabled={submitting} value={this.props.params.id == 0 ? '添加' : '修改'}/>;
                    </div>
                </form>
            </div>
        );
    }
}

TwoDetail.propTypes = {
    handleAdd: React.PropTypes.func.isRequired,
    handleUpdate: React.PropTypes.func.isRequired,
}


//1.mapStateToProps
const mapStateToProps = (state, ownProps) => {
    let one = getOne(state.goodstype, ownProps.params.id);
    return {
        initialValues:one
    }
}
//mapStateToProps用到的辅助方法
function getOne(goodstype, id) {
    for (let i = 0; i < goodstype.length; i++) {
        if (goodstype[i].id == id) {
            return goodstype[i];
        }
    }
}

//2.mapDispatchToProps
//采用对象写法,默认省略了dispatch,等同于以下写法
const mapDispatchToProps = {
    handleAdd: (goodsType) => addGoodsType(goodsType),
    handleUpdate: (goodsType) => updateGoodsType(goodsType)
}

/*  参数效验  */
const validate = values => {
    const errors = {};
    //空值效验
    if (!values.id) {
        errors.id = '必须填写id'
    }
    if (!values.name) {
        errors.name = '必须填写name'
    }
    //格式效验
    if (!/\d+/.test(values.id)) {
        errors.id = '必须填写数字'
    }
    return errors;
}

const form = reduxForm({
    form: 'two-detail-form',
    validate,
})(TwoDetail)

export default connect(mapStateToProps, mapDispatchToProps)(form)





