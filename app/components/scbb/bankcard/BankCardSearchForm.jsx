import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import {connect} from 'react-redux'

import {URL_PREFIX, URL_GET_ALL_MEMBER_NAMES, URL_GET_BANKCARD_TIME_STATISCS_INFO} from '../../../consts/Urls'
import {getLastMonth} from '../../../utils/DateUtils'

import styles from './css/SearchForm .css'
import {
    ACTION_DATA,
    ACTION_DATA_ERROR,
    ACTION_DATA_SUCCESS,

    ACTION_AUTO,
    ACTION_AUTO_SUCCESS,
    ACTION_AUTO_ERROR
} from './redux/Redux'


/**
 * 查询表单,\
 * 因为控件已经有了很强的参数效验,所以不需要使用redux-form了
 */
class BankCardSearchForm extends React.Component {

    constructor(props) {
        super(props);

        //设置时间控件
        const beginDate = getLastMonth(new Date());
        beginDate.setHours(0, 0, 0, 0);

        const endDate = new Date();
        endDate.setHours(23, 59, 59, 999);

        this.state = {
            beginDate: beginDate,
            endDate: endDate,
            searchText: '',
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
    handleChangeText = (text) => {
        this.setState({
            searchText: text
        });
    }

    //查询按钮
    handleSelectButton() {
        let params={
            beginDate: this.state.beginDate,
            endDate: this.state.endDate,
            member: this.state.searchText,
        };
        this.props.reqData(params);//请求URL的数据
    }


    //组件渲染结束
    componentDidMount() {
        //自动填充商户信息下拉列表
        this.props.reqAuto();
        //自动查询数据
        let params={
            beginDate: this.state.beginDate,
            endDate: this.state.endDate,
            member: this.state.searchText,
        };
        this.props.reqData(params);//请求URL的数据
    }

    componentDidUpdate() {
        console.log(this.state);
    }

    render() {
        const {auto,loading}=this.props;

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
            <div  className={styles.root}>
                <div className={styles.inlineField}>
                    <DatePicker ref="begin" onChange={this.handleChangeMinDate} autoOk={true} floatingLabelText="起始时间"
                                disableYearSelection={false} container={'inline'} value={this.state.beginDate}/>
                </div>
                <div className={styles.inlineField}>
                    <DatePicker ref="end" onChange={this.handleChangeMaxDate} autoOk={true} floatingLabelText="结束时间"
                                 disableYearSelection={false} container={'inline'} value={this.state.endDate}/>
                </div>
                <AutoComplete menuProps={{maxHeight:400}}  floatingLabelText="商户名称" filter={filter} openOnFocus={true} dataSource={auto }
                               onUpdateInput={this.handleChangeText}
                              searchText={this.state.searchText}/>
                <RaisedButton label="查询" primary={true} style={{margin: 12}} onClick={this.handleSelectButton.bind(this)}/>
                {/*  loading动画  */}
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
        auto:state.scbb_bankcard_redux.form.auto,
        loading: state.scbb_idcard_redux.loading
    }),
    (dispatch, ownProps) => ({
        reqData: (params ) => dispatch(
            {
                url: URL_PREFIX+URL_GET_BANKCARD_TIME_STATISCS_INFO,
                params: params,
                types: [ACTION_DATA, ACTION_DATA_SUCCESS, ACTION_DATA_ERROR]
            }
        ),
        reqAuto: (params) => dispatch(
            {
                url: URL_PREFIX+URL_GET_ALL_MEMBER_NAMES,
                params: params,
                types: [ACTION_AUTO, ACTION_AUTO_SUCCESS, ACTION_AUTO_ERROR]
            }
        ),
    })
)(BankCardSearchForm);




