import React from 'react';
import {connect} from 'react-redux'
import {pageSize}from '../../../consts/TablePageSet'

import {
    Dialog,
    Snackbar,
    RaisedButton,
    FlatButton,
    Chip,
    RefreshIndicator
}from 'material-ui'

import{
    ACTION_ALERT_CLOSE,
    ACTION_SNACK_CLOSE
} from './redux/Redux'



/**
 * 附属组件:
 * alert框,loading画面,Snackbar
 */
class Adjunct extends React.Component {

    render() {
        const { alert, snack,loading} =this.props;
        return (
            <div>
                {/*  提示条  */}
                <Snackbar bodyStyle={{'backgroundColor': snack.color}} style={{'top': '4rem'}} open={snack.status}
                          message={snack.message}
                          autoHideDuration={4000} onRequestClose={this.props.closeSnack}/>

                {/*  loading画面  */}
                <div style={{'display':'inline-block','position':'fixed','top':'50%','left':'50%','margin':'-30px 0 0 -30px','width':'60px','height':'60px'}}>
                    <RefreshIndicator size={60} left={0} top={0} loadingColor="#FF9800" status={loading} />
                </div>

            </div>
        )
    }
}

export default connect (
    (state,ownProps)=>({
        snack: state.yjsz_channel_redux.snack,
        loading: state.yjsz_channel_redux.loading,
    }),
    (dispatch, ownProps) => ({
        closeSnack: () => dispatch({type: ACTION_SNACK_CLOSE}),
    })
)(Adjunct);




