import React from 'react';
import {connect} from 'react-redux'
import {
    Drawer,
    AppBar,
    Paper,
    IconButton,
    FlatButton,
    RaisedButton

} from 'material-ui'

import PropertiesTable from '../../common/PropertiesTable.jsx'

import NavigationClose from 'material-ui/svg-icons/navigation/close';

import {
    showUserDate
}from '../../../utils/DateUtils'
import {
    getNameFromEnumByValue,
    NoticeMembersEnum,
    WeixinChannelEnum

}from '../../../consts/Enums'

import {
    ACTION_DRAWER_CLOSE

}from './redux/Redux'

import {
    PROPERTIES_DISPLAY_NAMES,
    PROPERTIES_FIELDS

}from './redux/Redux'

import {
    ServerNameEnum
}from '../../../consts/Enums'
/**
 * 右侧滑动条
 */
class YjszDrawer extends React.Component {

    render() {
        const {drawer, closeDrawer,auto}=this.props;
        const {autoConditionTypes,autoWarningLevels,autoProductStatus,autoElements,autoRuleTypes,autoWarningWays}=this.props.auto;

        //字段Enum翻译器
        const TABLE_ENUMS=[
            {
                field:'element',
                enum:autoElements
            },
            {
                field:'condition',
                enum:autoConditionTypes
            },
            {
                field:'level',
                enum:autoWarningLevels
            },
            {
                field:'serverName',
                enum:ServerNameEnum
            },
            ];

        //字段格式化器
        const TABLE_FORMATERS = [
            {
                field: 'noticeMethods',
                format: (rv,fv,dataObj) => {
                    if (rv instanceof  Array ){
                        let result=''
                         rv.map((p, i) => {
                                result = result + getNameFromEnumByValue(autoWarningWays, p) + '  ' ;
                            } )
                        return result;
                    }
                   return rv;
                }
            },
            {
                field: 'exceptionType',
                format: (rv,fv,dataObj) => !rv || rv==''?'/':fv
            },
            {
                field: 'exceptionContent',
                format: (rv,fv,dataObj) => !rv || rv==''?'/':fv
            },
            {
                field: 'filterExceptionContent',
                format: (rv,fv,dataObj) => !rv || rv==''?'/':fv
            },
            {
                field: 'triggerInterval',
                format: (rv,fv,dataObj) => showUserDate(rv),
            },
            {
                field: 'timeSlot',
                format: (rv,fv,dataObj) => showUserDate(rv),
            },
            {
                field: 'triggerSleep',
                format: (rv,fv,dataObj) => showUserDate(rv),
            },
            {
                field: 'element',
                format: (rv,fv,dataObj) => !rv || rv==''?'/':fv
            },
            {
                field: 'overTime',
                format: (rv,fv,dataObj) => !rv || rv==''?'/':fv
            },
            {
                field: 'relation',
                format: (rv,fv,dataObj) => !rv || rv==''?'/':fv
            },
            {
                field: 'condition',
                format: (rv,fv,dataObj) => !rv || rv==''?'/':fv
            },
            {
                field: 'limValue',
                format: (rv,fv,dataObj) => !rv || rv==''?'/':fv
            },
            {
                field: 'noticePersons',
                format: (rv,fv,dataObj) => {
                    if (rv instanceof  Array ){
                        let result=''
                        rv.map((p, i) => {
                            result = result + getNameFromEnumByValue(auto.autoUserInfo, p) + '  ' ;
                        } )
                        return result;
                    }
                    return rv;
                }
            },
            {
                field: 'noticeWeixins',
                format: (rv,fv,dataObj) => {
                    if (rv instanceof  Array ){
                        let result=''
                        rv.map((p, i) => {
                            result = result + getNameFromEnumByValue(WeixinChannelEnum, p) + '  ' ;
                        } )
                        return result;
                    }
                    return rv;
                }
            },
        ];
        return (
            <div >
                <Drawer width={400} openSecondary={true} open={drawer.status} docked={false}  onRequestChange={(status) => this.props.closeDrawer()}  >
                    <AppBar iconElementRight={<IconButton onClick={closeDrawer}><NavigationClose /></IconButton>} title={drawer.title}/>
                    <Paper style={{padding: '0.3rem', }} zDepth={1} >
                        <PropertiesTable displayNames={PROPERTIES_DISPLAY_NAMES} data={drawer.content} fields={PROPERTIES_FIELDS} fieldEnums={TABLE_ENUMS} fieldFormats={TABLE_FORMATERS} />
                    </Paper>
                    <div style={{'marginTop':'2rem', 'textAlign': 'center'}}>
                        <RaisedButton primary={true} label={'关闭'} onClick={closeDrawer}/>
                    </div>

                </Drawer>
            </div>
        );
    }
}


export default connect(
    (state, ownProps) => ({
        drawer: state.yjsz_exception_redux.drawer,
        auto:state.yjsz_exception_redux.auto
    }),
    (dispatch, ownProps) => ({
        closeDrawer: () => {
            dispatch({type: ACTION_DRAWER_CLOSE});
        },
    })
)(YjszDrawer);



