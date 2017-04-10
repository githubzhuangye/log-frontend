import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';
import {connect} from 'react-redux'

import {URL_PREFIX,
    URL_YCBB_IDCARD,
    URL_YCBB_IDCARD_EXCEPTYPES
    } from '../../../consts/Urls'
import {getLastMonth} from '../../../utils/DateUtils'

import styles from './css/SearchForm .css'

import {
    REFRESH_YCBB_IDCARD_SEARCH_AUTOCOMPLETE,
    REFRESH_YCBB_IDCARD_SEARCH_AUTOCOMPLETE_SUCCESS,
    REFRESH_YCBB_IDCARD_SEARCH_AUTOCOMPLETE_ERROR
} from './redux/YcbbIdCardAutoCompleteRedux'

import {
    YCBB_IDCARD_DATA,
    YCBB_IDCARD_DATA_SUCCESS,
    YCBB_IDCARD_DATA_ERROR
}from './redux/YcbbIdCardRedux'


/**
 * 查询表单,\
 * 因为控件已经有了很强的参数效验,所以不需要使用redux-form了
 */
class YcbbIdCardSearchForm extends React.Component {

    constructor(props) {
        super(props);

        //设置时间控件
        const beginDate = getLastMonth(new Date());
        beginDate.setHours(0, 0, 0, 0);

        const endDate = new Date();
        endDate.setHours(0, 0, 0, 0);

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
    handleNewRequest = () => {
        this.setState({
            searchText: '',
        });
    };

    //查询按钮
    handleSelectButton() {
        //设置参数
        let params={
            beginDate: this.state.beginDate,
            endDate: this.state.endDate,
            exceptionType: this.state.searchText,
            id:"",
        };
        this.props.refreshData(params);//请求URL的数据
    }


    //组件渲染结束
    componentDidMount() {
        //自动填充商户信息下拉列表
        this.props.fillAutoComplete();
    }

    componentDidUpdate() {
        console.log(this.state);
    }

    render() {
        const {autoDataSource}=this.props;

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
            <div >
                <div className={styles.inlineField}>
                    <DatePicker ref="begin" onChange={this.handleChangeMinDate} autoOk={true} floatingLabelText="起始时间"
                                disableYearSelection={false} container={'inline'} value={this.state.beginDate}/>
                </div>
                <div className={styles.inlineField}>
                    <DatePicker ref="end" onChange={this.handleChangeMaxDate} autoOk={true} floatingLabelText="结束时间"
                                 disableYearSelection={false} container={'inline'} value={this.state.endDate}/>
                </div>
                <AutoComplete floatingLabelText="异常类型" filter={filter} openOnFocus={true} dataSource={autoDataSource }
                               onUpdateInput={this.handleChangeText}
                              searchText={this.state.searchText}/>
                <RaisedButton label="查询" primary={true} style={{margin: 12}}
                              onClick={this.handleSelectButton.bind(this)}/>
            </div>
        );
    }
}

export default connect(
    (state, ownProps) => ({
        autoDataSource: state. YcbbIdCardAutoCompleteRedux
    }),
    (dispatch, ownProps) => ({
        refreshData: ( params ) => dispatch(
            {
                url: URL_PREFIX+URL_YCBB_IDCARD,
                params: params,
                types: [YCBB_IDCARD_DATA,YCBB_IDCARD_DATA_SUCCESS,YCBB_IDCARD_DATA_ERROR]
            }
        ),
        fillAutoComplete: (params) => dispatch(
            {
                url: URL_PREFIX+URL_YCBB_IDCARD_EXCEPTYPES,
                params: params,
                types: [REFRESH_YCBB_IDCARD_SEARCH_AUTOCOMPLETE,REFRESH_YCBB_IDCARD_SEARCH_AUTOCOMPLETE_SUCCESS,REFRESH_YCBB_IDCARD_SEARCH_AUTOCOMPLETE_ERROR]
            }
        ),
    })
)(YcbbIdCardSearchForm);




