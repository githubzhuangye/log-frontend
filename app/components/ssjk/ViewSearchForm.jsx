import React from 'react';
import {connect} from 'react-redux'
import {Field,reduxForm,getFormValues} from "redux-form"

import {URL_PREFIX, URL_SSJK_SSJK} from '../../consts/Urls'

import styles from './css/SearchForm .css'
import {
    ACTION_DATA,
    ACTION_DATA_ERROR,
    ACTION_DATA_SUCCESS,
} from './redux/Redux'
import {
    AutoComplete
}from 'redux-form-material-ui'

import {
    monObjArr,dataTypeArr
}from '../../consts/Enums'

import {
    FlatButton,
    Dialog,
    RaisedButton,
    FloatingActionButton ,
    MenuItem,
    Checkbox,
    RadioButtonGroup,
    SelectField,
    TextField,
    Toggle,
    DatePicker,
    IconButton
} from 'material-ui'

/*renderSelectField|参数效验*/
const renderSelectField = ({input, label, meta: {touched, error}, children, ...custom}) => (
    <SelectField floatingLabelText={label} floatingLabelFixed={true} floatingLabelStyle ={{fontSize:'18px'}} errorText={touched && error} {...input}
                 onChange={(event, index, value) => input.onChange(value)} children={children}
                 errorStyle={{color: 'orange'}} {...custom}/>
)


/*  下拉列表  */
const FieldSelect = ({name, floatingLabelText, options, ...others}) => (
    <Field {...others} name={name} component={renderSelectField} floatingLabelText={floatingLabelText}>
        <MenuItem value={null} primaryText={'选择全部'}/>
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
class ViewSearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            monType:"",
            dataType:"",
            flag:"1",
        };
    }

    handleChangeMonObj = (event, date) => {
        this.setState({
            monType: date,
        });
    };

    handleChangeDataType = (event, date) => {
        this.setState({
            dataType: date,
        });
    };

    //查询按钮
    handleSelectButton() {
        let params={
            monType:this.state.monType,
            dataType:this.state.dataType,
            flag:this.state.flag,
        };
        this.props.reqData(params);//请求URL的数据
    }


    //组件渲染结束
    componentDidMount() {

        //自动填充商户信息下拉列表
        //this.props.reqAuto();
        //自动查询数据
        let params={
            monType:this.state.monType,
            dataType:this.state.dataType,
            flag:this.state.flag,
        };
        this.props.reqData(params);//请求URL的数据
    }

    componentDidUpdate() {
        console.log(this.state);
    }

    render() {
        //const {auto,loading}=this.props;
        //react-reudux提供的props
        const {exceptionTypes, exceptionContents, loading,auto}=this.props;
        //redux-form提供的props
        const {error, handleSubmit, reset, submitting, pristine}=this.props;
        //AutoComplete的过滤规则
        const filter = (searchText, key) => searchText == '' || key.indexOf(searchText) !== -1;
        let monObjArr = [
            {name:'身份证',value:'IDCARD'},
            {name:'银行卡',value:'BANKCARD'}
        ]
        let dataTypeArr = [
            {name:'正常',value:'1'},
            {name:'异常',value:'0'}
        ]
        return (
            <div  className={styles.root}>
                <span>
                    <FieldSelect name="monObjFs" floatingLabelText="监控对象" options={monObjArr} onChange={this.handleChangeMonObj} value={this.state.monType} style={{'top': '.9rem', 'marginRight': '2rem', 'width': '12rem'}}/>
                    <FieldSelect name="dataTypeFs" floatingLabelText="数据类型" options={dataTypeArr} onChange={this.handleChangeDataType} value={this.state.dataType} style={{'top': '.9rem', 'marginRight': '2rem', 'width': '12rem'}}/>
                    <RaisedButton label="开始监控" primary={true} style={{margin: 12}} onClick={this.handleSelectButton.bind(this)}/>
                    {/*<Field name={'monObj'} component={AutoComplete} filter={filter} openOnFocus={true} dataSource={monObjArr} floatingLabelText ={'监控对象'}  floatingLabelFixed={false} onChange={this.handleSelectButton.bind(this)}/>
                    <Field name={'dataType'} component={AutoComplete} filter={filter} openOnFocus={true} dataSource={dataTypeArr} floatingLabelText ={'数据类型'}  floatingLabelFixed={false} onChange={this.handleSelectButton.bind(this)}/>*/}

                </span>
                {/*  loading动画  */}
                {/*<RefreshIndicator
                    size={60}
                    left={700}
                    top={100}
                    loadingColor="#FF9800"
                    status={loading}
                    className={styles.loading}
                />*/}
            </div>
        );
    }
}

const form = reduxForm({
    form: 'form-ssjk/select',
})(ViewSearchForm)

export default connect(
    (state, ownProps) => ({
        auto: state.yhgl_user_redux.auto,
        values: getFormValues('form-ssjk/select')(state),   //获取表单的所有values
    }),
    (dispatch, ownProps) => ({
        reqData: (params) => dispatch(
            {
                url: URL_PREFIX + URL_SSJK_SSJK,
                params: params,
                types: [ACTION_DATA, ACTION_DATA_SUCCESS, ACTION_DATA_ERROR]
            }
        ),
    })
)(form);




