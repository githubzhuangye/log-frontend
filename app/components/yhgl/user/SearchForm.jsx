import React from "react";
import {Field, reduxForm,getFormValues} from "redux-form";
import {connect} from "react-redux";
import {push} from 'react-router-redux'
import {pageSize} from "../../../consts/TablePageSet";


import {
    FlatButton,
    Dialog,
    RaisedButton,
    MenuItem,
    Checkbox,
    RadioButtonGroup,
    SelectField,
    TextField,
    Toggle,
    DatePicker
} from 'material-ui'

import {
    AutoComplete
}from 'redux-form-material-ui'


import {
   departMentArray
}from '../../../consts/Enums'
import {
    URL_PREFIX,
    URL_YHGL_USER_PAGE,

} from "../../../consts/Urls";
import styles from "./css/SearchForm .css";

import {
    ACTION_DIALOG_CLOSE,
    ACTION_DIALOG_OPEN,
    ACTION_PAGE,
    ACTION_PAGE_SUCCESS,
    ACTION_PAGE_ERROR,

    ACTION_AUTO,
    ACTION_AUTO_SUCCESS,
    ACTION_AUTO_ERROR
} from "./redux/Redux";


/*renderInput|参数效验*/
const renderInput = ({input, label, type, meta: {touched, error, warning}}) => (
    <div className={styles.inlineField}>
        <TextField {...input} floatingLabelText={label} errorStyle={{color: 'orange'}}
                   errorText={touched && ((error && {error}) || (warning && {warning}))} style={{'width': '10rem'}}/>
    </div>
)

/*renderSelectField|参数效验*/
const renderSelectField = ({ input, label, meta: { touched, error }, children, ...custom }) => (
    <SelectField floatingLabelText={label} errorText={touched && error} {...input} onChange={(event, index, value) => input.onChange(value)} children={children} errorStyle={{color: 'orange'}} {...custom}/>
)


/*  下拉列表  */
const FieldSelect = ({name, floatingLabelText, options, ...others}) => (
    <Field {...others} name={name} component={renderSelectField} floatingLabelText={floatingLabelText}>
        <MenuItem value={null} primaryText={'选择全部'} />
        {
            options.map((item, i) => {
                return (
                    <MenuItem value={item.value} primaryText={item.name} key={i}/>
                )
            })
        }
    </Field>
)


/**
 * 查询表单,\
 * 因为控件已经有了很强的参数效验,所以不需要使用redux-form了
 */
class SearchForm extends React.Component {

    constructor(props) {
        super(props);
        this.openDialogAndShowData = this.openDialogAndShowData.bind(this);
        this.openAddDialog=this.openAddDialog.bind(this);
    }

    //查询按钮
    handleSubmit(values) {
        //设置参数
        let params = {
            ...values,
            pageSize: pageSize,
            currentNum: 1//默认查询第一页
        };

        this.props.reqData(params);//请求URL的数据
    }

    //打开添加窗口
    openAddDialog() {
        let dialog = {
            status: true,
            title: '添加',
            content: {},
            buttonName: '添加'
        };
        this.props.openDialog(dialog);
    }

    //弹窗显示数据
    openDialogAndShowData() {
        let dialog = {
            status: true,
            title: '添加',
            content: {},
            buttonName: '添加'
        };
        this.props.openDialog(dialog);
    }

    //组件渲染结束
    componentDidMount() {
        //设置参数
        let params = {
            pageSize: pageSize,
            currentNum: 1//默认查询第一页
        };
        this.props.reqData(params);//请求URL的数据
    }

    render() {
        //react-reudux提供的props
        const {exceptionTypes, exceptionContents, loading,auto}=this.props;
        //redux-form提供的props
        const {error, handleSubmit, reset, submitting, pristine}=this.props;
        //AutoComplete的过滤规则
        const filter = (searchText, key) => searchText == '' || key.indexOf(searchText) !== -1;

        return (
            <div className={styles.root}>

                <form className={styles.form} onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
                    <div>
                        <Field name={'departMentName'} component={AutoComplete} filter={filter} openOnFocus={true} dataSource={departMentArray} floatingLabelText ={'部门名称'}  floatingLabelFixed={false} />
                        <span>
                            <RaisedButton label="重置" primary={true} disabled={pristine || submitting} style={{margin: 12}} onClick={reset}/>
                            <RaisedButton type="submit" label={'查询'} primary={true} disabled={submitting}/>
                        </span>
                    </div>

                    <div className={styles.right} style={{'top': '2.2rem'}}>
                        <RaisedButton label="添加" primary={true} style={{margin: 12}} onClick={this.openAddDialog}/>
                    </div>
                </form>



            </div>
        );
    }
}

const form = reduxForm({
    form: 'form-yhgl/user/select',
})(SearchForm)

export default connect(
    (state, ownProps) => ({
        auto: state.yhgl_user_redux.auto,
        values: getFormValues('form-yhgl/user/select')(state),   //获取表单的所有values
    }),
    (dispatch, ownProps) => ({
        reqData: (params) => dispatch(
            {
                url: URL_PREFIX + URL_YHGL_USER_PAGE,
                params: params,
                types: [ACTION_PAGE, ACTION_PAGE_SUCCESS, ACTION_PAGE_ERROR]
            }
        ),
        openDialog: (dialog) => {
            dispatch({type: ACTION_DIALOG_OPEN, dialog});
            dispatch(push('/log-frontend/yhgl/user/dialog'));
        },
    })
)(form);




