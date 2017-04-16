import React from 'react';
import {connect} from 'react-redux'

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

import {pageSize, getDataByPage} from '../../../consts/TablePageSet'
import MaterialTable from '../../common/MaterialTable.jsx'
import  MaterialPager from '../../common/MaterialPager.jsx'

import {TABLE_TOPTITLE, TABLE_TITLES, TABLE_FIELDS} from './redux/Redux'

import {
    URL_PREFIX,
    URL_YCBB_IDCARD
} from '../../../consts/Urls'

import {
    ACTION_STATISCS,
    ACTION_STATISCS_SUCCESS,
    ACTION_STATISCS_ERROR
}from './redux/Redux'

/**
 * 统计信息的列表
 */
class StatiscsTable extends React.Component {


    render() {
        return (
            <div>
                <div>
                    

                </div>
            </div>
        )
    }
}

export default connect(
    (state, ownProps) => ({
        page: state.ycbb_idcard_redux.page,
        form: state.ycbb_idcard_redux.form,//表单信息
    }),
    (dispatch, ownProps) => ({
        reqData: (params) => dispatch(
            {
                url: URL_PREFIX + URL_YCBB_IDCARD,
                params: params,
                types: [ACTION_STATISCS,ACTION_STATISCS_SUCCESS,ACTION_STATISCS_ERROR]
            }
        ),
    })
)(StatiscsTable);




