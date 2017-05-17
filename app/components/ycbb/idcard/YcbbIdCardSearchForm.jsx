import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import {connect} from 'react-redux'

import {pageSize} from '../../../consts/TablePageSet'

import {
    URL_PREFIX,
    URL_YCBB_IDCARD_PAGE,//分页模式
    URL_YCBB_IDCARD_EXCEPTTYPES,
    URL_YCBB_IDCARD_EXCEPTCONTENTS
} from '../../../consts/Urls'


import styles from './css/YcbbIdCardSearchForm .css'

import {
    //异常类型
    ACTION_AUTO_ONE,
    ACTION_AUTO_ONE_SUCCESS,
    ACTION_AUTO_ONE_ERROR,

    //异常内容下拉列表
    ACTION_AUTO_TWO,
    ACTION_AUTO_TWO_SUCCESS,
    ACTION_AUTO_TWO_ERROR
} from './redux/Redux'

import {
    ACTION_PAGE,
    ACTION_PAGE_SUCCESS,
    ACTION_PAGE_ERROR,
}from './redux/Redux'


/**
 * 查询表单,\
 * 因为控件已经有了很强的参数效验,所以不需要使用redux-form了
 */
class YcbbIdCardSearchForm extends React.Component {

    constructor(props) {
        super(props);

        //设置时间控件
        const beginDate = new Date();
        beginDate.setHours(0, 0, 0, 0);

        const endDate = new Date();
        endDate.setHours(23, 59, 59, 999);

        this.state = {
            beginDate: beginDate,
            endDate: endDate,
            exceptionType: '',
            exceptionContent:''
        };
    }

    handleChangeMinDate = (event, date) => {
        this.setState({
            beginDate: date,
        });
    };
    handleChangeMaxDate = (event, date) => {
        this.setState({
            endDate: date,
        });
    };
    handleChangeExceptionType = (text) => {
        this.setState({
            exceptionType:text
        });
    }

    handleChangeExceptionConetent = (text) => {
        this.setState({
            exceptionContent:text
        });
    }

    //查询按钮
    handleSelectButton() {
        //设置参数
        let params = {
            beginDate: this.state.beginDate,
            endDate: this.state.endDate,
            id: "",
            exceptionType: this.state.exceptionType,
            exceptionPhrase:this.state.exceptionContent,
            pageSize:pageSize,
            currentNum:1//默认查询第一页
        };

        this.props.reqData(params);//请求URL的数据
    }

    //组件渲染结束
    componentDidMount() {
        //下拉列表
        this.props.reqExceptionType();
        this.props.reqExceptionContent();

        //设置参数
        let params = {
            beginDate: this.state.beginDate,
            endDate: this.state.endDate,
            id: "",
            exceptionType: this.state.exceptionType,
            exceptionPhrase:this.state.exceptionContent,
            pageSize:pageSize,
            currentNum:1//默认查询第一页
        };
        this.props.reqData(params);//请求URL的数据
    }

    componentDidUpdate() {
        console.log(this.state);
    }

    render() {
        const {exceptionTypes, exceptionContents, loading}=this.props;

        //设置AutoComplete的数据源
        //设置AutoComplete的过滤器,保证刚开始点击AutoComplete时弹出所有信息,后面写一个字也能匹配
        const filter = (searchText, key) => searchText == '' || key.indexOf(searchText) !== -1;

        //也可以配置AutoComplete的key,value类型的数据
        /*        const dataSource3 = [
         {textKey: 'Some Text', valueKey: 'someFirstValue'},
         {textKey: 'Some Text', valueKey: 'someSecondValue'},
         ];
         const dataSourceConfig = {
         text: 'textKey',
         value: 'valueKey',
         };*/

        return (
            <div className={styles.root}>
                <div className={styles.inlineField}>
                    <DatePicker ref="begin" onChange={this.handleChangeMinDate} autoOk={true} floatingLabelText="起始时间"
                                disableYearSelection={false} container={'inline'} value={this.state.beginDate}
                    style={{'width':'10rem'}} textFieldStyle={{'width':'10rem'}}
                                />
                </div>
                <div className={styles.inlineField}>
                    <DatePicker ref="end" onChange={this.handleChangeMaxDate} autoOk={true} floatingLabelText="结束时间"
                                disableYearSelection={false} container={'inline'} value={this.state.endDate}
                                style={{'width':'10rem'}} textFieldStyle={{'width':'10rem'}}
                    />
                </div>
                <div className={styles.inlineField}>
                <AutoComplete menuProps={{maxHeight:400}} floatingLabelText="异常类型" filter={filter} openOnFocus={true} dataSource={exceptionTypes }
                              onUpdateInput={this.handleChangeExceptionType} style={{'width':'10rem'}} textFieldStyle={{'width':'10rem'}}
                              searchText={this.state.exceptionType}/>
                </div>
                <div className={styles.inlineField}>
                <AutoComplete menuProps={{maxHeight:400}} floatingLabelText="异常内容" filter={filter} openOnFocus={true}
                              dataSource={exceptionContents }  style={{'width':'10rem'}} textFieldStyle={{'width':'10rem'}}
                              onUpdateInput={this.handleChangeExceptionConetent}
                              searchText={this.state.exceptionContent}/>
                </div>
                <RaisedButton label="查询" primary={true} style={{margin: 12}}
                              onClick={this.handleSelectButton.bind(this)}/>
                <RefreshIndicator
                    size={60}
                    left={700}
                    top={100}
                    loadingColor="#FF9800"
                    status={loading}
                    className={styles.loading}
                />
            </div>
        );
    }
}



export default connect(
    (state, ownProps) => ({
        exceptionTypes: state.ycbb_idcard_redux.form.autoExceptionType,
        exceptionContents: state.ycbb_idcard_redux.form.autoExceptionContent,
        loading: state.ycbb_idcard_redux.loading
    }),
    (dispatch, ownProps) => ({
        reqData: (params) => dispatch(
            {
                url: URL_PREFIX + URL_YCBB_IDCARD_PAGE,
                params: params,
                types: [ACTION_PAGE, ACTION_PAGE_SUCCESS, ACTION_PAGE_ERROR]
            }
        ),
        reqExceptionType: (params) => dispatch(
            {
                url: URL_PREFIX + URL_YCBB_IDCARD_EXCEPTTYPES,
                params: params,
                types: [ACTION_AUTO_ONE,ACTION_AUTO_ONE_SUCCESS,ACTION_AUTO_ONE_ERROR]
            }
        ),
        reqExceptionContent: (params) => dispatch(
            {
                url: URL_PREFIX + URL_YCBB_IDCARD_EXCEPTCONTENTS,
                params: params,
                types: [ACTION_AUTO_TWO,ACTION_AUTO_TWO_SUCCESS,ACTION_AUTO_TWO_ERROR]
            }
        ),
    })
)(YcbbIdCardSearchForm);




