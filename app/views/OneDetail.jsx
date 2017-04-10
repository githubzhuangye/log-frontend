import React from 'react';
import {connect} from 'react-redux'
import {updateGoods, addGoods, getOne}from './redux/OneRedux'
import { browserHistory} from 'react-router';

import {Field, reduxForm, formValueSelector} from 'redux-form'


/*renderInput|参数效验*/
const renderInput = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div>
        <label>{label}</label>
        <div>
            <input {...input} placeholder={label} type={type}/>
            {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
        </div>
    </div>
)

/*下拉列表*/
const renderSelect = ({input,label,options}) => (
    <div>
        <label>{label}</label>
        <div>
            <select {...input} >
                {
                    options.map((o, i) => {
                        return (
                            <option key={i} value={o.id}>{o.name}</option>
                        )
                    })
                }
            </select>
        </div>
    </div>
)


class OneDetail extends React.Component {

    handleSubmit(values) {
        if (this.props.params.id == 0) {
            this.props.handleAdd(values);
        } else {
            this.props.handleUpdate(values);
        }
        browserHistory.push('/one');
    }

    render() {
        let { goodstype}=this.props;
        const {error, handleSubmit, reset, submitting, pristine}=this.props;
        return (
            <div>
                <form onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
                    <Field name="id" component={renderInput} type="text"  label="商品ID"/>
                    <Field name="name" component={renderInput} type="text"  label="商品名称"/>
                    <Field name="type" component={renderSelect} label="商品类型" options={goodstype}/>
                    <Field name="price" component={renderInput} type="text"  label="商品价格"/>
                    <div>
                        <button type="button" disabled={pristine || submitting} onClick={reset}>重置</button>
                        <input type="submit" disabled={submitting} value={this.props.params.id == 0 ? '添加' : '修改'}/>;
                    </div>
                </form>
            </div>
        );
    }

}

OneDetail.propTypes = {
    handleAdd: React.PropTypes.func.isRequired,
    handleUpdate: React.PropTypes.func.isRequired,
}


//1.mapStateToProps
const mapStateToProps = (state, ownProps) => {
    let one = getOne(state.goods, ownProps.params.id);
    return {
        goodstype: state.goodstype,
        initialValues:one
    }
}

//2.mapDispatchToProps
//采用对象写法,默认省略了dispatch,等同于以下写法
const mapDispatchToProps = {
    handleAdd: (goods) => addGoods(goods),
    handleUpdate: (goods) => updateGoods(goods),
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
    if (!values.price) {
        errors.price = '必须填写price'
    }
    //格式效验
    if (!/\d+/.test(values.id)) {
        errors.id = '必须填写数字'
    }
    if (!/-?[0-9]+.?[0-9]*/.test(values.price)) {
        errors.price = '必须填写小数或整数'
    }
    return errors;
}

const warn = values => {
    const warnings = {}
    if (values.id < 5) {
        warnings.id = '必须大于5'
    }
    return warnings
}

const form = reduxForm({
    form: 'one-detail-form',
    validate,
    warn,
})(OneDetail)

export default connect(mapStateToProps, mapDispatchToProps)(form)

