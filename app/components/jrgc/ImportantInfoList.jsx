import React from 'react';
import ImportantEventItem from './ImportantInfoItem.jsx'
import MaterialPager from '../common/MaterialPager.jsx'
import {URL_JRTT, URL_PREFIX} from '../../consts/Urls'
import {getDataByPage, pageSize_Jrtt} from '../../consts/TablePageSet'
import {connect} from 'react-redux'
import {
    ACTION_JRTT,
    ACTION_JRTT_SUCCESS,
    ACTION_JRTT_ERROR,

}from './redux/Redux'

/**
 * 大事记滚动版
 */
class ImportantInfoList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentNumber: 1,
        };
        this.clickPager = this.clickPager.bind(this);
    }

    /**
     * 维护当前页码,该页码本组件用于提取数据,传入分页器用于显示页码
     * @param i
     */
    clickPager(i) {
        this.setState({currentNumber: i});
    }


    //组件渲染结束
    componentDidMount() {
        //自动填充商户信息下拉列表
        let params = {
            top: 50
        }
        this.props.fillData(params);
    }

    render() {
        const {infos}=this.props;
        //获取当前页的数据
        let info_page = getDataByPage(infos, this.state.currentNumber, pageSize_Jrtt);
        return (
            <div>
                <h3>今日头条</h3>
                {
                    info_page.map((info, i) => {
                        return (
                            <ImportantEventItem info={info} key={i}/>
                        )
                    })
                }
                <div style={{textAlign: 'right'}}>
                    <MaterialPager pageSize={pageSize_Jrtt} totalCount={infos.length} currentNumber={this.state.currentNumber}  active={this.clickPager}/>
                </div>
            </div>
        );
    }
}

//复杂connect,一般用于URL请求
export default connect(
    (state, ownProps) => ({
        infos: state.jrgc_redux.jrttData
    }),
    (dispatch, ownProps) => ({
        fillData: (params) => dispatch(
            {
                url: URL_PREFIX + URL_JRTT,
                params: params,
                types: [ACTION_JRTT, ACTION_JRTT_SUCCESS, ACTION_JRTT_ERROR]
            }
        ),
    })
)(ImportantInfoList);






